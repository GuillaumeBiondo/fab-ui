<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import { buttonVariants } from '@/components/button';
import { Plus, X } from 'lucide-vue-next';
import { ref, computed, type Component } from 'vue';

type Direction = 'up' | 'down' | 'left' | 'right';
type Size = 'small' | 'default' | 'large';

export interface SpeedDialItem {
    label:      string;
    icon:       Component;
    onClick:    () => void;
    disabled?:  boolean;
    variant?:   Severity;
}

const props = withDefaults(
    defineProps<{
        items:      SpeedDialItem[];
        direction?: Direction;
        variant?:   Severity;
        size?:      Size;
        icon?:      Component;
        disabled?:  boolean;
        class?:     string;
    }>(),
    { direction: 'up', variant: 'primary', size: 'default' },
);

const open = ref(false);

function toggle() {
    if (props.disabled) return;
    open.value = !open.value;
}

function handleItem(item: SpeedDialItem) {
    if (item.disabled) return;
    item.onClick();
    open.value = false;
}

const mainSize: Record<Size, string> = {
    small:   'size-10',
    default: 'size-12',
    large:   'size-14',
};

const actionSize: Record<Size, string> = {
    small:   'size-8',
    default: 'size-10',
    large:   'size-12',
};

/* Conteneur des actions : absolute, ancré selon la direction */
const listClass = computed(() => {
    const d = props.direction ?? 'up';
    return {
        up:    'bottom-full left-1/2 -translate-x-1/2 mb-3 flex-col-reverse items-center',
        down:  'top-full  left-1/2 -translate-x-1/2 mt-3 flex-col          items-center',
        left:  'right-full top-1/2 -translate-y-1/2  mr-3 flex-row-reverse  items-center',
        right: 'left-full  top-1/2 -translate-y-1/2  ml-3 flex-row          items-center',
    }[d];
});

/* Tooltip : côté opposé au mouvement des actions */
const tooltipClass = computed(() => {
    const d = props.direction ?? 'up';
    return {
        up:    'right-full mr-2',
        down:  'right-full mr-2',
        left:  'bottom-full mb-2 left-1/2 -translate-x-1/2',
        right: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    }[d];
});
</script>

<template>
    <div
        data-slot="speed-dial"
        :class="cn('relative inline-flex items-center justify-center', props.class)"
    >
        <!-- Actions (overlay absolu) -->
        <div
            :class="cn('absolute z-50 flex gap-2 pointer-events-none', listClass)"
        >
            <TransitionGroup name="dial">
                <div
                    v-for="(item, i) in items"
                    v-show="open"
                    :key="i"
                    :style="{ transitionDelay: open ? `${i * 40}ms` : `${(items.length - 1 - i) * 40}ms` }"
                    class="group pointer-events-auto relative flex items-center"
                >
                    <!-- Bouton action -->
                    <button
                        type="button"
                        :disabled="item.disabled"
                        :title="item.label"
                        :class="
                            cn(
                                buttonVariants({
                                    variant: item.variant ?? 'secondary',
                                    shape: 'plain',
                                    iconOnly: true,
                                }),
                                'rounded-full shadow-(--shadow-md)',
                                actionSize[size ?? 'default'],
                            )
                        "
                        @click="handleItem(item)"
                    >
                        <component :is="item.icon" class="size-4" />
                    </button>

                    <!-- Tooltip label -->
                    <span
                        :class="
                            cn(
                                'absolute pointer-events-none whitespace-nowrap rounded-(--radius-md)',
                                'bg-(--color-contrast) px-2 py-1 text-xs text-white shadow',
                                'opacity-0 group-hover:opacity-100 transition-opacity duration-150',
                                tooltipClass,
                            )
                        "
                    >{{ item.label }}</span>
                </div>
            </TransitionGroup>
        </div>

        <!-- Bouton principal -->
        <button
            type="button"
            :disabled="disabled"
            :class="
                cn(
                    buttonVariants({ variant, shape: 'plain', iconOnly: true, rounded: true }),
                    'shadow-(--shadow-lg) transition-transform duration-200 z-50',
                    open && 'rotate-45',
                    mainSize[size ?? 'default'],
                )
            "
            @click="toggle"
        >
            <component v-if="icon && !open" :is="icon" class="size-5" />
            <X v-else-if="open" class="size-5" />
            <Plus v-else class="size-5" />
        </button>
    </div>
</template>

<style scoped>
.dial-enter-active,
.dial-leave-active {
    transition: opacity 150ms ease, transform 150ms ease;
}
.dial-enter-from,
.dial-leave-to {
    opacity: 0;
    transform: scale(0.75);
}
</style>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui';
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { computed } from 'vue';

type Size = 'small' | 'default' | 'large';

interface Props extends SwitchRootProps {
    variant?: Severity;
    size?:    Size;
    /** Libellé affiché à droite du switch */
    label?:   string;
    class?:   string;
}

const props     = withDefaults(defineProps<Props>(), { variant: 'primary', size: 'default' });
const emits     = defineEmits<SwitchRootEmits>();
const delegated = reactiveOmit(props, 'variant', 'size', 'label', 'class');
const forwarded = useForwardPropsEmits(delegated, emits);

const variantColor: Record<Severity, string> = {
    primary:   'var(--color-action)',
    secondary: 'var(--color-border-strong)',
    success:   'var(--color-success)',
    danger:    'var(--color-danger)',
    info:      'var(--color-info)',
    warning:   'var(--color-warning)',
    help:      'var(--color-help)',
    contrast:  'var(--color-contrast)',
};

const colorStyle = computed(() => ({
    '--switch-color': variantColor[props.variant ?? 'primary'],
}));

const trackSize: Record<Size, string> = {
    small:   'h-4 w-7',
    default: 'h-5 w-9',
    large:   'h-6 w-11',
};

const thumbSize: Record<Size, string> = {
    small:   'size-3   data-[state=checked]:translate-x-3',
    default: 'size-3.5 data-[state=checked]:translate-x-4',
    large:   'size-4.5 data-[state=checked]:translate-x-5',
};

const labelSize: Record<Size, string> = {
    small:   'text-xs',
    default: 'text-sm',
    large:   'text-base',
};
</script>

<template>
    <label
        :class="
            cn(
                'inline-flex items-center gap-2 cursor-pointer',
                props.disabled && 'cursor-not-allowed opacity-50',
                props.class,
            )
        "
    >
        <SwitchRoot
            v-bind="forwarded"
            data-slot="switch"
            :style="colorStyle"
            :class="
                cn(
                    'relative inline-flex shrink-0 items-center rounded-full',
                    'border-2 border-transparent outline-none',
                    'transition-colors duration-(--transition-fast)',
                    'bg-(--color-border-strong)',
                    'data-[state=checked]:bg-(--switch-color)',
                    'focus-visible:ring-2 focus-visible:ring-(--switch-color)/30',
                    'disabled:pointer-events-none',
                    trackSize[size ?? 'default'],
                )
            "
        >
            <SwitchThumb
                data-slot="switch-thumb"
                :class="
                    cn(
                        'pointer-events-none block rounded-full bg-white shadow-sm',
                        'transition-transform duration-(--transition-fast)',
                        'translate-x-0',
                        thumbSize[size ?? 'default'],
                    )
                "
            />
        </SwitchRoot>
        <span
            v-if="label"
            :class="cn('select-none font-medium text-(--color-text)', labelSize[size ?? 'default'])"
        >
            {{ label }}
        </span>
    </label>
</template>

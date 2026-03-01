<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import { computed } from 'vue';

type Size = 'tiny' | 'small' | 'default' | 'large';

const props = withDefaults(
    defineProps<{
        /** Valeur de 0 à 100. Indéfini = mode indéterminé (animation) */
        value?: number;
        variant?: Severity;
        size?:   Size;
        /** Affiche le pourcentage en texte à droite */
        label?:  boolean;
        class?:  string;
    }>(),
    { variant: 'primary', size: 'default', label: false },
);

const clampedValue = computed(() =>
    props.value === undefined ? null : Math.min(100, Math.max(0, props.value)),
);

const isIndeterminate = computed(() => clampedValue.value === null);

const trackHeight: Record<Size, string> = {
    tiny:    'h-1',
    small:   'h-1.5',
    default: 'h-2.5',
    large:   'h-4',
};

const fillColor: Record<Severity, string> = {
    primary:   'bg-(--color-action)',
    secondary: 'bg-(--color-border-strong)',
    success:   'bg-(--color-success)',
    danger:    'bg-(--color-danger)',
    info:      'bg-(--color-info)',
    warning:   'bg-(--color-warning)',
    help:      'bg-(--color-help)',
    contrast:  'bg-(--color-contrast)',
};
</script>

<template>
    <div :class="cn('flex items-center gap-3', props.class)">
        <div
            role="progressbar"
            :aria-valuenow="clampedValue ?? undefined"
            aria-valuemin="0"
            aria-valuemax="100"
            :class="
                cn(
                    'w-full overflow-hidden rounded-full bg-(--color-bg-subtle)',
                    trackHeight[size ?? 'default'],
                )
            "
        >
            <!-- Barre déterminée -->
            <div
                v-if="!isIndeterminate"
                :class="cn('h-full rounded-full transition-[width] duration-300 ease-out', fillColor[variant ?? 'primary'])"
                :style="{ width: `${clampedValue}%` }"
            />
            <!-- Barre indéterminée -->
            <div
                v-else
                :class="cn('h-full w-1/3 rounded-full animate-[indeterminate_1.4s_ease-in-out_infinite]', fillColor[variant ?? 'primary'])"
            />
        </div>
        <span
            v-if="label && !isIndeterminate"
            class="shrink-0 tabular-nums text-sm text-(--color-text-muted) w-10 text-right"
        >
            {{ clampedValue }}&thinsp;%
        </span>
    </div>
</template>

<style scoped>
@keyframes indeterminate {
    0%   { transform: translateX(-100%) }
    50%  { transform: translateX(150%) }
    100% { transform: translateX(400%) }
}
</style>

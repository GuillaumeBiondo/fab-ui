<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        /** Valeur numérique affichée (0 = point, null/undefined = masqué) */
        value?: number | null;
        /** Variante de couleur */
        variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'help' | 'contrast';
        /** Position de l'overlay */
        position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
        class?: string;
    }>(),
    {
        variant:  'danger',
        position: 'top-right',
        value:    undefined,
    },
);

const positionClasses: Record<string, string> = {
    'top-right':    '-top-1.5 -right-1.5',
    'top-left':     '-top-1.5 -left-1.5',
    'bottom-right': '-bottom-1.5 -right-1.5',
    'bottom-left':  '-bottom-1.5 -left-1.5',
};

const colorClasses: Record<string, string> = {
    primary:   'bg-(--color-action)   text-white',
    secondary: 'bg-(--color-bg-raised) text-(--color-text) border border-(--color-border)',
    success:   'bg-(--color-success)  text-white',
    danger:    'bg-red-500            text-white',
    info:      'bg-(--color-info)     text-white',
    warning:   'bg-(--color-warning)  text-white',
    help:      'bg-(--color-help)     text-white',
    contrast:  'bg-(--color-contrast) text-white',
};

const isDot = props.value === 0 || props.value === undefined || props.value === null;
</script>

<template>
    <span :class="cn('relative inline-flex', props.class)">
        <slot />

        <!-- Badge dot (value=0 ou pas de value) -->
        <span
            v-if="isDot"
            :class="cn(
                'absolute size-2.5 rounded-full ring-2 ring-white dark:ring-(--color-bg)',
                positionClasses[position],
                colorClasses[variant],
            )"
        />

        <!-- Badge numérique -->
        <span
            v-else
            :class="cn(
                'absolute flex min-w-[18px] h-[18px] items-center justify-center',
                'rounded-full px-1 text-[9px] font-bold leading-none font-sans',
                'ring-2 ring-white dark:ring-(--color-bg)',
                positionClasses[position],
                colorClasses[variant],
            )"
        >
            {{ (value as number) > 99 ? '99+' : value }}
        </span>
    </span>
</template>

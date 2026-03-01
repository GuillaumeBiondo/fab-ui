<script setup lang="ts">
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'help' | 'contrast';

const borderColors: Record<CardVariant, string> = {
    default:   'border-(--color-border)',
    primary:   'border-(--color-action)',
    secondary: 'border-(--color-border-strong)',
    success:   'border-(--color-success)',
    danger:    'border-(--color-danger)',
    info:      'border-(--color-info)',
    warning:   'border-(--color-warning)',
    help:      'border-(--color-help)',
    contrast:  'border-(--color-contrast)',
};

const props = withDefaults(
    defineProps<{
        /** Sévérité — change la couleur de la bordure */
        variant?:  CardVariant;
        padded?:   boolean;
        bordered?: boolean;
        hoverable?: boolean;
        raised?:   boolean;
        class?:    string;
    }>(),
    {
        variant:   'default',
        padded:    true,
        bordered:  true,
        hoverable: false,
        raised:    false,
    },
);
</script>

<template>
    <div
        data-slot="card"
        :class="
            cn(
                'bg-(--color-bg-raised) text-(--color-text) flex flex-col rounded-(--radius-lg)',
                bordered && ['border', borderColors[variant]],
                padded && 'gap-6 py-6',
                raised ? 'shadow-(--shadow-lg)' : 'shadow-(--shadow-sm)',
                hoverable && 'cursor-pointer transition-shadow duration-200 hover:shadow-(--shadow-md)',
                props.class,
            )
        "
    >
        <slot name="header" />
        <slot />
        <slot name="footer" />
    </div>
</template>

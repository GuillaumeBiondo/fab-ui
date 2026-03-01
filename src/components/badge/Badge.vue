<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Primitive } from 'reka-ui';
import type { PrimitiveProps } from 'reka-ui';
import { badgeVariants } from '.';
import type { BadgeVariants } from '.';

interface Props extends PrimitiveProps {
    variant?: BadgeVariants['variant'];
    shape?:   BadgeVariants['shape'];
    size?:    BadgeVariants['size'];
    fluid?:   boolean;
    /** Petit point coloré à gauche du texte */
    dot?:     boolean;
    class?:   string;
}

const props = withDefaults(defineProps<Props>(), {
    dot:   false,
    fluid: false,
});

const dotColorMap: Record<string, string> = {
    primary:   'bg-(--color-action)',
    secondary: 'bg-(--color-text-disabled)',
    success:   'bg-(--color-success)',
    danger:    'bg-(--color-danger)',
    info:      'bg-(--color-info)',
    warning:   'bg-(--color-warning)',
    help:      'bg-(--color-help)',
    contrast:  'bg-(--color-contrast)',
};
</script>

<template>
    <Primitive
        data-slot="badge"
        :class="cn(badgeVariants({ variant, shape, size, fluid }), props.class)"
    >
        <span
            v-if="dot"
            :class="cn('size-1.5 shrink-0 rounded-full', dotColorMap[variant ?? 'primary'])"
            aria-hidden="true"
        />
        <slot />
    </Primitive>
</template>

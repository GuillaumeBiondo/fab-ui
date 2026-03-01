<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import type { ToggleEmits, ToggleProps } from 'reka-ui';
import { Toggle } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { computed } from 'vue';

type Shape = 'ghost' | 'outline' | 'plain';
type Size  = 'tiny' | 'small' | 'default' | 'large' | 'extra';

interface Props extends ToggleProps {
    variant?:  Severity;
    shape?:    Shape;
    size?:     Size;
    /** Texte affiché quand pressed = true */
    onValue?:  string;
    /** Texte affiché quand pressed = false */
    offValue?: string;
    class?:    string;
}

const props     = withDefaults(defineProps<Props>(), { variant: 'primary', shape: 'ghost', size: 'default' });
const emits     = defineEmits<ToggleEmits>();
const delegated = reactiveOmit(props, 'variant', 'shape', 'size', 'onValue', 'offValue', 'class');
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
    '--toggle-color': variantColor[props.variant ?? 'primary'],
}));

const sizeClasses: Record<Size, string> = {
    tiny:    'h-6  px-1.5 text-xs gap-1',
    small:   'h-7  px-2   text-xs gap-1.5',
    default: 'h-9  px-3   text-sm gap-2',
    large:   'h-10 px-4   text-sm gap-2',
    extra:   'h-12 px-5   text-base gap-2.5',
};

/* Les classes on-state utilisent --toggle-color défini en inline style */
const shapeBase: Record<Shape, string> = {
    ghost:   [
        'border-transparent bg-transparent',
        'hover:bg-(--color-bg-subtle)',
        'data-[state=on]:bg-(--toggle-color)/15 data-[state=on]:text-(--toggle-color)',
    ].join(' '),
    outline: [
        'border border-(--color-border) bg-transparent',
        'hover:bg-(--color-bg-subtle)',
        'data-[state=on]:border-(--toggle-color) data-[state=on]:bg-(--toggle-color)/10 data-[state=on]:text-(--toggle-color)',
    ].join(' '),
    plain:   [
        'border-transparent bg-(--color-bg-subtle)',
        'hover:bg-(--color-bg-raised)',
        'data-[state=on]:bg-(--toggle-color) data-[state=on]:text-white',
    ].join(' '),
};
</script>

<template>
    <Toggle
        data-slot="toggle"
        v-bind="forwarded"
        v-slot="{ pressed: isOn }"
        :style="colorStyle"
        :class="
            cn(
                'inline-flex items-center justify-center rounded-(--radius-md) font-medium',
                'transition-colors duration-(--transition-fast) outline-none cursor-pointer',
                'focus-visible:ring-2 focus-visible:ring-(--toggle-color)/30',
                'disabled:pointer-events-none disabled:opacity-50',
                'text-(--color-text-subtle) hover:text-(--color-text)',
                shapeBase[shape ?? 'ghost'],
                sizeClasses[size ?? 'default'],
                props.class,
            )
        "
    >
        <template v-if="onValue !== undefined || offValue !== undefined">
            {{ isOn ? (onValue ?? offValue) : (offValue ?? onValue) }}
        </template>
        <slot v-else />
    </Toggle>
</template>

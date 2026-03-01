<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import type { SliderRootEmits, SliderRootProps } from 'reka-ui';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { computed } from 'vue';

type Size = 'small' | 'default' | 'large';

interface Props extends SliderRootProps {
    variant?: Severity;
    size?:    Size;
    class?:   string;
}

const props     = withDefaults(defineProps<Props>(), { variant: 'primary', size: 'default' });
const emits     = defineEmits<SliderRootEmits>();
const delegated = reactiveOmit(props, 'variant', 'size', 'class');
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
    '--slider-color': variantColor[props.variant ?? 'primary'],
}));

const trackHeight: Record<Size, string> = {
    small:   'h-1',
    default: 'h-1.5',
    large:   'h-2.5',
};

const thumbSize: Record<Size, string> = {
    small:   'size-3.5',
    default: 'size-4',
    large:   'size-5',
};
</script>

<template>
    <SliderRoot
        data-slot="slider"
        v-bind="forwarded"
        :style="colorStyle"
        :class="
            cn(
                'relative flex w-full touch-none select-none items-center',
                'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
                props.class,
            )
        "
    >
        <SliderTrack
            data-slot="slider-track"
            :class="cn('relative w-full grow overflow-hidden rounded-full bg-(--color-bg-subtle)', trackHeight[size ?? 'default'])"
        >
            <SliderRange
                data-slot="slider-range"
                class="absolute h-full bg-(--slider-color)"
            />
        </SliderTrack>

        <SliderThumb
            v-for="(_, i) in (modelValue ?? defaultValue ?? [0])"
            :key="i"
            data-slot="slider-thumb"
            :class="
                cn(
                    'block rounded-full border-2 border-(--slider-color) bg-white',
                    'shadow-sm transition-shadow',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--slider-color)/30',
                    'disabled:pointer-events-none disabled:opacity-50',
                    thumbSize[size ?? 'default'],
                )
            "
        />
    </SliderRoot>
</template>

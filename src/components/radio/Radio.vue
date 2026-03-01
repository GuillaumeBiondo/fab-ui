<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import type { RadioGroupItemEmits, RadioGroupItemProps } from 'reka-ui';
import { RadioGroupIndicator, RadioGroupItem, useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { computed } from 'vue';

type Size = 'small' | 'default' | 'large';

interface Props extends RadioGroupItemProps {
    variant?: Severity;
    size?:    Size;
    /** Libellé affiché à droite du bouton radio */
    label?:   string;
    class?:   string;
}

const props     = withDefaults(defineProps<Props>(), { variant: 'primary', size: 'default' });
const emits     = defineEmits<RadioGroupItemEmits>();
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
    '--radio-color': variantColor[props.variant ?? 'primary'],
}));

const itemSize: Record<Size, string> = {
    small:   'size-3.5',
    default: 'size-4',
    large:   'size-5',
};

const dotSize: Record<Size, string> = {
    small:   'size-1.5',
    default: 'size-2',
    large:   'size-2.5',
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
        <RadioGroupItem
            v-bind="forwarded"
            data-slot="radio"
            :style="colorStyle"
            :class="
                cn(
                    'shrink-0 rounded-full outline-none',
                    'border-2 border-(--color-border-strong)',
                    'shadow-xs transition-[border-color,box-shadow] duration-(--transition-fast)',
                    'data-[state=checked]:border-(--radio-color)',
                    'focus-visible:ring-2 focus-visible:ring-(--radio-color)/30 focus-visible:border-(--radio-color)',
                    'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
                    'disabled:pointer-events-none',
                    itemSize[size ?? 'default'],
                )
            "
        >
            <RadioGroupIndicator
                data-slot="radio-indicator"
                class="flex items-center justify-center w-full h-full"
            >
                <span
                    :class="
                        cn(
                            'rounded-full bg-(--radio-color)',
                            dotSize[size ?? 'default'],
                        )
                    "
                />
            </RadioGroupIndicator>
        </RadioGroupItem>
        <span
            v-if="label"
            :class="cn('select-none font-medium text-(--color-text)', labelSize[size ?? 'default'])"
        >
            {{ label }}
        </span>
    </label>
</template>

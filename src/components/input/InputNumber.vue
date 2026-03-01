<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { Minus, Plus } from 'lucide-vue-next';
import { computed } from 'vue';

const props = defineProps<{
    defaultValue?: number;
    modelValue?: number;
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    min?: number;
    max?: number;
    step?: number;
    /**
     * Affiche les boutons +/− sur les côtés (default) ou cachés (false).
     */
    controls?: boolean;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const step = computed(() => props.step ?? 1);

const canDecrement = computed(() =>
    props.min === undefined ? true : (modelValue.value ?? 0) - step.value >= props.min,
);
const canIncrement = computed(() =>
    props.max === undefined ? true : (modelValue.value ?? 0) + step.value <= props.max,
);

const withControls = computed(() => props.controls !== false);

function decrement() {
    if (!canDecrement.value) return;
    modelValue.value = (modelValue.value ?? 0) - step.value;
}

function increment() {
    if (!canIncrement.value) return;
    modelValue.value = (modelValue.value ?? 0) + step.value;
}
</script>

<template>
    <div :class="cn('flex', props.class)">
        <button
            v-if="withControls"
            type="button"
            tabindex="-1"
            :disabled="disabled || !canDecrement"
            class="h-9 flex items-center justify-center w-8 shrink-0 rounded-l-(--radius-md) border border-r-0 border-(--color-border) bg-(--color-bg-subtle) text-(--color-text-muted) hover:bg-(--color-bg-raised) hover:text-(--color-text) disabled:pointer-events-none disabled:opacity-40 transition-colors"
            @click="decrement"
        >
            <Minus class="size-3.5" />
        </button>

        <input
            v-model="modelValue"
            data-slot="input"
            type="number"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :min="min"
            :max="max"
            :step="step"
            :aria-invalid="!!error || undefined"
            :class="
                cn(
                    'h-9 w-full min-w-0 border border-(--color-border) bg-(--color-bg)',
                    'px-3 py-1 font-sans text-sm text-(--color-text) text-center placeholder:text-(--color-text-disabled)',
                    'shadow-(--shadow-sm) transition-[border-color,box-shadow] duration-(--transition-fast)',
                    'outline-none',
                    'focus-visible:border-(--color-action) focus-visible:ring-2 focus-visible:ring-(--color-action)/20',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-bg-subtle)',
                    'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
                    '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                    withControls ? 'rounded-none' : 'rounded-(--radius-md)',
                )
            "
        />

        <button
            v-if="withControls"
            type="button"
            tabindex="-1"
            :disabled="disabled || !canIncrement"
            class="h-9 flex items-center justify-center w-8 shrink-0 rounded-r-(--radius-md) border border-l-0 border-(--color-border) bg-(--color-bg-subtle) text-(--color-text-muted) hover:bg-(--color-bg-raised) hover:text-(--color-text) disabled:pointer-events-none disabled:opacity-40 transition-colors"
            @click="increment"
        >
            <Plus class="size-3.5" />
        </button>
    </div>
</template>

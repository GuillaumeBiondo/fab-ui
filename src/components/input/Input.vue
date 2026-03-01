<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    defaultValue?: string | number;
    modelValue?: string | number;
    class?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});
</script>

<template>
    <input
        v-model="modelValue"
        data-slot="input"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :aria-invalid="!!error || undefined"
        :class="
            cn(
                'h-9 w-full min-w-0 rounded-(--radius-md) border border-(--color-border) bg-(--color-bg)',
                'px-3 py-1 font-sans text-sm text-(--color-text) placeholder:text-(--color-text-disabled)',
                'shadow-(--shadow-sm) transition-[border-color,box-shadow] duration-(--transition-fast)',
                'outline-none',
                'focus-visible:border-(--color-action) focus-visible:ring-2 focus-visible:ring-(--color-action)/20',
                'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-bg-subtle)',
                'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
                'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-(--color-text)',
                props.class,
            )
        "
    />
</template>

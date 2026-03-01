<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps<{
    defaultValue?: string;
    modelValue?: string;
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    rows?: number;
    cols?: number;
    /** Nombre maximum de caractères autorisés — affiche un compteur si défini */
    maxlength?: number;
    /** Comportement du redimensionnement : none | vertical (default) | horizontal | both */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const charCount = computed(() => modelValue.value?.length ?? 0);
const nearLimit = computed(() => props.maxlength !== undefined && charCount.value >= props.maxlength * 0.9);
const overLimit = computed(() => props.maxlength !== undefined && charCount.value > props.maxlength);

const resizeClass: Record<string, string> = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
};
</script>

<template>
    <div :class="cn(cols ? 'inline-flex flex-col' : 'flex flex-col', props.class)">
        <textarea
            v-model="modelValue"
            data-slot="input"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :rows="rows ?? 3"
            :cols="cols"
            :maxlength="maxlength"
            :aria-invalid="!!error || undefined"
            :class="
                cn(
                    cols ? 'min-w-0' : 'w-full min-w-0',
                    'rounded-(--radius-md) border border-(--color-border) bg-(--color-bg)',
                    'px-3 py-2 font-sans text-sm text-(--color-text) placeholder:text-(--color-text-disabled)',
                    'shadow-(--shadow-sm) transition-[border-color,box-shadow] duration-(--transition-fast)',
                    'outline-none',
                    'focus-visible:border-(--color-action) focus-visible:ring-2 focus-visible:ring-(--color-action)/20',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-bg-subtle)',
                    'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
                    resizeClass[resize ?? 'vertical'],
                )
            "
        />
        <div
            v-if="maxlength"
            class="mt-1 text-right select-none text-xs tabular-nums"
            :class="overLimit ? 'text-(--color-danger)' : nearLimit ? 'text-(--color-warning)' : 'text-(--color-text-muted)'"
        >
            {{ charCount }}&thinsp;/&thinsp;{{ maxlength }}
        </div>
    </div>
</template>

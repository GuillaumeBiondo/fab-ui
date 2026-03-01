<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVModel } from '@vueuse/core';
import { Eye, EyeOff } from 'lucide-vue-next';
import { ref } from 'vue';

const props = defineProps<{
    defaultValue?: string;
    modelValue?: string;
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}>();

const emits = defineEmits<{
    (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
});

const visible = ref(false);
</script>

<template>
    <div :class="cn('relative', props.class)">
        <input
            v-model="modelValue"
            data-slot="input"
            :type="visible ? 'text' : 'password'"
            :placeholder="placeholder"
            :disabled="disabled"
            :required="required"
            :aria-invalid="!!error || undefined"
            :class="
                cn(
                    'h-9 w-full min-w-0 rounded-(--radius-md) border border-(--color-border) bg-(--color-bg)',
                    'px-3 py-1 pr-9 font-sans text-sm text-(--color-text) placeholder:text-(--color-text-disabled)',
                    'shadow-(--shadow-sm) transition-[border-color,box-shadow] duration-(--transition-fast)',
                    'outline-none',
                    'focus-visible:border-(--color-action) focus-visible:ring-2 focus-visible:ring-(--color-action)/20',
                    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-(--color-bg-subtle)',
                    'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
                )
            "
        />
        <button
            type="button"
            tabindex="-1"
            :disabled="disabled"
            class="absolute inset-y-0 right-0 flex items-center px-2.5 text-(--color-text-muted) hover:text-(--color-text) disabled:pointer-events-none"
            @click="visible = !visible"
        >
            <component :is="visible ? EyeOff : Eye" class="size-4" />
        </button>
    </div>
</template>

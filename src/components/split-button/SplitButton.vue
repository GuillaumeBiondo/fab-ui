<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { Severity } from '@/types/ui-kit';
import { buttonVariants } from '@/components/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { Spinner } from '@/components/spinner';
import { ChevronDown } from 'lucide-vue-next';
import type { Component } from 'vue';

type Shape = 'plain' | 'outline' | 'ghost';
type Size  = 'tiny' | 'small' | 'default' | 'large' | 'extra';

const props = withDefaults(
    defineProps<{
        variant?:   Severity;
        shape?:     Shape;
        size?:      Size;
        fluid?:     boolean;
        disabled?:  boolean;
        loading?:   boolean;
        /** Icône à gauche du label */
        iconLeft?:  Component;
        class?:     string;
    }>(),
    { variant: 'primary', shape: 'plain', size: 'default', fluid: false, disabled: false, loading: false },
);

const emits = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();
</script>

<template>
    <div :class="cn('inline-flex rounded-(--radius-md)', fluid && 'w-full', props.class)">
        <!-- Bouton principal -->
        <button
            type="button"
            :disabled="disabled || loading"
            :class="
                cn(
                    buttonVariants({ variant, shape, size, fluid }),
                    'rounded-r-none border-r-0 flex-1',
                )
            "
            @click="emits('click', $event)"
        >
            <Spinner v-if="loading" class="size-4 animate-spin" />
            <component :is="iconLeft" v-else-if="iconLeft" class="size-4" />
            <slot />
        </button>

        <!-- Flèche dropdown -->
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <button
                    type="button"
                    :disabled="disabled || loading"
                    :class="
                        cn(
                            buttonVariants({ variant, shape, size }),
                            'rounded-l-none px-2 border-l border-white/25',
                            shape === 'outline' && 'border-l-0',
                            shape === 'ghost'   && 'border-l border-(--color-border)',
                        )
                    "
                >
                    <ChevronDown class="size-3.5" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <slot name="dropdown" />
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>

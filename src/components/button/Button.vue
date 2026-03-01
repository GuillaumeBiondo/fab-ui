<script setup lang="ts">
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-vue-next';
import { Primitive } from 'reka-ui';
import type { PrimitiveProps } from 'reka-ui';
import type { Component } from 'vue';
import { computed } from 'vue';
import { buttonVariants } from '.';
import type { ButtonVariants } from '.';

interface Props extends PrimitiveProps {
    variant?:   ButtonVariants['variant'];
    shape?:     ButtonVariants['shape'];
    size?:      ButtonVariants['size'];
    fluid?:     boolean;
    rounded?:   boolean;
    /** Mode icône seule — bouton carré (cercle si rounded) */
    icon?:      boolean;
    loading?:   boolean;
    disabled?:  boolean;
    /** Badge numérique en overlay coin supérieur droit */
    badge?:     number | null;
    /** Icône à gauche du texte */
    iconLeft?:  Component;
    /** Icône à droite du texte */
    iconRight?: Component;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), {
    as:       'button',
    shape:    'plain',
    loading:  false,
    disabled: false,
    icon:     false,
    fluid:    false,
    rounded:  false,
    badge:    null,
});

const isDisabled = computed(() => props.disabled || props.loading);

const iconSize = computed(() => {
    const map: Record<string, string> = {
        tiny:    'size-3',
        small:   'size-3.5',
        default: 'size-4',
        large:   'size-5',
        extra:   'size-6',
    };
    return map[props.size ?? 'default'];
});
</script>

<template>
    <Primitive
        data-slot="button"
        :as="as"
        :as-child="asChild"
        :disabled="isDisabled || undefined"
        :aria-busy="loading || undefined"
        :class="
            cn(
                buttonVariants({
                    variant,
                    shape,
                    size,
                    fluid,
                    rounded,
                    iconOnly: icon,
                }),
                props.class,
            )
        "
    >
        <!-- Spinner loading -->
        <Loader2Icon
            v-if="loading"
            :class="cn('animate-spin', iconSize)"
            aria-hidden="true"
        />

        <!-- Icône gauche -->
        <component
            :is="iconLeft"
            v-if="iconLeft && !loading"
            :class="iconSize"
            aria-hidden="true"
        />

        <!-- Contenu (texte / icône principale) -->
        <slot />

        <!-- Icône droite -->
        <component
            :is="iconRight"
            v-if="iconRight"
            :class="iconSize"
            aria-hidden="true"
        />

        <!-- Badge numérique overlay -->
        <span
            v-if="badge !== null && badge !== undefined && badge >= 0"
            class="absolute -top-1.5 -right-1.5 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold leading-none text-white"
        >
            {{ badge > 99 ? '99+' : badge }}
        </span>
    </Primitive>
</template>

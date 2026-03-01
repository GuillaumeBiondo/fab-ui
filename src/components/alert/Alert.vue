<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
    AlertCircleIcon,
    CheckCircle2Icon,
    InfoIcon,
    TriangleAlertIcon,
    XIcon,
} from 'lucide-vue-next';
import type { Component } from 'vue';
import { computed, onMounted, onUnmounted, ref } from 'vue';

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning' | 'help' | 'contrast';

const props = withDefaults(
    defineProps<{
        variant?:    AlertVariant;
        title?:      string;
        dismissible?: boolean;
        /** Afficher l'icône par défaut */
        icon?:       boolean;
        /** Remplacer l'icône par un composant custom */
        iconComponent?: Component;
        /** Autoclose en ms (0 = pas d'autoclose) */
        delay?:      number;
        class?:      string;
    }>(),
    {
        variant:     'info',
        dismissible: false,
        icon:        true,
        delay:       0,
    },
);

const emit = defineEmits<{ close: [] }>();

const visible = ref(true);
let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
    if (props.delay && props.delay > 0) {
        timer = setTimeout(() => {
            visible.value = false;
            emit('close');
        }, props.delay);
    }
});

onUnmounted(() => {
    if (timer) clearTimeout(timer);
});

function dismiss() {
    visible.value = false;
    if (timer) clearTimeout(timer);
    emit('close');
}

const defaultIcons: Partial<Record<AlertVariant, Component>> = {
    primary:   InfoIcon,
    secondary: InfoIcon,
    info:      InfoIcon,
    success:   CheckCircle2Icon,
    warning:   TriangleAlertIcon,
    danger:    AlertCircleIcon,
    help:      InfoIcon,
    contrast:  InfoIcon,
};

const resolvedIcon = computed(() => props.iconComponent ?? defaultIcons[props.variant ?? 'info']);

type AlertConfig = { classes: string; darkClasses: string };

const config = computed((): AlertConfig => {
    const map: Record<AlertVariant, AlertConfig> = {
        primary:   { classes: 'bg-(--color-info-bg)    text-(--color-info)',    darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-info)    dark:text-(--brand-800)' },
        secondary: { classes: 'bg-(--color-bg-subtle)  text-(--color-text)',    darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-border)  dark:text-(--color-text)' },
        info:      { classes: 'bg-(--color-info-bg)    text-(--color-info)',    darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-info)    dark:text-(--brand-800)' },
        success:   { classes: 'bg-(--color-success-bg) text-(--color-success)', darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-success) dark:text-[#4ade80]' },
        warning:   { classes: 'bg-(--color-warning-bg) text-(--color-warning)', darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-warning) dark:text-[#fb923c]' },
        danger:    { classes: 'bg-(--color-danger-bg)  text-(--color-danger)',  darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-danger)  dark:text-[#f87171]' },
        help:      { classes: 'bg-(--color-help-bg)    text-(--color-help)',    darkClasses: 'dark:bg-transparent dark:border-l-4 dark:border-(--color-help)    dark:text-[#a78bfa]' },
        contrast:  { classes: 'bg-(--color-contrast)   text-white',             darkClasses: 'dark:bg-(--color-contrast-bg) dark:text-(--color-contrast)' },
    };
    return map[props.variant ?? 'info'];
});
</script>

<template>
    <Transition
        enter-active-class="transition-all duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition-all duration-150"
        leave-to-class="opacity-0 -translate-y-1"
    >
        <div
            v-if="visible"
            data-slot="alert"
            role="alert"
            :class="
                cn(
                    'flex items-start gap-3 rounded-(--radius-lg) px-4 py-3',
                    config.classes,
                    config.darkClasses,
                    'dark:bg-(--color-bg-subtle) dark:border dark:border-(--color-border)',
                    props.class,
                )
            "
        >
            <!-- Icône (default ou custom via slot #icon) -->
            <slot name="icon">
                <component
                    :is="resolvedIcon"
                    v-if="icon || iconComponent"
                    class="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                />
            </slot>

            <!-- Contenu -->
            <div class="flex-1 font-mono text-sm leading-relaxed">
                <p v-if="title" class="font-medium">{{ title }}</p>
                <div :class="title ? 'mt-0.5 opacity-90' : ''">
                    <slot />
                </div>
            </div>

            <!-- Close -->
            <button
                v-if="dismissible"
                type="button"
                class="ml-auto -mr-1 flex size-5 shrink-0 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                aria-label="Fermer"
                @click="dismiss"
            >
                <XIcon class="size-3" />
            </button>
        </div>
    </Transition>
</template>

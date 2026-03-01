<script setup lang="ts">
import {
    AlertCircleIcon,
    CheckCircle2Icon,
    InfoIcon,
    TriangleAlertIcon,
    XIcon,
} from 'lucide-vue-next';
import { computed, onMounted, ref } from 'vue';
import type { Toast } from '@/composables/useToast';

const props = defineProps<{
    toast: Toast;
}>();

const emit = defineEmits<{
    dismiss: [id: string];
}>();

// Barre de progression
const progress = ref(100);
let progressInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    if (!props.toast.persistent && props.toast.duration > 0) {
        const step = 100 / (props.toast.duration / 50);
        progressInterval = setInterval(() => {
            progress.value -= step;
            if (progress.value <= 0) {
                clearInterval(progressInterval!);
            }
        }, 50);
    }
});

const config = computed(() => {
    const map = {
        info: {
            icon: InfoIcon,
            bar: 'bg-(--color-info)',
            classes: 'bg-(--color-info-bg) text-(--color-info) dark:bg-(--color-bg-raised) dark:border-l-4 dark:border-(--color-info) dark:text-(--brand-800)',
        },
        success: {
            icon: CheckCircle2Icon,
            bar: 'bg-(--color-success)',
            classes: 'bg-(--color-success-bg) text-(--color-success) dark:bg-(--color-bg-raised) dark:border-l-4 dark:border-(--color-success) dark:text-[#4ade80]',
        },
        warning: {
            icon: TriangleAlertIcon,
            bar: 'bg-(--color-warning)',
            classes: 'bg-(--color-warning-bg) text-(--color-warning) dark:bg-(--color-bg-raised) dark:border-l-4 dark:border-(--color-warning) dark:text-[#fb923c]',
        },
        error: {
            icon: AlertCircleIcon,
            bar: 'bg-(--color-danger)',
            classes: 'bg-(--color-danger-bg) text-(--color-danger) dark:bg-(--color-bg-raised) dark:border-l-4 dark:border-(--color-danger) dark:text-[#f87171]',
        },
    };
    return map[props.toast.variant];
});
</script>

<template>
    <div
        role="status"
        aria-live="polite"
        :class="[
            'relative w-full max-w-[380px] overflow-hidden rounded-(--radius-lg)',
            'flex items-start gap-3 px-4 py-3',
            'shadow-(--shadow-lg)',
            'dark:border dark:border-(--color-border)',
            config.classes,
        ]"
    >
        <!-- Icône -->
        <component
            :is="config.icon"
            class="mt-0.5 size-4 shrink-0"
            aria-hidden="true"
        />

        <!-- Message -->
        <p class="flex-1 font-mono text-sm leading-relaxed">
            {{ toast.message }}
        </p>

        <!-- Close -->
        <button
            type="button"
            class="ml-auto -mr-1 flex size-5 shrink-0 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            aria-label="Fermer"
            @click="emit('dismiss', toast.id)"
        >
            <XIcon class="size-3" />
        </button>

        <!-- Barre de progression -->
        <div
            v-if="!toast.persistent && toast.duration > 0"
            class="absolute bottom-0 left-0 h-0.5 opacity-40 transition-[width] duration-50"
            :class="config.bar"
            :style="{ width: `${progress}%` }"
        />
    </div>
</template>

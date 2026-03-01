<script setup lang="ts">
import { useToast } from '@/composables/useToast';
import ToastItem from './Toast.vue';

const { toasts, dismiss } = useToast();
</script>

<template>
    <Teleport to="body">
        <div
            class="fixed bottom-4 right-4 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col gap-2"
            aria-live="polite"
            aria-label="Notifications"
        >
            <TransitionGroup
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="translate-y-4 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-2 opacity-0"
            >
                <ToastItem
                    v-for="toast in toasts"
                    :key="toast.id"
                    :toast="toast"
                    @dismiss="dismiss"
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

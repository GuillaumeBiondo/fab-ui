import { reactive } from 'vue';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export type ToastOptions = {
    duration?: number;
    persistent?: boolean;
};

export type Toast = {
    id: string;
    variant: ToastVariant;
    message: string;
    duration: number;
    persistent: boolean;
};

// Durées automatiques par défaut (ms)
const DEFAULT_DURATIONS: Record<ToastVariant, number> = {
    info:    4000,
    success: 4000,
    warning: 6000,
    error:   0,     // persistant par défaut
};

// État partagé — module-level pour être global
const toasts = reactive<Toast[]>([]);

function generateId(): string {
    return Math.random().toString(36).slice(2, 9);
}

function removeToast(id: string): void {
    const index = toasts.findIndex((t) => t.id === id);
    if (index > -1) toasts.splice(index, 1);
}

function addToast(variant: ToastVariant, message: string, options?: ToastOptions): string {
    const id = generateId();
    const duration = options?.duration ?? DEFAULT_DURATIONS[variant];
    const persistent = options?.persistent ?? variant === 'error';

    // Max 3 toasts simultanés — supprimer le plus ancien
    if (toasts.length >= 3) {
        toasts.shift();
    }

    toasts.push({ id, variant, message, duration, persistent });

    if (!persistent && duration > 0) {
        setTimeout(() => removeToast(id), duration);
    }

    return id;
}

export function useToast() {
    return {
        toasts,
        success: (message: string, options?: ToastOptions) => addToast('success', message, options),
        warning: (message: string, options?: ToastOptions) => addToast('warning', message, options),
        error:   (message: string, options?: ToastOptions) => addToast('error',   message, options),
        info:    (message: string, options?: ToastOptions) => addToast('info',    message, options),
        dismiss: removeToast,
    };
}

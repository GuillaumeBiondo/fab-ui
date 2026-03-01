import type { ComputedRef, Ref } from 'vue';
import { computed, onMounted, ref } from 'vue';
import type { Appearance, RadiusMode, ResolvedAppearance } from '@/types';

export type { Appearance, RadiusMode, ResolvedAppearance };

// ── useAppearance ──────────────────────────────────────────────────────────

export type UseAppearanceReturn = {
    appearance: Ref<Appearance>;
    resolvedAppearance: ComputedRef<ResolvedAppearance>;
    updateAppearance: (value: Appearance) => void;
    radiusMode: Ref<RadiusMode>;
    updateRadiusMode: (value: RadiusMode) => void;
};

// ── Theme (dark / light / system) ─────────────────────────────────────────

export function updateTheme(value: Appearance): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (value === 'system') {
        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme = mediaQueryList.matches ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
        document.documentElement.classList.toggle('dark', value === 'dark');
    }
}

// ── Radius mode (default / square) ────────────────────────────────────────

function applyRadiusMode(value: RadiusMode): void {
    if (typeof document === 'undefined') {
        return;
    }
    if (value === 'square') {
        document.documentElement.setAttribute('data-radius', 'square');
    } else {
        document.documentElement.removeAttribute('data-radius');
    }
}

// ── Cookie helper (pour SSR) ───────────────────────────────────────────────

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

// ── Media query helpers ────────────────────────────────────────────────────

const mediaQuery = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.matchMedia('(prefers-color-scheme: dark)');
};

const getStoredAppearance = () => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('appearance') as Appearance | null;
};

const getStoredRadiusMode = (): RadiusMode | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    return localStorage.getItem('radius-mode') as RadiusMode | null;
};

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const handleSystemThemeChange = () => {
    const currentAppearance = getStoredAppearance();
    updateTheme(currentAppearance || 'system');
};

// ── initializeTheme — appelé au démarrage de l'app ────────────────────────

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    // Thème dark / light
    const savedAppearance = getStoredAppearance();
    updateTheme(savedAppearance || 'system');

    // Radius mode
    const savedRadiusMode = getStoredRadiusMode();
    applyRadiusMode(savedRadiusMode || 'default');

    // Écouter les changements système
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

// ── useAppearance composable ───────────────────────────────────────────────

const appearance = ref<Appearance>('system');
const radiusMode = ref<RadiusMode>('default');

export function useAppearance(): UseAppearanceReturn {
    onMounted(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        if (savedAppearance) {
            appearance.value = savedAppearance;
        }

        const savedRadiusMode = localStorage.getItem('radius-mode') as RadiusMode | null;
        if (savedRadiusMode) {
            radiusMode.value = savedRadiusMode;
        }
    });

    const resolvedAppearance = computed<ResolvedAppearance>(() => {
        if (appearance.value === 'system') {
            return prefersDark() ? 'dark' : 'light';
        }
        return appearance.value;
    });

    function updateAppearance(value: Appearance) {
        appearance.value = value;
        localStorage.setItem('appearance', value);
        setCookie('appearance', value);
        updateTheme(value);
    }

    function updateRadiusMode(value: RadiusMode) {
        radiusMode.value = value;
        localStorage.setItem('radius-mode', value);
        applyRadiusMode(value);
    }

    return {
        appearance,
        resolvedAppearance,
        updateAppearance,
        radiusMode,
        updateRadiusMode,
    };
}

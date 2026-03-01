import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Badge } from './Badge.vue';
export { default as OverlayBadge } from './OverlayBadge.vue';

// ── Base ─────────────────────────────────────────────────────────────────────

export const badgeVariants = cva(
    'inline-flex items-center gap-1 whitespace-nowrap font-sans font-medium transition-colors',
    {
        variants: {
            // ── Sévérité ────────────────────────────────────────────────────
            variant: {
                primary:   '',
                secondary: '',
                success:   '',
                danger:    '',
                info:      '',
                warning:   '',
                help:      '',
                contrast:  '',
            },
            // ── Forme ───────────────────────────────────────────────────────
            shape: {
                filled:  '',
                outline: 'bg-transparent border',
                ghost:   'bg-transparent',
            },
            // ── Taille ──────────────────────────────────────────────────────
            size: {
                tiny:    'px-1 py-px text-[9px] rounded-(--radius-sm)',
                small:   'px-1.5 py-0.5 text-[10px] rounded-(--radius-sm)',
                default: 'px-2 py-0.5 text-xs rounded-(--radius-full)',
                large:   'px-2.5 py-1 text-sm rounded-(--radius-full)',
                extra:   'px-3 py-1 text-base rounded-(--radius-full)',
            },
            fluid: { true: 'w-full justify-center', false: '' },
        },
        compoundVariants: [
            // filled ──────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'filled', class: 'bg-(--color-action)    text-white' },
            { variant: 'secondary', shape: 'filled', class: 'bg-(--color-bg-subtle) text-(--color-text) border border-(--color-border)' },
            { variant: 'success',   shape: 'filled', class: 'bg-(--color-success-bg) text-(--color-success)' },
            { variant: 'danger',    shape: 'filled', class: 'bg-(--color-danger-bg)  text-(--color-danger)' },
            { variant: 'info',      shape: 'filled', class: 'bg-(--color-info-bg)    text-(--color-info)' },
            { variant: 'warning',   shape: 'filled', class: 'bg-(--color-warning-bg) text-(--color-warning)' },
            { variant: 'help',      shape: 'filled', class: 'bg-(--color-help-bg)    text-(--color-help)' },
            { variant: 'contrast',  shape: 'filled', class: 'bg-(--color-contrast)   text-white' },

            // outline ─────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'outline', class: 'border-(--color-action)  text-(--color-action)' },
            { variant: 'secondary', shape: 'outline', class: 'border-(--color-border)   text-(--color-text)' },
            { variant: 'success',   shape: 'outline', class: 'border-(--color-success)  text-(--color-success)' },
            { variant: 'danger',    shape: 'outline', class: 'border-(--color-danger)   text-(--color-danger)' },
            { variant: 'info',      shape: 'outline', class: 'border-(--color-info)     text-(--color-info)' },
            { variant: 'warning',   shape: 'outline', class: 'border-(--color-warning)  text-(--color-warning)' },
            { variant: 'help',      shape: 'outline', class: 'border-(--color-help)     text-(--color-help)' },
            { variant: 'contrast',  shape: 'outline', class: 'border-(--color-contrast) text-(--color-contrast)' },

            // ghost ───────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'ghost', class: 'text-(--color-action)' },
            { variant: 'secondary', shape: 'ghost', class: 'text-(--color-text)' },
            { variant: 'success',   shape: 'ghost', class: 'text-(--color-success)' },
            { variant: 'danger',    shape: 'ghost', class: 'text-(--color-danger)' },
            { variant: 'info',      shape: 'ghost', class: 'text-(--color-info)' },
            { variant: 'warning',   shape: 'ghost', class: 'text-(--color-warning)' },
            { variant: 'help',      shape: 'ghost', class: 'text-(--color-help)' },
            { variant: 'contrast',  shape: 'ghost', class: 'text-(--color-contrast)' },
        ],
        defaultVariants: {
            variant: 'primary',
            shape:   'filled',
            size:    'default',
            fluid:   false,
        },
    },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

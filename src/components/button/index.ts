import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export { default as Button } from './Button.vue';

// ── Base ─────────────────────────────────────────────────────────────────────

export const buttonVariants = cva(
    [
        'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium',
        'transition-colors duration-100',
        'outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-(--color-action)',
        'disabled:pointer-events-none disabled:opacity-50',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ].join(' '),
    {
        variants: {
            // ── Sévérité (couleur) ──────────────────────────────────────────
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
                plain:   'rounded-(--radius-md)',
                outline: 'rounded-(--radius-md) border bg-transparent',
                ghost:   'rounded-(--radius-md) bg-transparent',
                link:    'bg-transparent underline-offset-4 hover:underline',
            },
            // ── Taille ──────────────────────────────────────────────────────
            size: {
                tiny:    'h-6  px-2  text-[11px] gap-1',
                small:   'h-7  px-3  text-xs     gap-1.5',
                default: 'h-9  px-4  text-sm     gap-2',
                large:   'h-10 px-5  text-base   gap-2',
                extra:   'h-12 px-6  text-lg     gap-2.5',
            },
            // ── Modificateurs ────────────────────────────────────────────────
            fluid:    { true: 'w-full',     false: '' },
            rounded:  { true: '!rounded-full', false: '' },
            iconOnly: { true: 'px-0',       false: '' },
        },
        // ── Compound : forme × sévérité (couleurs) ────────────────────────
        compoundVariants: [
            // plain ─────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'plain', class: 'bg-(--color-action)    text-white hover:bg-(--color-action-hover) active:bg-(--color-action-active)' },
            { variant: 'secondary', shape: 'plain', class: 'bg-(--color-bg-subtle) text-(--color-text) border border-(--color-border) hover:bg-(--color-border) hover:border-(--color-border-strong)' },
            { variant: 'success',   shape: 'plain', class: 'bg-(--color-success)   text-white hover:bg-(--color-success)/90' },
            { variant: 'danger',    shape: 'plain', class: 'bg-(--color-danger)    text-white hover:bg-(--color-danger)/90' },
            { variant: 'info',      shape: 'plain', class: 'bg-(--color-info)      text-white hover:bg-(--color-info)/90' },
            { variant: 'warning',   shape: 'plain', class: 'bg-(--color-warning)   text-white hover:bg-(--color-warning)/90' },
            { variant: 'help',      shape: 'plain', class: 'bg-(--color-help)      text-white hover:bg-(--color-help)/90' },
            { variant: 'contrast',  shape: 'plain', class: 'bg-(--color-contrast)  text-white hover:bg-(--color-contrast)/90' },

            // outline ────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'outline', class: 'border-(--color-action)        text-(--color-action)   hover:bg-(--color-action)/10' },
            { variant: 'secondary', shape: 'outline', class: 'border-(--color-border-strong) text-(--color-text)     hover:bg-(--color-bg-subtle)' },
            { variant: 'success',   shape: 'outline', class: 'border-(--color-success)       text-(--color-success)  hover:bg-(--color-success)/10' },
            { variant: 'danger',    shape: 'outline', class: 'border-(--color-danger)        text-(--color-danger)   hover:bg-(--color-danger)/10' },
            { variant: 'info',      shape: 'outline', class: 'border-(--color-info)          text-(--color-info)     hover:bg-(--color-info)/10' },
            { variant: 'warning',   shape: 'outline', class: 'border-(--color-warning)       text-(--color-warning)  hover:bg-(--color-warning)/10' },
            { variant: 'help',      shape: 'outline', class: 'border-(--color-help)          text-(--color-help)     hover:bg-(--color-help)/10' },
            { variant: 'contrast',  shape: 'outline', class: 'border-(--color-contrast)      text-(--color-contrast) hover:bg-(--color-contrast)/10' },

            // ghost ──────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'ghost', class: 'text-(--color-action)   hover:bg-(--color-action)/10' },
            { variant: 'secondary', shape: 'ghost', class: 'text-(--color-text)     hover:bg-(--color-bg-subtle)' },
            { variant: 'success',   shape: 'ghost', class: 'text-(--color-success)  hover:bg-(--color-success)/10' },
            { variant: 'danger',    shape: 'ghost', class: 'text-(--color-danger)   hover:bg-(--color-danger)/10' },
            { variant: 'info',      shape: 'ghost', class: 'text-(--color-info)     hover:bg-(--color-info)/10' },
            { variant: 'warning',   shape: 'ghost', class: 'text-(--color-warning)  hover:bg-(--color-warning)/10' },
            { variant: 'help',      shape: 'ghost', class: 'text-(--color-help)     hover:bg-(--color-help)/10' },
            { variant: 'contrast',  shape: 'ghost', class: 'text-(--color-contrast) hover:bg-(--color-contrast)/10' },

            // link ───────────────────────────────────────────────────────────
            { variant: 'primary',   shape: 'link', class: 'text-(--color-action)' },
            { variant: 'secondary', shape: 'link', class: 'text-(--color-text)' },
            { variant: 'success',   shape: 'link', class: 'text-(--color-success)' },
            { variant: 'danger',    shape: 'link', class: 'text-(--color-danger)' },
            { variant: 'info',      shape: 'link', class: 'text-(--color-info)' },
            { variant: 'warning',   shape: 'link', class: 'text-(--color-warning)' },
            { variant: 'help',      shape: 'link', class: 'text-(--color-help)' },
            { variant: 'contrast',  shape: 'link', class: 'text-(--color-contrast)' },

            // icon-only : carré selon la taille ───────────────────────────────
            { iconOnly: true, size: 'tiny',    class: 'w-6' },
            { iconOnly: true, size: 'small',   class: 'w-7' },
            { iconOnly: true, size: 'default', class: 'w-9' },
            { iconOnly: true, size: 'large',   class: 'w-10' },
            { iconOnly: true, size: 'extra',   class: 'w-12' },
        ],
        defaultVariants: {
            variant:  'primary',
            shape:    'plain',
            size:     'default',
            fluid:    false,
            rounded:  false,
            iconOnly: false,
        },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

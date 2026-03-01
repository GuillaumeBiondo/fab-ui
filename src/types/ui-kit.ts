// ────────────────────────────────────────────────────────────────────────────
// Laser Bleu UI Kit — Types standardisés
// ────────────────────────────────────────────────────────────────────────────

/** Sévérité sémantique — commun à Button, Badge, Alert, Card, Tag… */
export type Severity =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'help'
    | 'contrast';

/** Taille standardisée — commun à Button, Badge, Avatar, Input… */
export type Size = 'tiny' | 'small' | 'default' | 'large' | 'extra';

/** Forme du Button */
export type ButtonShape = 'plain' | 'outline' | 'ghost' | 'link';

/** Forme du Badge */
export type BadgeShape = 'filled' | 'outline' | 'ghost';

// ── Mappings couleurs (CSS custom properties) ────────────────────────────────

/** Renvoie la CSS custom property de couleur principale pour une sévérité */
export const severityColorVar: Record<Severity, string> = {
    primary:  '--color-action',
    secondary:'--color-text-subtle',
    success:  '--color-success',
    danger:   '--color-danger',
    info:     '--color-info',
    warning:  '--color-warning',
    help:     '--color-help',
    contrast: '--color-contrast',
};

/** Renvoie la CSS custom property de couleur de fond pour une sévérité */
export const severityBgVar: Record<Severity, string> = {
    primary:  '--color-info-bg',
    secondary:'--color-bg-subtle',
    success:  '--color-success-bg',
    danger:   '--color-danger-bg',
    info:     '--color-info-bg',
    warning:  '--color-warning-bg',
    help:     '--color-help-bg',
    contrast: '--color-contrast-bg',
};

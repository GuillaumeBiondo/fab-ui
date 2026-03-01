export interface DataTableColumn<Row = Record<string, unknown>> {
    /** Clé dans l'objet de données */
    key: string;
    /** En-tête de la colonne */
    label: string;
    /** Colonne triable */
    sortable?: boolean;
    /** Largeur CSS (ex: '120px', '20%') */
    width?: string;
    /** Alignement du contenu */
    align?: 'left' | 'center' | 'right';
    /** Formateur de valeur (fallback si pas de slot #column-{key}) */
    format?: (value: unknown, row: Row) => string;
}

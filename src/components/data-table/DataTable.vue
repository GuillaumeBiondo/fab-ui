<script setup lang="ts" generic="T extends Record<string, unknown>">
import { cn } from '@/lib/utils';
import { useDebounceFn } from '@vueuse/core';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-vue-next';
import { computed, ref, useAttrs, watch } from 'vue';

defineOptions({ inheritAttrs: false });

// ── Types ────────────────────────────────────────────────────────────────────

interface DataTableColumn<Row = Record<string, unknown>> {
    key: string;
    label: string;
    sortable?: boolean;
    width?: string;
    align?: 'left' | 'center' | 'right';
    format?: (value: unknown, row: Row) => string;
}

type SortDir = 'asc' | 'desc' | null;

// ── Props / Emits ────────────────────────────────────────────────────────────

const props = withDefaults(
    defineProps<{
        columns:      DataTableColumn<T>[];
        data:         T[];
        /** Affiche un champ de recherche global */
        searchable?:  boolean;
        /** Affiche une colonne de cases à cocher */
        selectable?:  boolean;
        /** Nombre de lignes par page (0 = pas de pagination) */
        pageSize?:    number;
        /** Options de page size disponibles dans le sélecteur */
        pageSizes?:   number[];
        /** Affiche le skeleton de chargement */
        loading?:     boolean;
        /** Texte de l'état vide */
        emptyText?:   string;
        /** Lignes rayées */
        striped?:     boolean;
        /** Survol mis en évidence */
        hoverable?:   boolean;
        class?:       string;
    }>(),
    {
        pageSize:   15,
        pageSizes:  () => [10, 25, 50, 100],
        emptyText:  'Aucun résultat.',
        hoverable:  true,
    },
);

const emit = defineEmits<{
    'row-click':  [row: T];
    'cell-click': [key: string, row: T];
}>();

const selected = defineModel<T[]>('selected', { default: () => [] });

// Colonne checkbox visible uniquement si v-model:selected est bindé OU selectable=true
const attrs = useAttrs();
const showSelection = computed(() => props.selectable === true || 'onUpdate:selected' in attrs);

// ── Recherche ────────────────────────────────────────────────────────────────

const searchInput = ref('');
const searchQuery = ref('');

const updateSearch = useDebounceFn((v: string) => {
    searchQuery.value = v;
    currentPage.value = 1;
}, 250);

watch(searchInput, updateSearch);

const filteredData = computed(() => {
    const q = searchQuery.value.trim().toLowerCase();
    if (!q || !props.searchable) return props.data;
    return props.data.filter((row) =>
        Object.values(row).some((v) =>
            String(v ?? '').toLowerCase().includes(q),
        ),
    );
});

// ── Tri ──────────────────────────────────────────────────────────────────────

const sortKey = ref<string | null>(null);
const sortDir = ref<SortDir>(null);

function toggleSort(col: DataTableColumn<T>) {
    if (!col.sortable) return;
    if (sortKey.value !== col.key) {
        sortKey.value = col.key;
        sortDir.value = 'asc';
    } else if (sortDir.value === 'asc') {
        sortDir.value = 'desc';
    } else {
        sortKey.value = null;
        sortDir.value = null;
    }
    currentPage.value = 1;
}

const sortedData = computed(() => {
    if (!sortKey.value || !sortDir.value) return filteredData.value;
    const key = sortKey.value;
    const dir = sortDir.value === 'asc' ? 1 : -1;
    return [...filteredData.value].sort((a, b) => {
        const va = a[key] ?? '';
        const vb = b[key] ?? '';
        if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
        return String(va).localeCompare(String(vb)) * dir;
    });
});

// ── Pagination ───────────────────────────────────────────────────────────────

const currentPage  = ref(1);
const currentPageSize = ref(props.pageSize ?? 15);

const totalItems = computed(() => sortedData.value.length);
const totalPages = computed(() => {
    if (!currentPageSize.value) return 1;
    return Math.max(1, Math.ceil(totalItems.value / currentPageSize.value));
});

watch(totalPages, (n) => {
    if (currentPage.value > n) currentPage.value = n;
});

const paginatedData = computed(() => {
    if (!currentPageSize.value) return sortedData.value;
    const start = (currentPage.value - 1) * currentPageSize.value;
    return sortedData.value.slice(start, start + currentPageSize.value);
});

/* Numéros de page affichés (avec ellipsis) */
const pageNumbers = computed(() => {
    const total = totalPages.value;
    const cur   = currentPage.value;
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (cur <= 4)   return [1, 2, 3, 4, 5, '…', total];
    if (cur >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '…', cur - 1, cur, cur + 1, '…', total];
});

const rangeStart = computed(() => (currentPage.value - 1) * currentPageSize.value + 1);
const rangeEnd   = computed(() => Math.min(currentPage.value * currentPageSize.value, totalItems.value));

// ── Sélection ────────────────────────────────────────────────────────────────

const allVisibleSelected = computed(() =>
    paginatedData.value.length > 0 &&
    paginatedData.value.every((row) => selected.value.includes(row)),
);
const someVisibleSelected = computed(() =>
    !allVisibleSelected.value && paginatedData.value.some((row) => selected.value.includes(row)),
);

function toggleAll() {
    if (allVisibleSelected.value) {
        selected.value = selected.value.filter((r) => !paginatedData.value.includes(r));
    } else {
        const toAdd = paginatedData.value.filter((r) => !selected.value.includes(r));
        selected.value = [...selected.value, ...toAdd];
    }
}

function toggleRow(row: T) {
    if (selected.value.includes(row)) {
        selected.value = selected.value.filter((r) => r !== row);
    } else {
        selected.value = [...selected.value, row];
    }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const alignClass: Record<string, string> = {
    left:   'text-left',
    center: 'text-center',
    right:  'text-right',
};

function cellValue(row: T, col: DataTableColumn<T>): string {
    const v = row[col.key];
    if (col.format) return col.format(v, row);
    if (v === null || v === undefined) return '—';
    return String(v);
}

const skeletonRows = computed(() => Array.from({ length: currentPageSize.value || 5 }));
</script>

<template>
    <div data-slot="data-table" :class="cn('flex flex-col gap-3', props.class)">

        <!-- Barre du haut : recherche + infos sélection -->
        <div v-if="searchable || (selectable && selected.length)" class="flex items-center justify-between gap-3">
            <div v-if="searchable" class="relative w-64">
                <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-(--color-text-muted) pointer-events-none" />
                <input
                    v-model="searchInput"
                    type="search"
                    placeholder="Rechercher…"
                    class="h-9 w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-bg) pl-8 pr-3 text-sm text-(--color-text) placeholder:text-(--color-text-disabled) outline-none focus-visible:border-(--color-action) focus-visible:ring-2 focus-visible:ring-(--color-action)/20"
                />
            </div>
            <span v-if="selectable && selected.length" class="ml-auto text-sm text-(--color-text-muted)">
                {{ selected.length }} sélectionné{{ selected.length > 1 ? 's' : '' }}
            </span>
        </div>

        <!-- Tableau -->
        <div class="overflow-x-auto rounded-(--radius-lg) border border-(--color-border)">
            <table class="w-full border-collapse text-sm">
                <!-- En-tête -->
                <thead>
                    <tr class="border-b border-(--color-border) bg-(--color-bg-subtle)">
                        <!-- Checkbox tout sélectionner -->
                        <th v-if="showSelection" class="w-10 px-3 py-3">
                            <input
                                type="checkbox"
                                :checked="allVisibleSelected"
                                :indeterminate="someVisibleSelected"
                                class="size-4 rounded-[4px] border-2 border-(--color-border-strong) accent-(--color-action) cursor-pointer"
                                @change="toggleAll"
                            />
                        </th>
                        <th
                            v-for="col in columns"
                            :key="col.key"
                            :style="col.width ? { width: col.width } : undefined"
                            :class="
                                cn(
                                    'px-4 py-3 font-semibold text-(--color-text) whitespace-nowrap',
                                    alignClass[col.align ?? 'left'],
                                    col.sortable && 'cursor-pointer select-none hover:text-(--color-action) group',
                                )
                            "
                            @click="toggleSort(col)"
                        >
                            <span class="inline-flex items-center gap-1.5">
                                {{ col.label }}
                                <span v-if="col.sortable" class="text-(--color-text-disabled) group-hover:text-(--color-action)">
                                    <ArrowUp   v-if="sortKey === col.key && sortDir === 'asc'"  class="size-3.5 text-(--color-action)" />
                                    <ArrowDown v-else-if="sortKey === col.key && sortDir === 'desc'" class="size-3.5 text-(--color-action)" />
                                    <ArrowUpDown v-else class="size-3.5" />
                                </span>
                            </span>
                        </th>
                    </tr>
                </thead>

                <!-- Skeleton chargement -->
                <tbody v-if="loading">
                    <tr
                        v-for="(_, i) in skeletonRows"
                        :key="i"
                        class="border-b border-(--color-border) last:border-0"
                        :class="striped && i % 2 === 1 ? 'bg-(--color-bg-subtle)' : 'bg-(--color-bg-raised)'"
                    >
                        <td v-if="showSelection" class="px-3 py-3">
                            <div class="size-4 rounded bg-(--color-bg-subtle) animate-pulse" />
                        </td>
                        <td v-for="col in columns" :key="col.key" class="px-4 py-3">
                            <div class="h-4 rounded bg-(--color-bg-subtle) animate-pulse" :style="{ width: `${60 + Math.random() * 30}%` }" />
                        </td>
                    </tr>
                </tbody>

                <!-- Données -->
                <tbody v-else-if="paginatedData.length">
                    <tr
                        v-for="(row, i) in paginatedData"
                        :key="i"
                        :class="
                            cn(
                                'border-b border-(--color-border) last:border-0 transition-colors duration-75',
                                striped && i % 2 === 1 ? 'bg-(--color-bg-subtle)' : 'bg-(--color-bg-raised)',
                                hoverable && 'hover:bg-(--color-action)/5 cursor-pointer',
                                selected.includes(row) && 'bg-(--color-action)/8',
                            )
                        "
                        @click="emit('row-click', row)"
                    >
                        <td
                            v-if="showSelection"
                            class="px-3 py-3"
                            @click.stop
                        >
                            <input
                                type="checkbox"
                                :checked="selected.includes(row)"
                                class="size-4 rounded-[4px] border-2 border-(--color-border-strong) accent-(--color-action) cursor-pointer"
                                @change="toggleRow(row)"
                            />
                        </td>
                        <td
                            v-for="col in columns"
                            :key="col.key"
                            :class="
                                cn(
                                    'px-4 py-3 text-(--color-text)',
                                    alignClass[col.align ?? 'left'],
                                )
                            "
                            @click.stop="emit('cell-click', col.key, row)"
                        >
                            <!-- Slot custom #column-{key}, fallback sur la valeur formatée -->
                            <slot
                                :name="`column-${col.key}`"
                                :row="row"
                                :value="row[col.key]"
                            >
                                <span>{{ cellValue(row, col) }}</span>
                            </slot>
                        </td>
                    </tr>
                </tbody>

                <!-- État vide -->
                <tbody v-else>
                    <tr>
                        <td
                            :colspan="columns.length + (showSelection ? 1 : 0)"
                            class="px-4 py-12 text-center text-(--color-text-muted) bg-(--color-bg-raised)"
                        >
                            <slot name="empty">{{ emptyText }}</slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div
            v-if="pageSize && totalItems > 0"
            class="flex items-center justify-between gap-4 text-sm text-(--color-text-muted)"
        >
            <!-- Info + sélecteur de page size -->
            <div class="flex items-center gap-3">
                <span class="whitespace-nowrap">
                    {{ rangeStart }}–{{ rangeEnd }} sur {{ totalItems }}
                </span>
                <select
                    v-if="pageSizes && pageSizes.length > 1"
                    v-model="currentPageSize"
                    class="h-8 rounded-(--radius-md) border border-(--color-border) bg-(--color-bg) px-2 text-sm text-(--color-text) outline-none focus-visible:border-(--color-action)"
                    @change="currentPage = 1"
                >
                    <option v-for="ps in pageSizes" :key="ps" :value="ps">{{ ps }} / page</option>
                </select>
            </div>

            <!-- Navigation -->
            <div class="flex items-center gap-1">
                <button
                    class="flex size-8 items-center justify-center rounded-(--radius-md) hover:bg-(--color-bg-subtle) disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    :disabled="currentPage === 1"
                    @click="currentPage = 1"
                ><ChevronsLeft class="size-4" /></button>

                <button
                    class="flex size-8 items-center justify-center rounded-(--radius-md) hover:bg-(--color-bg-subtle) disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    :disabled="currentPage === 1"
                    @click="currentPage--"
                ><ChevronLeft class="size-4" /></button>

                <template v-for="(p, i) in pageNumbers" :key="i">
                    <span v-if="p === '…'" class="flex size-8 items-center justify-center text-(--color-text-disabled)">…</span>
                    <button
                        v-else
                        class="flex size-8 items-center justify-center rounded-(--radius-md) text-sm font-medium transition-colors"
                        :class="p === currentPage
                            ? 'bg-(--color-action) text-white'
                            : 'hover:bg-(--color-bg-subtle) text-(--color-text)'"
                        @click="currentPage = p as number"
                    >{{ p }}</button>
                </template>

                <button
                    class="flex size-8 items-center justify-center rounded-(--radius-md) hover:bg-(--color-bg-subtle) disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    :disabled="currentPage === totalPages"
                    @click="currentPage++"
                ><ChevronRight class="size-4" /></button>

                <button
                    class="flex size-8 items-center justify-center rounded-(--radius-md) hover:bg-(--color-bg-subtle) disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    :disabled="currentPage === totalPages"
                    @click="currentPage = totalPages"
                ><ChevronsRight class="size-4" /></button>
            </div>
        </div>
    </div>
</template>

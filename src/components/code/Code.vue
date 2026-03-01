<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { VNode } from 'vue';
import hljs from 'highlight.js';
import { Check, Copy } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        /** Code à afficher — ou utiliser le slot par défaut */
        code?:        string;
        /** Identifiant de langage highlight.js (json, yaml, javascript, php, bash…) */
        language?:    string;
        /** Nom de fichier affiché dans l'en-tête */
        filename?:    string;
        /** Affiche un bouton de copie (défaut : true) */
        copyable?:    boolean;
        /** Affiche les numéros de ligne */
        lineNumbers?: boolean;
        /** CSS max-height — ex : "400px". Aucune limite si absent */
        maxHeight?:   string;
        class?:       string;
    }>(),
    { copyable: true, lineNumbers: false },
);

/* ── Slot fallback ─────────────────────────────────────────────────────────── */
const slots = defineSlots<{ default?: () => unknown }>();

const rawCode = computed(() => {
    if (props.code !== undefined) return props.code;
    // Récupère le texte brut du slot (enfants texte)
    const vnodes = slots.default?.() as VNode[] | undefined;
    if (!vnodes?.length) return '';
    const first = vnodes[0] as { children?: string };
    return typeof first.children === 'string' ? first.children.trim() : '';
});

/* ── Highlight ─────────────────────────────────────────────────────────────── */
const highlighted = computed(() => {
    const code = rawCode.value;
    if (!code) return { value: '', language: '' };
    try {
        if (props.language) {
            return hljs.highlight(code, { language: props.language, ignoreIllegals: true });
        }
        return hljs.highlightAuto(code);
    } catch {
        return { value: code.replace(/</g, '&lt;').replace(/>/g, '&gt;'), language: '' };
    }
});

const detectedLanguage = computed(() =>
    props.language ?? (highlighted.value as { language?: string }).language ?? '',
);

/* ── Line numbers ──────────────────────────────────────────────────────────── */
const lines = computed(() => rawCode.value.split('\n').length);

/* ── Copy ──────────────────────────────────────────────────────────────────── */
const copied = ref(false);

async function copy() {
    try {
        await navigator.clipboard.writeText(rawCode.value);
        copied.value = true;
        setTimeout(() => (copied.value = false), 2000);
    } catch {}
}
</script>

<template>
    <div
        data-slot="code"
        :class="cn('overflow-hidden rounded-(--radius-lg) bg-[#282c34] text-sm font-mono', props.class)"
    >
        <!-- En-tête -->
        <div
            v-if="filename || copyable || detectedLanguage"
            class="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2"
        >
            <div class="flex items-center gap-2 min-w-0">
                <!-- Pastilles macOS -->
                <span class="flex gap-1.5 shrink-0">
                    <span class="size-3 rounded-full bg-[#ff5f56]" />
                    <span class="size-3 rounded-full bg-[#ffbd2e]" />
                    <span class="size-3 rounded-full bg-[#27c93f]" />
                </span>
                <span
                    v-if="filename"
                    class="truncate text-xs text-white/60"
                >{{ filename }}</span>
                <span
                    v-else-if="detectedLanguage"
                    class="text-xs text-white/40 uppercase tracking-wide"
                >{{ detectedLanguage }}</span>
            </div>

            <button
                v-if="copyable"
                type="button"
                class="shrink-0 flex items-center gap-1.5 rounded px-2 py-1 text-xs text-white/50 hover:text-white/90 hover:bg-white/10 transition-colors"
                @click="copy"
            >
                <Check v-if="copied" class="size-3.5 text-green-400" />
                <Copy v-else class="size-3.5" />
                <span>{{ copied ? 'Copié !' : 'Copier' }}</span>
            </button>
        </div>

        <!-- Corps -->
        <div
            class="overflow-auto"
            :style="maxHeight ? { maxHeight } : undefined"
        >
            <table class="w-full border-collapse">
                <tbody>
                    <tr
                        v-for="(line, i) in highlighted.value.split('\n')"
                        :key="i"
                        class="leading-relaxed"
                    >
                        <!-- Numéros de ligne -->
                        <td
                            v-if="lineNumbers"
                            class="select-none pl-4 pr-3 text-right text-white/25 w-px whitespace-nowrap"
                            :style="{ minWidth: `${String(lines).length + 2}ch` }"
                        >{{ i + 1 }}</td>
                        <!-- Ligne de code -->
                        <td
                            class="px-4 whitespace-pre text-[#abb2bf]"
                            :class="lineNumbers && 'pl-0'"
                            v-html="line || '&nbsp;'"
                        />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
/* highlight.js — atom-one-dark inline (évite l'import global qui peut conflicter) */
.hljs-comment, .hljs-quote          { color: #5c6370; font-style: italic; }
.hljs-doctag, .hljs-keyword,
.hljs-formula                       { color: #c678dd; }
.hljs-section, .hljs-name,
.hljs-selector-tag, .hljs-deletion,
.hljs-subst                         { color: #e06c75; }
.hljs-literal                       { color: #56b6c2; }
.hljs-string, .hljs-regexp,
.hljs-addition, .hljs-attribute,
.hljs-meta .hljs-string             { color: #98c379; }
.hljs-attr, .hljs-variable,
.hljs-template-variable,
.hljs-type, .hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo, .hljs-number { color: #d19a66; }
.hljs-symbol, .hljs-bullet,
.hljs-link, .hljs-meta,
.hljs-selector-id, .hljs-title      { color: #61aeee; }
.hljs-built_in, .hljs-title.class_,
.hljs-class .hljs-title             { color: #e6c07b; }
.hljs-emphasis                      { font-style: italic; }
.hljs-strong                        { font-weight: bold; }
.hljs-link                          { text-decoration: underline; }
</style>

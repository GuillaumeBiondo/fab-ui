<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        /** Affiche les flèches de navigation */
        arrows?:    boolean;
        /** Affiche les points indicateurs */
        dots?:      boolean;
        /** Défilement automatique (ms entre slides, 0 = désactivé) */
        autoplay?:  number;
        /** Retourne au début après la dernière slide */
        loop?:      boolean;
        /** Nombre de slides visibles simultanément */
        perView?:   number;
        /** Espace entre les slides (classe gap Tailwind) */
        gap?:       string;
        class?:     string;
    }>(),
    {
        arrows:   true,
        dots:     true,
        autoplay: 0,
        loop:     false,
        perView:  1,
        gap:      'gap-4',
    },
);

const track     = ref<HTMLElement | null>(null);
const current   = ref(0);
const slideCount = ref(0);
let autoplayTimer: ReturnType<typeof setInterval> | null = null;

/* ── Slides ── */
onMounted(() => {
    countSlides();

    const observer = new MutationObserver(countSlides);
    if (track.value) {
        observer.observe(track.value, { childList: true });
    }

    if (props.autoplay > 0) {
        autoplayTimer = setInterval(next, props.autoplay);
    }

    onBeforeUnmount(() => {
        observer.disconnect();
        if (autoplayTimer) clearInterval(autoplayTimer);
    });
});

function countSlides() {
    slideCount.value = track.value?.children.length ?? 0;
}

/* ── Navigation ── */
const canPrev = computed(() => props.loop || current.value > 0);
const canNext = computed(() => props.loop || current.value < slideCount.value - props.perView);

function goTo(index: number) {
    if (!track.value) return;
    const count = slideCount.value;
    current.value = props.loop
        ? ((index % count) + count) % count
        : Math.max(0, Math.min(index, count - props.perView));

    const slideWidth = (track.value.parentElement?.offsetWidth ?? 0) / props.perView;
    track.value.scrollTo({ left: current.value * slideWidth, behavior: 'smooth' });

    if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(next, props.autoplay);
    }
}

function prev() { goTo(current.value - 1); }
function next() { goTo(current.value + 1); }

/* Sync current depuis le scroll natif */
function onScroll() {
    if (!track.value) return;
    const slideWidth = track.value.scrollWidth / slideCount.value;
    current.value = Math.round(track.value.scrollLeft / slideWidth);
}
</script>

<template>
    <div
        data-slot="carousel"
        :class="cn('relative w-full', props.class)"
        @keydown.left.prevent="prev"
        @keydown.right.prevent="next"
        tabindex="0"
    >
        <!-- Track -->
        <div class="overflow-hidden rounded-(--radius-lg)">
            <div
                ref="track"
                :class="cn('flex', gap)"
                class="overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
                style="scroll-behavior: smooth; -ms-overflow-style: none; scrollbar-width: none;"
                @scroll="onScroll"
            >
                <slot />
            </div>
        </div>

        <!-- Flèches -->
        <template v-if="arrows && slideCount > perView">
            <button
                type="button"
                :disabled="!canPrev"
                class="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full bg-(--color-bg-raised)/90 border border-(--color-border) shadow-(--shadow-md) text-(--color-text) hover:bg-(--color-bg-raised) transition-colors disabled:opacity-30 disabled:pointer-events-none"
                @click="prev"
            >
                <ChevronLeft class="size-4" />
            </button>
            <button
                type="button"
                :disabled="!canNext"
                class="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full bg-(--color-bg-raised)/90 border border-(--color-border) shadow-(--shadow-md) text-(--color-text) hover:bg-(--color-bg-raised) transition-colors disabled:opacity-30 disabled:pointer-events-none"
                @click="next"
            >
                <ChevronRight class="size-4" />
            </button>
        </template>

        <!-- Dots -->
        <div
            v-if="dots && slideCount > perView"
            class="mt-3 flex items-center justify-center gap-1.5"
        >
            <button
                v-for="i in slideCount - perView + 1"
                :key="i"
                type="button"
                class="rounded-full transition-all duration-200"
                :class="
                    current === i - 1
                        ? 'w-5 h-2 bg-(--color-action)'
                        : 'size-2 bg-(--color-border-strong) hover:bg-(--color-text-muted)'
                "
                @click="goTo(i - 1)"
            />
        </div>
    </div>
</template>

<style scoped>
/* Cache la scrollbar */
div::-webkit-scrollbar { display: none; }
</style>

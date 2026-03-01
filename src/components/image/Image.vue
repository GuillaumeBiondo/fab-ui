<script setup lang="ts">
import { cn } from '@/lib/utils';
import { ImageOff } from 'lucide-vue-next';
import { ref } from 'vue';

type Fit    = 'cover' | 'contain' | 'fill' | 'none';
type Ratio  = '1/1' | '4/3' | '16/9' | '3/2' | '2/3' | '9/16';

const props = withDefaults(
    defineProps<{
        src:        string;
        alt?:       string;
        /** Ratio d'aspect fixe */
        ratio?:     Ratio;
        /** object-fit */
        fit?:       Fit;
        /** Affiche un skeleton pendant le chargement */
        skeleton?:  boolean;
        /** URL de l'image de fallback en cas d'erreur */
        fallback?:  string;
        /** Arrondi des coins */
        rounded?:   boolean | 'full';
        class?:     string;
    }>(),
    {
        alt:      '',
        fit:      'cover',
        skeleton: true,
        rounded:  false,
    },
);

const emit = defineEmits<{
    load:  [event: Event];
    error: [event: Event];
}>();

const loaded  = ref(false);
const errored = ref(false);

const ratioClass: Record<Ratio, string> = {
    '1/1':  'aspect-square',
    '4/3':  'aspect-[4/3]',
    '16/9': 'aspect-video',
    '3/2':  'aspect-[3/2]',
    '2/3':  'aspect-[2/3]',
    '9/16': 'aspect-[9/16]',
};

const fitClass: Record<Fit, string> = {
    cover:   'object-cover',
    contain: 'object-contain',
    fill:    'object-fill',
    none:    'object-none',
};

const roundedClass = props.rounded === 'full' ? 'rounded-full' : props.rounded ? 'rounded-(--radius-lg)' : '';

function onLoad(e: Event) {
    loaded.value  = true;
    errored.value = false;
    emit('load', e);
}

function onError(e: Event) {
    errored.value = true;
    if (props.fallback) {
        (e.target as HTMLImageElement).src = props.fallback;
        errored.value = false;
    }
    emit('error', e);
}
</script>

<template>
    <div
        data-slot="image"
        :class="
            cn(
                'relative overflow-hidden bg-(--color-bg-subtle)',
                ratio && ratioClass[ratio],
                roundedClass,
                props.class,
            )
        "
    >
        <!-- Skeleton -->
        <div
            v-if="skeleton && !loaded && !errored"
            class="absolute inset-0 animate-pulse bg-(--color-bg-subtle)"
        />

        <!-- Image -->
        <img
            v-show="loaded || !skeleton"
            :src="src"
            :alt="alt"
            loading="lazy"
            :class="
                cn(
                    'w-full h-full transition-opacity duration-300',
                    fitClass[fit ?? 'cover'],
                    loaded ? 'opacity-100' : 'opacity-0',
                )
            "
            @load="onLoad"
            @error="onError"
        />

        <!-- État erreur (pas de fallback) -->
        <div
            v-if="errored"
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 text-(--color-text-disabled)"
        >
            <ImageOff class="size-8" />
            <span class="text-xs">Image introuvable</span>
        </div>
    </div>
</template>

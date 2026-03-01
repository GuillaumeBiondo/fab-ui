<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = withDefaults(
    defineProps<{
        /** Nombre de slides visibles dans le parent (doit correspondre au :perView du Carousel) */
        perView?: number;
        class?:   string;
    }>(),
    { perView: 1 },
);
</script>

<template>
    <div
        data-slot="carousel-slide"
        :class="
            cn(
                'shrink-0 snap-start',
                props.class,
            )
        "
        :style="{ width: `calc(${100 / perView}% - var(--gap-offset, 0px))` }"
    >
        <slot />
    </div>
</template>

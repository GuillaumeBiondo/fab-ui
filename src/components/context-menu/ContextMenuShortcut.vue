<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{ class?: string }>();
</script>

<template>
    <span :class="cn('ml-auto text-xs tracking-widest text-(--color-text-disabled)', props.class)">
        <slot />
    </span>
</template>

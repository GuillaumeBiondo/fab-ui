<script setup lang="ts">
import { cn } from '@/lib/utils';

const props = defineProps<{
    class?: string;
}>();
</script>

<template>
    <div
        data-slot="skeleton"
        :class="cn('animate-pulse rounded-(--radius-md) bg-(--color-border)', props.class)"
    />
</template>

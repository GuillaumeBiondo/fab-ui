<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuSeparatorProps } from 'reka-ui';
import { ContextMenuSeparator } from 'reka-ui';
import { useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

const props     = defineProps<ContextMenuSeparatorProps & { class?: string }>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardProps(delegated);
</script>

<template>
    <ContextMenuSeparator
        data-slot="context-menu-separator"
        v-bind="forwarded"
        :class="cn('-mx-1 my-1 h-px bg-(--color-border)', props.class)"
    />
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuLabelProps } from 'reka-ui';
import { ContextMenuLabel } from 'reka-ui';
import { useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

const props     = defineProps<ContextMenuLabelProps & { inset?: boolean; class?: string }>();
const delegated = reactiveOmit(props, 'inset', 'class');
const forwarded = useForwardProps(delegated);
</script>

<template>
    <ContextMenuLabel
        data-slot="context-menu-label"
        :data-inset="inset ? '' : undefined"
        v-bind="forwarded"
        :class="cn('px-2 py-1.5 text-xs font-semibold text-(--color-text-muted) data-[inset]:pl-8', props.class)"
    >
        <slot />
    </ContextMenuLabel>
</template>

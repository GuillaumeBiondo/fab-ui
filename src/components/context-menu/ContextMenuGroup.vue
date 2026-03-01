<script setup lang="ts">
import type { ContextMenuGroupProps } from 'reka-ui';
import { ContextMenuGroup } from 'reka-ui';
import { useForwardProps } from 'reka-ui';

const props     = defineProps<ContextMenuGroupProps>();
const forwarded = useForwardProps(props);
</script>

<template>
    <ContextMenuGroup v-bind="forwarded">
        <slot />
    </ContextMenuGroup>
</template>

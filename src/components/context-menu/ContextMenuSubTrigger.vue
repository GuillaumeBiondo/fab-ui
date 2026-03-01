<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuSubTriggerProps } from 'reka-ui';
import { ContextMenuSubTrigger } from 'reka-ui';
import { useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { ChevronRight } from 'lucide-vue-next';

const props     = defineProps<ContextMenuSubTriggerProps & { inset?: boolean; class?: string }>();
const delegated = reactiveOmit(props, 'inset', 'class');
const forwarded = useForwardProps(delegated);
</script>

<template>
    <ContextMenuSubTrigger
        data-slot="context-menu-sub-trigger"
        :data-inset="inset ? '' : undefined"
        v-bind="forwarded"
        :class="
            cn(
                'flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
                'focus:bg-(--color-bg-subtle) data-[state=open]:bg-(--color-bg-subtle)',
                'data-[inset]:pl-8',
                '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
                props.class,
            )
        "
    >
        <slot />
        <ChevronRight class="ml-auto size-4" />
    </ContextMenuSubTrigger>
</template>

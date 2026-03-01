<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuSubContentEmits, ContextMenuSubContentProps } from 'reka-ui';
import { ContextMenuSubContent } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

const props  = defineProps<ContextMenuSubContentProps & { class?: string }>();
const emits  = defineEmits<ContextMenuSubContentEmits>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<template>
    <ContextMenuSubContent
        data-slot="context-menu-sub-content"
        v-bind="forwarded"
        :class="
            cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-(--radius-md) p-1',
                'bg-(--color-bg-raised) text-(--color-text) border border-(--color-border)',
                'shadow-(--shadow-lg)',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
                props.class,
            )
        "
    >
        <slot />
    </ContextMenuSubContent>
</template>

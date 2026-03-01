<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuContentEmits, ContextMenuContentProps } from 'reka-ui';
import { ContextMenuContent, ContextMenuPortal } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

defineOptions({ inheritAttrs: false });

const props  = defineProps<ContextMenuContentProps & { class?: string }>();
const emits  = defineEmits<ContextMenuContentEmits>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<template>
    <ContextMenuPortal>
        <ContextMenuContent
            data-slot="context-menu-content"
            v-bind="{ ...$attrs, ...forwarded }"
            :class="
                cn(
                    'z-50 min-w-[8rem] overflow-hidden rounded-(--radius-md) p-1',
                    'bg-(--color-bg-raised) text-(--color-text) border border-(--color-border)',
                    'shadow-(--shadow-lg)',
                    'data-[state=open]:animate-in data-[state=closed]:animate-out',
                    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                    props.class,
                )
            "
        >
            <slot />
        </ContextMenuContent>
    </ContextMenuPortal>
</template>

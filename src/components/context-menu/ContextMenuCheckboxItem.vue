<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuCheckboxItemEmits, ContextMenuCheckboxItemProps } from 'reka-ui';
import { ContextMenuCheckboxItem, ContextMenuItemIndicator } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { Check } from 'lucide-vue-next';

const props  = defineProps<ContextMenuCheckboxItemProps & { class?: string }>();
const emits  = defineEmits<ContextMenuCheckboxItemEmits>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<template>
    <ContextMenuCheckboxItem
        data-slot="context-menu-checkbox-item"
        v-bind="forwarded"
        :class="
            cn(
                'relative flex cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                'transition-colors duration-75',
                'focus:bg-(--color-bg-subtle) focus:text-(--color-text)',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                props.class,
            )
        "
    >
        <span class="absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuItemIndicator>
                <Check class="size-3.5 text-(--color-action)" />
            </ContextMenuItemIndicator>
        </span>
        <slot />
    </ContextMenuCheckboxItem>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuRadioItemEmits, ContextMenuRadioItemProps } from 'reka-ui';
import { ContextMenuItemIndicator, ContextMenuRadioItem } from 'reka-ui';
import { useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';
import { Circle } from 'lucide-vue-next';

const props  = defineProps<ContextMenuRadioItemProps & { class?: string }>();
const emits  = defineEmits<ContextMenuRadioItemEmits>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<template>
    <ContextMenuRadioItem
        data-slot="context-menu-radio-item"
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
                <Circle class="size-2 fill-(--color-action) text-(--color-action)" />
            </ContextMenuItemIndicator>
        </span>
        <slot />
    </ContextMenuRadioItem>
</template>

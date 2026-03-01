<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { ContextMenuItemProps } from 'reka-ui';
import { ContextMenuItem } from 'reka-ui';
import { useForwardProps } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

const props = withDefaults(
    defineProps<ContextMenuItemProps & {
        inset?:   boolean;
        variant?: 'default' | 'danger';
        class?:   string;
    }>(),
    { variant: 'default' },
);

const delegated = reactiveOmit(props, 'inset', 'variant', 'class');
const forwarded = useForwardProps(delegated);
</script>

<template>
    <ContextMenuItem
        data-slot="context-menu-item"
        :data-inset="inset ? '' : undefined"
        :data-variant="variant"
        v-bind="forwarded"
        :class="
            cn(
                'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
                'transition-colors duration-75',
                'focus:bg-(--color-bg-subtle) focus:text-(--color-text)',
                'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                'data-[inset]:pl-8',
                'data-[variant=danger]:text-(--color-danger) data-[variant=danger]:focus:bg-(--color-danger)/10',
                '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4',
                props.class,
            )
        "
    >
        <slot />
    </ContextMenuItem>
</template>

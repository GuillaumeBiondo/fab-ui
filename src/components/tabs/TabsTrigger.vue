<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui'
import { TabsTrigger, useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_CONTEXT_KEY } from './context'

interface Props extends TabsTriggerProps {
    class?: string
}

const props     = defineProps<Props>()
const delegated = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegated)

const ctx = inject(TABS_CONTEXT_KEY, { placement: 'top', variant: 'primary', size: 'default' } as any)

const sizeClasses = {
    small:   'px-3 py-1.5 text-xs gap-1.5',
    default: 'px-4 py-2   text-sm  gap-2',
    large:   'px-5 py-2.5 text-sm  gap-2',
}
</script>

<template>
    <TabsTrigger
        v-bind="forwarded"
        data-slot="tabs-trigger"
        :class="
            cn(
                'inline-flex items-center justify-center shrink-0 select-none',
                'font-medium cursor-pointer outline-none',
                'transition-colors duration-(--transition-fast)',
                'text-(--color-text-subtle)',
                'hover:text-(--color-text) hover:bg-(--color-bg-subtle)',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--tabs-color)/30 focus-visible:ring-inset',
                'disabled:pointer-events-none disabled:opacity-50',
                'data-[state=active]:text-(--tabs-color)',
                (ctx.placement === 'left' || ctx.placement === 'right') && 'w-full justify-start',
                sizeClasses[ctx.size],
                props.class,
            )
        "
    >
        <slot />
    </TabsTrigger>
</template>

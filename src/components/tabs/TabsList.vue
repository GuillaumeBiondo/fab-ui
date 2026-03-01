<script setup lang="ts">
import type { TabsListProps } from 'reka-ui'
import { TabsIndicator, TabsList, useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { inject } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_CONTEXT_KEY } from './context'

interface Props extends TabsListProps {
    class?: string
}

const props     = defineProps<Props>()
const delegated = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegated)

const ctx = inject(TABS_CONTEXT_KEY, { placement: 'top', variant: 'primary', size: 'default' } as any)
</script>

<template>
    <TabsList
        v-bind="forwarded"
        data-slot="tabs-list"
        :class="
            cn(
                'relative flex shrink-0',
                ctx.placement === 'top'   && 'flex-row border-b border-(--color-border)',
                ctx.placement === 'left'  && 'flex-col border-r border-(--color-border)',
                ctx.placement === 'right' && 'flex-col border-l border-(--color-border)',
                props.class,
            )
        "
    >
        <!-- Indicateur animé positionné automatiquement par reka-ui -->
        <TabsIndicator
            data-slot="tabs-indicator"
            :class="
                cn(
                    'absolute transition-[left,top,width,height] duration-(--transition-fast)',
                    'bg-(--tabs-color) rounded-full',
                    ctx.placement === 'top'   && 'bottom-0 h-[2px]',
                    ctx.placement === 'left'  && 'right-0  w-[2px]',
                    ctx.placement === 'right' && 'left-0   w-[2px]',
                )
            "
        />
        <slot />
    </TabsList>
</template>

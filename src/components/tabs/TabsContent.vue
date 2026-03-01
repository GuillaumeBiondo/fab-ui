<script setup lang="ts">
import type { TabsContentProps } from 'reka-ui'
import { TabsContent, useForwardProps } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

interface Props extends TabsContentProps {
    class?: string
}

const props     = defineProps<Props>()
const delegated = reactiveOmit(props, 'class')
const forwarded = useForwardProps(delegated)
</script>

<template>
    <TabsContent
        v-bind="forwarded"
        data-slot="tabs-content"
        :class="
            cn(
                'flex-1 outline-none',
                'focus-visible:ring-2 focus-visible:ring-(--tabs-color)/30 focus-visible:rounded-(--radius-sm)',
                props.class,
            )
        "
    >
        <slot />
    </TabsContent>
</template>

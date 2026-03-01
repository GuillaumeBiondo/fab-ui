<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'reka-ui'
import { TabsRoot, useForwardPropsEmits } from 'reka-ui'
import { reactiveOmit } from '@vueuse/core'
import { computed, provide } from 'vue'
import type { Severity } from '@/types/ui-kit'
import { cn } from '@/lib/utils'
import type { TabsPlacement, TabsSize } from './context'
import { TABS_CONTEXT_KEY } from './context'

interface Props extends Omit<TabsRootProps, 'orientation'> {
    placement?: TabsPlacement
    variant?:   Severity
    size?:      TabsSize
    class?:     string
}

const props     = withDefaults(defineProps<Props>(), { placement: 'top', variant: 'primary', size: 'default' })
const emits     = defineEmits<TabsRootEmits>()
const delegated = reactiveOmit(props, 'placement', 'variant', 'size', 'class')
const forwarded = useForwardPropsEmits(delegated, emits)

const variantColor: Record<Severity, string> = {
    primary:   'var(--color-action)',
    secondary: 'var(--color-border-strong)',
    success:   'var(--color-success)',
    danger:    'var(--color-danger)',
    info:      'var(--color-info)',
    warning:   'var(--color-warning)',
    help:      'var(--color-help)',
    contrast:  'var(--color-contrast)',
}

const colorStyle = computed(() => ({
    '--tabs-color': variantColor[props.variant ?? 'primary'],
}))

// Orientation for accessibility/keyboard navigation
const orientation = computed(() =>
    props.placement === 'top' ? 'horizontal' : 'vertical'
)

provide(TABS_CONTEXT_KEY, {
    get placement() { return props.placement ?? 'top' },
    get variant()   { return props.variant   ?? 'primary' },
    get size()      { return props.size      ?? 'default' },
})
</script>

<template>
    <TabsRoot
        v-bind="forwarded"
        :orientation="orientation"
        :style="colorStyle"
        data-slot="tabs"
        :data-placement="placement"
        :class="
            cn(
                'flex',
                placement === 'top'   && 'flex-col',
                placement === 'left'  && 'flex-row',
                placement === 'right' && 'flex-row-reverse',
                props.class,
            )
        "
    >
        <slot />
    </TabsRoot>
</template>

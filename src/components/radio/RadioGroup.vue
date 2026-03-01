<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui';
import { RadioGroupRoot, useForwardPropsEmits } from 'reka-ui';
import { reactiveOmit } from '@vueuse/core';

interface Props extends RadioGroupRootProps {
    class?: string;
}

const props     = defineProps<Props>();
const emits     = defineEmits<RadioGroupRootEmits>();
const delegated = reactiveOmit(props, 'class');
const forwarded = useForwardPropsEmits(delegated, emits);
</script>

<template>
    <RadioGroupRoot
        v-bind="forwarded"
        data-slot="radio-group"
        :class="
            cn(
                'flex gap-2',
                props.orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
                props.class,
            )
        "
    >
        <slot />
    </RadioGroupRoot>
</template>

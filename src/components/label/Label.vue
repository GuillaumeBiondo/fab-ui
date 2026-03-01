<script setup lang="ts">
import { cn } from '@/lib/utils';
import { reactiveOmit } from '@vueuse/core';
import { Label } from 'reka-ui';
import type { LabelProps } from 'reka-ui';

const props = defineProps<LabelProps & { class?: string }>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <Label
        data-slot="label"
        v-bind="delegatedProps"
        :class="
            cn(
                'flex items-center gap-1.5 font-sans text-sm font-medium leading-none text-(--color-text)',
                'select-none',
                'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                props.class,
            )
        "
    >
        <slot />
    </Label>
</template>

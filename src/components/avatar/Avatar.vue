<script setup lang="ts">
import { cn } from '@/lib/utils';
import { AvatarRoot } from 'reka-ui';

const sizeClasses: Record<string, string> = {
    tiny:    'size-5  text-[9px]',
    small:   'size-7  text-xs',
    default: 'size-9  text-sm',
    large:   'size-12 text-base',
    extra:   'size-16 text-lg',
};

const props = withDefaults(
    defineProps<{
        size?:  'tiny' | 'small' | 'default' | 'large' | 'extra';
        class?: string;
    }>(),
    { size: 'default' },
);
</script>

<template>
    <AvatarRoot
        data-slot="avatar"
        :class="cn('relative flex shrink-0 overflow-hidden rounded-full', sizeClasses[size], props.class)"
    >
        <slot />
    </AvatarRoot>
</template>

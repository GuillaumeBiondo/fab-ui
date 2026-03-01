<script setup lang="ts">
import { cn } from '@/lib/utils';
import type { CollapsibleContentProps } from 'reka-ui';
import { CollapsibleContent } from 'reka-ui';

interface Props extends CollapsibleContentProps {
    /**
     * Mode overlay — le contenu flotte par-dessus les éléments suivants
     * sans altérer le flux. Nécessite `position: relative` sur le parent.
     */
    overlay?: boolean;
    class?: string;
}

const props = withDefaults(defineProps<Props>(), { overlay: false });
</script>

<template>
    <CollapsibleContent
        data-slot="collapsible-content"
        v-bind="props"
        :class="
            cn(
                overlay && [
                    'absolute z-20 inset-x-0 mt-1',
                    'bg-(--color-bg-raised) border border-(--color-border)',
                    'rounded-(--radius-lg) shadow-(--shadow-lg)',
                ],
                props.class,
            )
        "
    >
        <slot />
    </CollapsibleContent>
</template>

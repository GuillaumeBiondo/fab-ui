<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-slot="slotProps"
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn(
        'peer size-4 shrink-0 rounded-[4px] outline-none',
        'border-2 border-(--color-border-strong)',
        'shadow-xs transition-shadow duration-100',
        'data-[state=checked]:bg-(--color-action) data-[state=checked]:border-(--color-action) data-[state=checked]:text-white',
        'focus-visible:ring-2 focus-visible:ring-(--color-action)/30 focus-visible:border-(--color-action)',
        'aria-invalid:border-(--color-danger) aria-invalid:ring-2 aria-invalid:ring-(--color-danger)/20',
        'disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="grid place-content-center text-current transition-none"
    >
      <slot v-bind="slotProps">
        <Check class="size-3.5" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

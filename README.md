# fab-ui

[![npm version](https://img.shields.io/npm/v/@buillaume.biondo/fab-ui)](https://www.npmjs.com/package/@buillaume.biondo/fab-ui)
[![license](https://img.shields.io/npm/l/@buillaume.biondo/fab-ui)](./LICENSE)

A Vue 3 component library built on top of [reka-ui](https://reka-ui.com/) headless primitives, styled with [Tailwind CSS v4](https://tailwindcss.com/) and [class-variance-authority](https://cva.style/). It provides a complete, accessible, and themeable design system — including layout components, form controls, overlays, data display, and navigation — ready to drop into any Vue 3 + Tailwind v4 application.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Design System](#design-system)
- [Components](#components)
  - [Button](#button)
  - [Badge](#badge)
  - [OverlayBadge](#overlaybadge)
  - [Alert](#alert)
  - [Avatar](#avatar)
  - [Card](#card)
  - [Checkbox](#checkbox)
  - [Radio / RadioGroup](#radio--radiogroup)
  - [Label](#label)
  - [Input](#input)
  - [InputPassword](#inputpassword)
  - [InputNumber](#inputnumber)
  - [InputArea](#inputarea)
  - [InputOTP](#inputotp)
  - [Select](#select)
  - [Slider](#slider)
  - [Toggle](#toggle)
  - [ToggleSwitch](#toggleswitch)
  - [ProgressBar](#progressbar)
  - [Skeleton](#skeleton)
  - [Separator](#separator)
  - [Spinner](#spinner)
  - [Code](#code)
  - [Image](#image)
  - [Carousel](#carousel)
  - [DataTable](#datatable)
  - [Toast / Toaster](#toast--toaster)
  - [SpeedDial](#speeddial)
  - [SplitButton](#splitbutton)
  - [Tooltip](#tooltip)
  - [Collapsible](#collapsible)
  - [DropdownMenu](#dropdownmenu)
  - [ContextMenu](#contextmenu)
  - [Dialog](#dialog)
  - [Sheet](#sheet)
  - [Breadcrumb](#breadcrumb)
  - [NavigationMenu](#navigationmenu)
  - [Sidebar](#sidebar)
  - [Tabs](#tabs)
- [Composables](#composables)
  - [useToast](#usetoast)
  - [useAppearance](#useappearance)
- [Roadmap](#roadmap)
- [License](#license)

---

## Prerequisites

| Dependency | Version |
|---|---|
| `vue` | `^3.5` |
| `tailwindcss` | `^4.0` |
| `reka-ui` | `^2.0` |
| `lucide-vue-next` | `>=0.400` |
| `class-variance-authority` | `^0.7` |
| `@vueuse/core` | `^12.0` |
| `vue-input-otp` | `^0.3` (optional, for `InputOTP`) |

---

## Installation

```bash
npm install @buillaume.biondo/fab-ui
```

Install the required peer dependencies if not already present:

```bash
npm install vue reka-ui lucide-vue-next class-variance-authority @vueuse/core tailwindcss
```

For the `InputOTP` component (optional):

```bash
npm install vue-input-otp
```

---

## Configuration

### CSS

In your main CSS file (e.g. `src/assets/app.css`), import Tailwind and the library styles:

```css
@import 'tailwindcss';
@import '@buillaume.biondo/fab-ui/style';


@source '../../node_modules/@buillaume.biondo/fab-ui/dist/';
```

### Fonts

Three fonts are loaded automatically via Google Fonts when you import the library stylesheet:

- **Plus Jakarta Sans** — headings and display text (SIL OFL 1.1)
- **DM Sans** — body text and UI (SIL OFL 1.1)
- **JetBrains Mono** — code blocks and monospaced metrics (SIL OFL 1.1)

### Toaster

Mount the `Toaster` component once in your root layout to enable toast notifications throughout the application:

```vue
<script setup>
import { Toaster } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Toaster />
</template>
```

---

## Design System

### Severity (color variants)

All components that accept a `variant` prop use the following semantic severity scale:

| Value | Meaning |
|---|---|
| `primary` | Brand action color |
| `secondary` | Neutral / subdued |
| `success` | Positive feedback |
| `danger` | Destructive / error |
| `info` | Informational |
| `warning` | Caution |
| `help` | Guidance / purple |
| `contrast` | High contrast / dark |

### Size scale

Most components accept a `size` prop with the following values (smallest to largest):

`tiny` | `small` | `default` | `large` | `extra`

### CSS custom properties

The library uses semantic CSS variables. You can override any of them in your CSS to customize the theme:

```css
:root {
  --color-action: #2563eb;
  --color-brand: #1d4ed8;
  --color-bg: #ffffff;
  --color-bg-subtle: #f8fafc;
  --color-bg-raised: #ffffff;
  --color-text: #0f172a;
  --color-text-muted: #64748b;
  --color-text-disabled: #94a3b8;
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-success: #16a34a;
  --color-danger: #dc2626;
  --color-warning: #d97706;
  --color-info: #2563eb;
  --color-help: #7c3aed;
  --color-contrast: #1f2937;
}
```

### Dark mode

Add the `.dark` class to your `<html>` element to activate dark mode:

```html
<html class="dark">
```

### Square radius mode

Add `data-radius="square"` to your `<html>` element to remove all border radii:

```html
<html data-radius="square">
```

---

## Components

### Button

A versatile button component with 8 severity variants, 4 shapes, 5 sizes, and optional loading, icon, and badge states. Renders as a `<button>` by default but can be changed via the `as` prop (e.g. `as="a"` for links).

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Color variant |
| `shape` | `'plain' \| 'outline' \| 'ghost' \| 'link'` | `'plain'` | Visual style |
| `size` | `Size` | `'default'` | Button size |
| `fluid` | `boolean` | `false` | Full-width |
| `rounded` | `boolean` | `false` | Fully rounded (pill) |
| `icon` | `boolean` | `false` | Icon-only mode (square / circle) |
| `loading` | `boolean` | `false` | Shows a spinner, disables interaction |
| `disabled` | `boolean` | `false` | Disables the button |
| `badge` | `number \| null` | `null` | Numeric overlay badge (top-right) |
| `iconLeft` | `Component` | — | Icon component rendered before the label |
| `iconRight` | `Component` | — | Icon component rendered after the label |
| `as` | `string \| Component` | `'button'` | Rendered HTML element or component |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Button } from '@buillaume.biondo/fab-ui'
import { PlusIcon, TrashIcon } from 'lucide-vue-next'
</script>

<template>
  <!-- Basic -->
  <Button>Save</Button>

  <!-- Variants and shapes -->
  <Button variant="danger" shape="outline">Delete</Button>
  <Button variant="success" shape="ghost">Confirm</Button>

  <!-- With icons -->
  <Button :icon-left="PlusIcon">Add item</Button>
  <Button :icon-right="TrashIcon" variant="danger" shape="outline">Remove</Button>

  <!-- Icon-only -->
  <Button :icon="true" variant="secondary" shape="ghost">
    <PlusIcon />
  </Button>

  <!-- Loading state -->
  <Button :loading="isSaving">Saving…</Button>

  <!-- With badge -->
  <Button :badge="5">Notifications</Button>

  <!-- As a link -->
  <Button as="a" href="/dashboard" variant="primary" shape="link">Go to dashboard</Button>
</template>
```

---

### Badge

Inline label component for statuses, tags, and counts. Supports 8 severity variants × 3 shapes, with an optional leading dot.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Color variant |
| `shape` | `'filled' \| 'outline' \| 'ghost'` | `'filled'` | Visual style |
| `size` | `Size` | `'default'` | Badge size |
| `fluid` | `boolean` | `false` | Full-width with centered text |
| `dot` | `boolean` | `false` | Prepends a colored dot |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Badge } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Badge>Primary</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="danger" shape="outline">Error</Badge>
  <Badge variant="warning" shape="ghost" dot>Pending</Badge>
  <Badge variant="info" size="small">3 new</Badge>
</template>
```

---

### OverlayBadge

Wrapper that positions a badge (dot or numeric) as an absolute overlay on top of any element — ideal for notification counts on icons or avatars.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| null` | — | Numeric value. `0` or absent renders a dot; `null` hides the badge |
| `variant` | `Severity` | `'danger'` | Color variant |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Badge position |
| `class` | `string` | — | Additional CSS classes on the wrapper |

```vue
<script setup>
import { OverlayBadge, Button } from '@buillaume.biondo/fab-ui'
import { BellIcon } from 'lucide-vue-next'
</script>

<template>
  <!-- Numeric badge -->
  <OverlayBadge :value="12">
    <Button :icon="true" shape="ghost" variant="secondary">
      <BellIcon />
    </Button>
  </OverlayBadge>

  <!-- Dot badge -->
  <OverlayBadge :value="0" variant="success">
    <Button :icon="true" shape="ghost" variant="secondary">
      <BellIcon />
    </Button>
  </OverlayBadge>
</template>
```

---

### Alert

Dismissible alert banner with icon, title, body slot, and optional auto-close. Animated with a slide + fade transition.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'info'` | Color variant |
| `title` | `string` | — | Bold heading text |
| `dismissible` | `boolean` | `false` | Shows a close button |
| `icon` | `boolean` | `true` | Displays the default variant icon |
| `iconComponent` | `Component` | — | Replaces the default icon |
| `delay` | `number` | `0` | Auto-close delay in milliseconds (0 = never) |
| `class` | `string` | — | Additional CSS classes |

**Slots**

| Slot | Description |
|---|---|
| `default` | Alert body content |
| `#icon` | Custom icon replacing the default one |

**Emits**

| Event | Description |
|---|---|
| `close` | Fired when the alert is dismissed or auto-closes |

```vue
<script setup>
import { Alert } from '@buillaume.biondo/fab-ui'
import { RocketIcon } from 'lucide-vue-next'
</script>

<template>
  <Alert title="Heads up!">
    Your trial expires in 3 days.
  </Alert>

  <Alert variant="success" :dismissible="true" title="Saved!">
    Your changes have been saved successfully.
  </Alert>

  <Alert variant="danger" :icon-component="RocketIcon">
    Deployment failed. Check the logs.
  </Alert>

  <!-- Auto-close after 5 seconds -->
  <Alert variant="info" :delay="5000" @close="onClose">
    This message will disappear automatically.
  </Alert>
</template>
```

---

### Avatar

Circular avatar container wrapping reka-ui's `AvatarRoot`. Use with `AvatarImage` and `AvatarFallback` from `reka-ui` for image with initials fallback.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'tiny' \| 'small' \| 'default' \| 'large' \| 'extra'` | `'default'` | Avatar size |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Avatar } from '@buillaume.biondo/fab-ui'
import { AvatarImage, AvatarFallback } from 'reka-ui'
</script>

<template>
  <Avatar size="large">
    <AvatarImage src="/avatars/john.jpg" alt="John Doe" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
</template>
```

---

### Card

A flexible card container with optional border color variants, shadow, hover effects, and named slots for header and footer.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| Severity` | `'default'` | Border color (9 options including `default`) |
| `padded` | `boolean` | `true` | Adds vertical padding and inner gap |
| `bordered` | `boolean` | `true` | Renders a border |
| `hoverable` | `boolean` | `false` | Elevates shadow on hover |
| `raised` | `boolean` | `false` | Uses a larger shadow by default |
| `class` | `string` | — | Additional CSS classes |

**Slots**

| Slot | Description |
|---|---|
| `#header` | Card header area |
| `default` | Card body |
| `#footer` | Card footer area |

**CardHeader props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `flush` | `boolean` | `false` | Removes padding; clips content (e.g. cover images) to card corners |

```vue
<script setup>
import { Card, CardHeader } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Card variant="primary" :hoverable="true">
    <template #header>
      <CardHeader>
        <h3 class="font-semibold text-lg">Card Title</h3>
        <p class="text-sm text-muted">Card subtitle</p>
      </CardHeader>
    </template>

    <p>Card body content goes here.</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button variant="secondary" shape="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    </template>
  </Card>
</template>
```

---

### Checkbox

Accessible checkbox built on reka-ui's `CheckboxRoot`. Fully styled with action color when checked and error state support.

**Props**

Accepts all props from reka-ui's `CheckboxRootProps` plus:

| Prop | Type | Description |
|---|---|---|
| `class` | `string` | Additional CSS classes |

```vue
<script setup>
import { Checkbox, Label } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" v-model:checked="checked" />
    <Label for="terms">I agree to the terms</Label>
  </div>
</template>
```

---

### Radio / RadioGroup

Accessible radio button group built on reka-ui's `RadioGroupRoot` / `RadioGroupItem` primitives. `RadioGroup` is the container that manages the selection state; `Radio` is the individual item with an optional inline label.

#### RadioGroup

**Props**

Accepts all props from reka-ui's `RadioGroupRootProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'vertical'` | Layout direction of the items |
| `modelValue` | `string` | — | Controlled selected value (`v-model`) |
| `defaultValue` | `string` | — | Initial selected value (uncontrolled) |
| `disabled` | `boolean` | `false` | Disables the entire group |
| `name` | `string` | — | Native `name` attribute forwarded to the hidden inputs |
| `class` | `string` | — | Additional CSS classes on the wrapper |

**Emits**

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string` | Fired when the selected value changes |

#### Radio

**Props**

Accepts all props from reka-ui's `RadioGroupItemProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | The value this item represents |
| `variant` | `Severity` | `'primary'` | Color of the checked indicator |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size of the circle and label text |
| `label` | `string` | — | Text rendered to the right of the button |
| `disabled` | `boolean` | `false` | Disables this individual item |
| `class` | `string` | — | Applied to the wrapper `<label>` |

```vue
<script setup>
import { RadioGroup, Radio } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const plan = ref('pro')
</script>

<template>
  <!-- Vertical (default) -->
  <RadioGroup v-model="plan">
    <Radio value="free"  label="Free" />
    <Radio value="pro"   label="Pro" />
    <Radio value="teams" label="Teams" />
  </RadioGroup>

  <!-- Horizontal -->
  <RadioGroup v-model="plan" orientation="horizontal">
    <Radio value="light" label="Light" />
    <Radio value="dark"  label="Dark" />
  </RadioGroup>

  <!-- Semantic colors -->
  <RadioGroup v-model="plan">
    <Radio value="ok"   variant="success" label="Approved" />
    <Radio value="warn" variant="warning" label="Pending" />
    <Radio value="err"  variant="danger"  label="Rejected" />
  </RadioGroup>

  <!-- Sizes -->
  <RadioGroup v-model="plan">
    <Radio value="s" size="small"   label="Small" />
    <Radio value="m" size="default" label="Default" />
    <Radio value="l" size="large"   label="Large" />
  </RadioGroup>

  <!-- Disabled states -->
  <RadioGroup v-model="plan">
    <Radio value="a" label="Available" />
    <Radio value="b" label="Unavailable" disabled />
  </RadioGroup>

  <!-- Disabled group -->
  <RadioGroup v-model="plan" disabled>
    <Radio value="x" label="Option X" />
    <Radio value="y" label="Option Y" />
  </RadioGroup>
</template>
```

---

### Label

Semantic `<label>` element styled with the design system's text and font styles. Automatically dims when associated with a disabled input.

**Props**

Accepts all props from reka-ui's `LabelProps` plus:

| Prop | Type | Description |
|---|---|---|
| `class` | `string` | Additional CSS classes |

```vue
<script setup>
import { Label, Input } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <Label for="email">Email address</Label>
    <Input id="email" type="email" placeholder="you@example.com" />
  </div>
</template>
```

---

### Input

Standard text input with focus ring, error state, disabled styling, and file input support.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string \| number` | — | Bound value (`v-model`) |
| `defaultValue` | `string \| number` | — | Uncontrolled default value |
| `type` | `string` | `'text'` | HTML input type |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disables the input |
| `required` | `boolean` | — | Marks the field as required |
| `error` | `string` | — | Triggers the error visual state |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Input } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <Input v-model="email" type="email" placeholder="you@example.com" />

  <!-- With error -->
  <Input v-model="email" error="Invalid email address" />
</template>
```

---

### InputPassword

Password input with a toggle button to show or hide the value. Shares the same props as `Input` (minus `type`).

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | — | Bound value (`v-model`) |
| `defaultValue` | `string` | — | Uncontrolled default value |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disables the input |
| `required` | `boolean` | — | Marks the field as required |
| `error` | `string` | — | Triggers the error visual state |
| `class` | `string` | — | Applied to the wrapper div |

```vue
<script setup>
import { InputPassword } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const password = ref('')
</script>

<template>
  <InputPassword v-model="password" placeholder="Enter your password" />
</template>
```

---

### InputNumber

Numeric input with optional `+` / `−` controls on each side. Enforces `min`, `max`, and `step` constraints.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `number` | — | Bound value (`v-model`) |
| `defaultValue` | `number` | — | Uncontrolled default value |
| `min` | `number` | — | Minimum allowed value |
| `max` | `number` | — | Maximum allowed value |
| `step` | `number` | `1` | Increment/decrement step |
| `controls` | `boolean` | `true` | Show the `+` / `−` buttons |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disables the input |
| `required` | `boolean` | — | Marks the field as required |
| `error` | `string` | — | Triggers the error visual state |
| `class` | `string` | — | Applied to the wrapper div |

```vue
<script setup>
import { InputNumber } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const quantity = ref(1)
</script>

<template>
  <InputNumber v-model="quantity" :min="1" :max="99" />

  <!-- Without stepper controls -->
  <InputNumber v-model="quantity" :controls="false" />
</template>
```

---

### InputArea

Multi-line textarea with configurable resize behavior and an optional character counter.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | — | Bound value (`v-model`) |
| `defaultValue` | `string` | — | Uncontrolled default value |
| `rows` | `number` | `3` | Number of visible rows |
| `cols` | `number` | — | Fixed column width (makes the wrapper `inline-flex`) |
| `maxlength` | `number` | — | Max characters; shows a live counter |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize handle behavior |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | — | Disables the textarea |
| `required` | `boolean` | — | Marks the field as required |
| `error` | `string` | — | Triggers the error visual state |
| `class` | `string` | — | Applied to the wrapper div |

```vue
<script setup>
import { InputArea } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const bio = ref('')
</script>

<template>
  <InputArea
    v-model="bio"
    placeholder="Tell us about yourself…"
    :rows="5"
    :maxlength="280"
    resize="none"
  />
</template>
```

---

### InputOTP

One-time password input built on [vue-input-otp](https://github.com/wobsoriano/vue-input-otp). Compose `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, and `InputOTPSeparator` to build any OTP layout.

> Requires the optional peer dependency `vue-input-otp`.

**Exported components**

`InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`

```vue
<script setup>
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const otp = ref('')
</script>

<template>
  <InputOTP v-model="otp" :max-length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

---

### Select

Native-feeling select dropdown built on reka-ui. Compose the subcomponents for full control over options, groups, and labels.

**Exported components**

`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectGroup`, `SelectLabel`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`, `SelectItemText`

**SelectTrigger props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'default'` | `'default'` | Trigger height |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const role = ref('')
</script>

<template>
  <Select v-model="role">
    <SelectTrigger class="w-48">
      <SelectValue placeholder="Select a role" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Roles</SelectLabel>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectSeparator />
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

---

### Slider

Range slider built on reka-ui's `SliderRoot`. Supports single value, ranges (multiple thumbs), and all 8 severity variants.

**Props**

Accepts all props from reka-ui's `SliderRootProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Track and thumb color |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Track and thumb dimensions |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Slider } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const value = ref([50])
const range = ref([20, 80])
</script>

<template>
  <!-- Single thumb -->
  <Slider v-model="value" :min="0" :max="100" :step="1" />

  <!-- Range (two thumbs) -->
  <Slider v-model="range" variant="success" size="large" />
</template>
```

---

### Toggle

Toggleable button built on reka-ui's `Toggle` primitive. Useful for toolbar buttons, filter chips, and binary options.

**Props**

Accepts all props from reka-ui's `ToggleProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Active color |
| `shape` | `'ghost' \| 'outline' \| 'plain'` | `'ghost'` | Visual style |
| `size` | `Size` | `'default'` | Button size |
| `onValue` | `string` | — | Label when pressed (overrides slot) |
| `offValue` | `string` | — | Label when not pressed (overrides slot) |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Toggle } from '@buillaume.biondo/fab-ui'
import { BoldIcon } from 'lucide-vue-next'
import { ref } from 'vue'

const bold = ref(false)
</script>

<template>
  <Toggle v-model:pressed="bold" shape="outline">
    <BoldIcon />
  </Toggle>

  <!-- With text labels -->
  <Toggle on-value="On" off-value="Off" v-model:pressed="bold" />
</template>
```

---

### ToggleSwitch

iOS-style toggle switch built on reka-ui's `SwitchRoot`. Supports an inline label.

**Props**

Accepts all props from reka-ui's `SwitchRootProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Track color when checked |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Switch dimensions |
| `label` | `string` | — | Label text rendered to the right |
| `class` | `string` | — | Applied to the wrapper `<label>` |

```vue
<script setup>
import { ToggleSwitch } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const notifications = ref(true)
</script>

<template>
  <ToggleSwitch v-model:checked="notifications" label="Email notifications" />

  <ToggleSwitch
    v-model:checked="notifications"
    variant="success"
    size="large"
    label="Enable feature"
  />
</template>
```

---

### ProgressBar

Horizontal progress bar with determinate and indeterminate modes.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Progress from 0 to 100. Omit for indeterminate animation |
| `variant` | `Severity` | `'primary'` | Fill color |
| `size` | `'tiny' \| 'small' \| 'default' \| 'large'` | `'default'` | Bar height |
| `label` | `boolean` | `false` | Shows percentage text to the right |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { ProgressBar } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <!-- Determinate -->
  <ProgressBar :value="72" variant="success" :label="true" />

  <!-- Indeterminate -->
  <ProgressBar variant="info" />

  <!-- Sizes -->
  <ProgressBar :value="40" size="tiny" />
  <ProgressBar :value="40" size="large" variant="warning" />
</template>
```

---

### Skeleton

A pulsing placeholder block used to represent loading content. Size and shape are controlled entirely via `class`.

**Props**

| Prop | Type | Description |
|---|---|---|
| `class` | `string` | CSS classes for size and shape (e.g. `h-4 w-32 rounded-full`) |

```vue
<script setup>
import { Skeleton } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <div class="flex items-center gap-3">
    <Skeleton class="size-10 rounded-full" />
    <div class="flex flex-col gap-2">
      <Skeleton class="h-4 w-48" />
      <Skeleton class="h-3 w-32" />
    </div>
  </div>
</template>
```

---

### Separator

A thin horizontal or vertical divider line built on reka-ui.

**Props**

Accepts all props from reka-ui's `SeparatorProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `decorative` | `boolean` | `true` | Marks the separator as decorative (aria hidden) |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Separator } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Separator />

  <!-- Vertical -->
  <div class="flex h-8 items-center gap-4">
    <span>Item A</span>
    <Separator orientation="vertical" />
    <span>Item B</span>
  </div>
</template>
```

---

### Spinner

A minimal animated loading indicator using a spinning `Loader2` icon.

**Props**

| Prop | Type | Description |
|---|---|---|
| `class` | `string` | CSS classes for size (default `size-4`) and color |

```vue
<script setup>
import { Spinner } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Spinner />
  <Spinner class="size-8 text-blue-600" />
</template>
```

---

### Code

Syntax-highlighted code block powered by [highlight.js](https://highlightjs.org/) with the Atom One Dark theme. Supports automatic language detection, line numbers, a copy-to-clipboard button, and a macOS-style window chrome.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | — | Code string to display (or use the default slot) |
| `language` | `string` | — | highlight.js language identifier (auto-detected if omitted) |
| `filename` | `string` | — | Filename shown in the header bar |
| `copyable` | `boolean` | `true` | Shows the copy-to-clipboard button |
| `lineNumbers` | `boolean` | `false` | Displays line numbers |
| `maxHeight` | `string` | — | CSS max-height for scrollable blocks (e.g. `'400px'`) |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Code } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Code
    language="javascript"
    filename="utils.js"
    :line-numbers="true"
    max-height="300px"
    :code="`function greet(name) {\n  return 'Hello, ' + name\n}`"
  />

  <!-- Via default slot -->
  <Code language="bash">
    npm install @buillaume.biondo/fab-ui
  </Code>
</template>
```

---

### Image

Smart image container with lazy loading, skeleton placeholder, aspect ratio enforcement, object-fit control, and a fallback for broken images.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL (required) |
| `alt` | `string` | `''` | Alt text |
| `ratio` | `'1/1' \| '4/3' \| '16/9' \| '3/2' \| '2/3' \| '9/16'` | — | Fixed aspect ratio |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | CSS `object-fit` value |
| `skeleton` | `boolean` | `true` | Shows a pulsing placeholder while loading |
| `fallback` | `string` | — | Fallback image URL shown on error |
| `rounded` | `boolean \| 'full'` | `false` | Border radius (`true` = card radius, `'full'` = circle) |
| `class` | `string` | — | Applied to the container div |

**Emits**

| Event | Description |
|---|---|
| `load` | Native `load` event from `<img>` |
| `error` | Native `error` event from `<img>` |

```vue
<script setup>
import { Image } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Image
    src="/photos/hero.jpg"
    alt="Hero image"
    ratio="16/9"
    fallback="/photos/placeholder.jpg"
    :rounded="true"
  />

  <!-- Avatar-style -->
  <Image
    src="/avatars/user.jpg"
    alt="User avatar"
    ratio="1/1"
    rounded="full"
    class="w-16"
  />
</template>
```

---

### Carousel

A touch-friendly slideshow with optional navigation arrows, dot indicators, autoplay, loop, and multi-slide view support.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `arrows` | `boolean` | `true` | Show previous/next arrow buttons |
| `dots` | `boolean` | `true` | Show dot indicator buttons |
| `autoplay` | `number` | `0` | Autoplay interval in ms (`0` = disabled) |
| `loop` | `boolean` | `false` | Wrap around from last to first slide |
| `perView` | `number` | `1` | Number of slides visible at once |
| `gap` | `string` | `'gap-4'` | Tailwind gap class between slides |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Carousel, CarouselSlide } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Carousel :autoplay="3000" :loop="true" :dots="true">
    <CarouselSlide>
      <Image src="/slides/1.jpg" ratio="16/9" />
    </CarouselSlide>
    <CarouselSlide>
      <Image src="/slides/2.jpg" ratio="16/9" />
    </CarouselSlide>
    <CarouselSlide>
      <Image src="/slides/3.jpg" ratio="16/9" />
    </CarouselSlide>
  </Carousel>

  <!-- Multi-slide -->
  <Carousel :per-view="3" gap="gap-6">
    <CarouselSlide v-for="item in items" :key="item.id">
      <Card>{{ item.title }}</Card>
    </CarouselSlide>
  </Carousel>
</template>
```

---

### DataTable

A feature-complete data table with client-side sorting, global search with debounce, pagination with ellipsis, row selection, custom cell rendering via named slots, and a loading skeleton.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `DataTableColumn[]` | — | Column definitions (required) |
| `data` | `T[]` | — | Row data (required) |
| `searchable` | `boolean` | — | Renders a search input above the table |
| `selectable` | `boolean` | — | Renders a checkbox column |
| `pageSize` | `number` | `15` | Initial rows per page |
| `pageSizes` | `number[]` | `[10, 25, 50, 100]` | Page size options in the selector |
| `loading` | `boolean` | — | Shows a skeleton instead of data |
| `emptyText` | `string` | `'Aucun résultat.'` | Text displayed when there are no rows |
| `striped` | `boolean` | — | Alternating row background |
| `hoverable` | `boolean` | `true` | Highlights rows on hover |
| `class` | `string` | — | Additional CSS classes |

**`DataTableColumn` definition**

```ts
interface DataTableColumn<Row> {
  key: string           // Row property key
  label: string         // Column header text
  sortable?: boolean    // Enables client-side sorting
  width?: string        // CSS column width
  align?: 'left' | 'center' | 'right'
  format?: (value: unknown, row: Row) => string  // Custom cell formatter
}
```

**Models**

| Model | Type | Description |
|---|---|---|
| `v-model:selected` | `T[]` | Two-way binding for selected rows. The checkbox column appears automatically when bound |

**Emits**

| Event | Payload | Description |
|---|---|---|
| `row-click` | `row: T` | Fired when a row is clicked |
| `cell-click` | `key: string, row: T` | Fired when a cell is clicked |

**Slots**

| Slot | Props | Description |
|---|---|---|
| `#column-{key}` | `{ row, value }` | Custom cell renderer for the given column key |
| `#empty` | — | Custom empty state content |

```vue
<script setup>
import { DataTable } from '@buillaume.biondo/fab-ui'
import { Badge } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const columns = [
  { key: 'name',   label: 'Name',   sortable: true },
  { key: 'email',  label: 'Email',  sortable: true },
  { key: 'role',   label: 'Role' },
  { key: 'status', label: 'Status' },
]

const users = ref([
  { name: 'Alice', email: 'alice@example.com', role: 'Admin',  status: 'active' },
  { name: 'Bob',   email: 'bob@example.com',   role: 'Editor', status: 'inactive' },
])

const selected = ref([])
</script>

<template>
  <DataTable
    :columns="columns"
    :data="users"
    v-model:selected="selected"
    :searchable="true"
    :striped="true"
    @row-click="(row) => console.log(row)"
  >
    <!-- Custom status cell -->
    <template #column-status="{ value }">
      <Badge :variant="value === 'active' ? 'success' : 'secondary'">
        {{ value }}
      </Badge>
    </template>
  </DataTable>
</template>
```

---

### Toast / Toaster

Toast notifications managed through the `useToast` composable. Mount `Toaster` once in your layout — it renders at the bottom-right of the viewport with animated transitions and a progress bar.

**Toast variants:** `info` | `success` | `warning` | `error`

**Default durations:**
- `info`, `success`: 4 seconds
- `warning`: 6 seconds
- `error`: persistent (no auto-dismiss)

See the [useToast](#usetoast) composable section for the full API.

```vue
<!-- Root layout -->
<script setup>
import { Toaster } from '@buillaume.biondo/fab-ui'
</script>

<template>
  <slot />
  <Toaster />
</template>
```

```vue
<!-- Anywhere in your app -->
<script setup>
import { useToast } from '@buillaume.biondo/fab-ui'

const toast = useToast()
</script>

<template>
  <Button @click="toast.success('Saved successfully!')">Save</Button>
  <Button @click="toast.error('Something went wrong.')">Fail</Button>
</template>
```

---

### SpeedDial

A floating action button (FAB) that expands into a list of action buttons in any direction. Actions appear with a staggered animation and display labels as tooltips on hover.

**`SpeedDialItem` interface**

```ts
interface SpeedDialItem {
  label:     string       // Tooltip and accessible label
  icon:      Component    // Lucide icon component
  onClick:   () => void   // Click handler
  disabled?: boolean
  variant?:  Severity     // Button color (default: 'secondary')
}
```

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `SpeedDialItem[]` | — | Action buttons (required) |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction the actions expand |
| `variant` | `Severity` | `'primary'` | Main FAB button color |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Button size |
| `icon` | `Component` | — | Custom icon for the main button (defaults to `+` / `×`) |
| `disabled` | `boolean` | — | Disables the FAB |
| `class` | `string` | — | Additional CSS classes on the wrapper |

```vue
<script setup>
import { SpeedDial } from '@buillaume.biondo/fab-ui'
import { PencilIcon, TrashIcon, ShareIcon } from 'lucide-vue-next'

const actions = [
  { label: 'Edit',   icon: PencilIcon, onClick: () => edit(),   variant: 'primary' },
  { label: 'Share',  icon: ShareIcon,  onClick: () => share(),  variant: 'info'    },
  { label: 'Delete', icon: TrashIcon,  onClick: () => remove(), variant: 'danger'  },
]
</script>

<template>
  <SpeedDial :items="actions" direction="up" />
</template>
```

---

### SplitButton

A composite button with a primary action and a dropdown arrow that reveals additional options.

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `Severity` | `'primary'` | Color variant |
| `shape` | `'plain' \| 'outline' \| 'ghost'` | `'plain'` | Visual style |
| `size` | `Size` | `'default'` | Button size |
| `fluid` | `boolean` | `false` | Full-width |
| `disabled` | `boolean` | `false` | Disables both parts |
| `loading` | `boolean` | `false` | Shows spinner on the main button |
| `iconLeft` | `Component` | — | Icon component on the main button |
| `class` | `string` | — | Additional CSS classes |

**Slots**

| Slot | Description |
|---|---|
| `default` | Label of the main button |
| `#dropdown` | `DropdownMenuItem` components for the dropdown |

**Emits**

| Event | Description |
|---|---|
| `click` | Fired when the main button is clicked |

```vue
<script setup>
import {
  SplitButton,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <SplitButton @click="save()">
    Save

    <template #dropdown>
      <DropdownMenuItem @click="saveAndPublish()">Save & publish</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="saveDraft()">Save as draft</DropdownMenuItem>
    </template>
  </SplitButton>
</template>
```

---

### Tooltip

Simple tooltip built on reka-ui. Wrap your trigger with `TooltipProvider`, use `Tooltip` + `TooltipTrigger` + `TooltipContent`.

**Exported components**

`TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`

```vue
<script setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Button,
} from '@buillaume.biondo/fab-ui'
import { SettingsIcon } from 'lucide-vue-next'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button :icon="true" shape="ghost" variant="secondary">
          <SettingsIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Settings</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

---

### Collapsible

Expandable / collapsible section built on reka-ui. `CollapsibleContent` supports an `overlay` mode that floats the content above the document flow.

**Exported components**

`Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`

**`CollapsibleContent` props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `overlay` | `boolean` | `false` | Positions content as an absolute overlay (`z-20`) |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  Button,
} from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <Collapsible v-model:open="open">
    <CollapsibleTrigger as-child>
      <Button shape="ghost">Toggle section</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p class="mt-2 text-sm">Hidden content revealed on toggle.</p>
    </CollapsibleContent>
  </Collapsible>
</template>
```

---

### DropdownMenu

Full-featured dropdown menu built on reka-ui with support for items, checkboxes, radio groups, sub-menus, separators, and keyboard shortcuts.

**Exported components**

`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuPortal`

```vue
<script setup>
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  Button,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button shape="outline" variant="secondary">Options</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-48">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Profile
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="text-danger">Log out</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

---

### ContextMenu

Right-click context menu with the same feature set as `DropdownMenu`. `ContextMenuItem` accepts a `variant="danger"` prop for destructive actions.

**Exported components**

`ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuSub`, `ContextMenuSubTrigger`, `ContextMenuSubContent`, `ContextMenuCheckboxItem`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`

**`ContextMenuItem` extra props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'danger'` | `'default'` | Renders the item in danger color |
| `inset` | `boolean` | — | Adds extra left padding for alignment without an icon |

```vue
<script setup>
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="p-8 border rounded">Right-click me</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Edit</ContextMenuItem>
      <ContextMenuItem>Duplicate</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem variant="danger">Delete</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

---

### Dialog

Modal dialog built on reka-ui with animated overlay, a close button, and a scrollable variant.

**Exported components**

`Dialog`, `DialogTrigger`, `DialogContent`, `DialogScrollContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogOverlay`

**`DialogContent` extra props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `showCloseButton` | `boolean` | `true` | Renders the `×` close button in the top-right corner |

```vue
<script setup>
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button>Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button shape="outline" variant="secondary">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

---

### Sheet

Slide-in panel (drawer) that opens from any side of the screen. Built on the same Dialog primitives as the `Dialog` component.

**Exported components**

`Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`, `SheetOverlay`

**`SheetContent` extra props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | The edge the sheet slides in from |

```vue
<script setup>
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Button,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button shape="outline">Open panel</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
        <SheetDescription>Adjust your preferences.</SheetDescription>
      </SheetHeader>
      <p class="py-4">Sheet content goes here.</p>
    </SheetContent>
  </Sheet>
</template>
```

---

### Breadcrumb

Semantic breadcrumb navigation with built-in separator, ellipsis, and current page support.

**Exported components**

`Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`

```vue
<script setup>
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbEllipsis />
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Getting started</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

---

### NavigationMenu

Horizontal navigation menu with animated content panels, built on reka-ui.

**Exported components**

`NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`

Also exports `navigationMenuTriggerStyle` — a CVA function that returns the trigger button classes.

```vue
<script setup>
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@buillaume.biondo/fab-ui'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Products</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[400px] gap-3 p-4">
            <li><NavigationMenuLink href="/products/alpha">Alpha</NavigationMenuLink></li>
            <li><NavigationMenuLink href="/products/beta">Beta</NavigationMenuLink></li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink :class="navigationMenuTriggerStyle()" href="/about">
          About
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

---

### Sidebar

A complete collapsible application sidebar system. It supports three visual variants (`sidebar`, `floating`, `inset`), two collapse modes (`offcanvas`, `icon`), and a full set of composition components for menus, groups, badges, and sub-menus.

**Exported components**

`SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarSeparator`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarInput`

Also exports the `useSidebar` composable.

**`SidebarProvider` / `Sidebar` key props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `'left' \| 'right'` | `'left'` | Sidebar position |
| `variant` | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'` | Visual style |
| `collapsible` | `'offcanvas' \| 'icon' \| 'none'` | `'offcanvas'` | Collapse behavior |

```vue
<script setup>
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@buillaume.biondo/fab-ui'
import { HomeIcon, SettingsIcon } from 'lucide-vue-next'
</script>

<template>
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <span class="font-semibold">My App</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="/"><HomeIcon /> Dashboard</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton as-child>
                  <a href="/settings"><SettingsIcon /> Settings</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

    <SidebarInset>
      <header class="flex items-center gap-2 p-4">
        <SidebarTrigger />
        <h1>Page title</h1>
      </header>
      <main class="p-4">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
```

---

### Tabs

Accessible tabbed interface built on reka-ui's `TabsRoot` / `TabsList` / `TabsTrigger` / `TabsContent` primitives. The `placement` prop controls whether tabs appear on top, left, or right of the content panel; an animated indicator bar slides to the active tab automatically.

The component tree is: `Tabs` → `TabsList` → `TabsTrigger` (×n) + `TabsContent` (×n).

#### Tabs

Root container. Manages selection state, sets the CSS color variable `--tabs-color`, and provides `placement`, `variant`, and `size` to child components via `provide/inject`.

**Props**

Accepts all props from reka-ui's `TabsRootProps` (except `orientation`, derived automatically) plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `modelValue` | `string` | — | Controlled active tab value (`v-model`) |
| `defaultValue` | `string` | — | Initial active tab (uncontrolled) |
| `placement` | `'top' \| 'left' \| 'right'` | `'top'` | Position of the tab list relative to the panels |
| `variant` | `Severity` | `'primary'` | Color of the active indicator and trigger text |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Size of the trigger buttons |
| `activationMode` | `'automatic' \| 'manual'` | `'automatic'` | Whether tabs activate on focus or on click |
| `class` | `string` | — | Additional CSS classes on the root element |

**Emits**

| Event | Payload | Description |
|---|---|---|
| `update:modelValue` | `string` | Fired when the active tab changes |

#### TabsList

Wrapper for the row or column of `TabsTrigger` buttons. Includes a built-in `TabsIndicator` that slides to the active trigger with a CSS transition.

**Props**

Accepts all props from reka-ui's `TabsListProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `loop` | `boolean` | `false` | Keyboard navigation wraps from last to first trigger |
| `class` | `string` | — | Additional CSS classes |

#### TabsTrigger

Individual tab button. Reads `size` and `placement` from the parent `Tabs` context.

**Props**

Accepts all props from reka-ui's `TabsTriggerProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Unique identifier matching a `TabsContent` value |
| `disabled` | `boolean` | `false` | Prevents selection and dims the trigger |
| `class` | `string` | — | Additional CSS classes |

#### TabsContent

Panel revealed when the associated trigger is active. Takes `flex-1` to fill the available space alongside a vertical tab list.

**Props**

Accepts all props from reka-ui's `TabsContentProps` plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | **required** | Must match the corresponding `TabsTrigger` value |
| `forceMount` | `boolean` | `false` | Keeps the panel mounted even when inactive (useful for animation libraries) |
| `class` | `string` | — | Additional CSS classes |

```vue
<script setup>
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@buillaume.biondo/fab-ui'
import { ref } from 'vue'

const active = ref('account')
</script>

<template>
  <!-- Top (default) -->
  <Tabs v-model="active" placement="top">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
      <TabsTrigger value="billing">Billing</TabsTrigger>
      <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
    </TabsList>
    <TabsContent value="account"  class="p-4">Account settings…</TabsContent>
    <TabsContent value="security" class="p-4">Security settings…</TabsContent>
    <TabsContent value="billing"  class="p-4">Billing settings…</TabsContent>
  </Tabs>

  <!-- Left placement -->
  <Tabs v-model="active" placement="left" variant="success">
    <TabsList>
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="team">Team</TabsTrigger>
    </TabsList>
    <TabsContent value="profile" class="p-6">Profile panel…</TabsContent>
    <TabsContent value="team"    class="p-6">Team panel…</TabsContent>
  </Tabs>

  <!-- Right placement, large size, danger color -->
  <Tabs v-model="active" placement="right" variant="danger" size="large">
    <TabsList>
      <TabsTrigger value="logs">Logs</TabsTrigger>
      <TabsTrigger value="alerts">Alerts</TabsTrigger>
    </TabsList>
    <TabsContent value="logs"   class="p-6">Logs panel…</TabsContent>
    <TabsContent value="alerts" class="p-6">Alerts panel…</TabsContent>
  </Tabs>

  <!-- Uncontrolled with defaultValue -->
  <Tabs default-value="tab1">
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1" class="p-4">Content 1</TabsContent>
    <TabsContent value="tab2" class="p-4">Content 2</TabsContent>
  </Tabs>
</template>
```

---

## Composables

### useToast

Global toast notification state. The state is shared at the module level — calling `useToast()` anywhere returns the same reactive instance.

```ts
import { useToast } from '@buillaume.biondo/fab-ui'

const toast = useToast()
```

**Returned methods**

| Method | Signature | Description |
|---|---|---|
| `success` | `(message: string, options?: ToastOptions) => string` | Shows a success toast (auto-dismisses after 4s) |
| `info` | `(message: string, options?: ToastOptions) => string` | Shows an info toast (auto-dismisses after 4s) |
| `warning` | `(message: string, options?: ToastOptions) => string` | Shows a warning toast (auto-dismisses after 6s) |
| `error` | `(message: string, options?: ToastOptions) => string` | Shows a persistent error toast |
| `dismiss` | `(id: string) => void` | Programmatically removes a toast by its ID |
| `toasts` | `Toast[]` (reactive) | The current list of active toasts |

**`ToastOptions`**

```ts
interface ToastOptions {
  duration?:   number   // Override auto-dismiss duration in ms
  persistent?: boolean  // Prevent auto-dismiss
}
```

```ts
const toast = useToast()

// Basic usage
toast.success('Your profile has been updated.')
toast.error('Failed to connect to the server.')

// Custom duration
toast.warning('Session expiring soon.', { duration: 10_000 })

// Persistent toast with manual dismiss
const id = toast.info('Processing your request…', { persistent: true })
await doSomething()
toast.dismiss(id)
```

---

### useAppearance

Manages the application's visual theme (light / dark / system) and border radius mode (default / square). Persists preferences to `localStorage` and a cookie for SSR compatibility.

```ts
import { useAppearance } from '@buillaume.biondo/fab-ui'

const {
  appearance,
  resolvedAppearance,
  updateAppearance,
  radiusMode,
  updateRadiusMode,
} = useAppearance()
```

**Returned values**

| Property | Type | Description |
|---|---|---|
| `appearance` | `Ref<'light' \| 'dark' \| 'system'>` | Current preference |
| `resolvedAppearance` | `ComputedRef<'light' \| 'dark'>` | Resolved value (resolves `'system'` against `prefers-color-scheme`) |
| `updateAppearance` | `(value: Appearance) => void` | Updates and persists the theme |
| `radiusMode` | `Ref<'default' \| 'square'>` | Current border radius mode |
| `updateRadiusMode` | `(value: RadiusMode) => void` | Updates and persists the radius mode |

Also exports `initializeTheme()` — call it once in your app entry point (before mounting) to apply the persisted theme immediately and avoid a flash of unstyled content.

```ts
// main.ts
import { createApp }      from 'vue'
import { initializeTheme } from '@buillaume.biondo/fab-ui'
import App                 from './App.vue'

initializeTheme()
createApp(App).mount('#app')
```

```vue
<script setup>
import { useAppearance } from '@buillaume.biondo/fab-ui'

const { appearance, updateAppearance, radiusMode, updateRadiusMode } = useAppearance()
</script>

<template>
  <select :value="appearance" @change="updateAppearance($event.target.value)">
    <option value="light">Light</option>
    <option value="dark">Dark</option>
    <option value="system">System</option>
  </select>

  <label>
    <input
      type="checkbox"
      :checked="radiusMode === 'square'"
      @change="updateRadiusMode(radiusMode === 'square' ? 'default' : 'square')"
    />
    Square corners
  </label>
</template>
```

---

## Roadmap

The following components are planned for upcoming releases:

- **Radio** — Styled radio buttons with severity/variant support and a radio group wrapper
- **Divider** — Horizontal/vertical separator with an optional centered label
- **Tabs** — Tab navigation with `Tab`, `TabList`, and `TabPanel` subcomponents and multiple visual variants

Contributions are welcome. Feel free to open an issue to discuss a feature or submit a pull request.

---

## License

[MIT](./LICENSE) — Guillaume Biondo

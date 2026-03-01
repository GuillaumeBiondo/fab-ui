# Laser Bleu UI — Composants

> Bibliothèque de composants Vue 3 construite sur **Reka UI**, **Tailwind CSS v4** et **class-variance-authority**. Chaque composant respecte un système de design cohérent basé sur des CSS custom properties (`--color-*`, `--radius-*`, `--shadow-*`).

---

## Sommaire

1. [Types globaux](#1-types-globaux)
2. [Inputs](#2-inputs)
   - [Input](#input)
   - [InputPassword](#inputpassword)
   - [InputNumber](#inputnumber)
   - [InputArea](#inputarea)
   - [Checkbox](#checkbox)
3. [Boutons & Actions](#3-boutons--actions)
   - [Button](#button)
   - [SplitButton](#splitbutton)
   - [Toggle](#toggle)
   - [ToggleSwitch](#toggleswitch)
4. [Badge & Avatar](#4-badge--avatar)
   - [Badge](#badge)
   - [OverlayBadge](#overlaybadge)
   - [Avatar](#avatar)
5. [Feedback](#5-feedback)
   - [Alert](#alert)
   - [Toast — useToast()](#toast--usetoast)
   - [ProgressBar](#progressbar)
6. [Contenu](#6-contenu)
   - [Card + CardHeader](#card--cardheader)
   - [Code](#code)
   - [Image](#image)
   - [Carousel + CarouselSlide](#carousel--carouselslide)
7. [Formulaires étendus](#7-formulaires-étendus)
   - [Slider](#slider)
8. [Overlays & Navigation](#8-overlays--navigation)
   - [ContextMenu](#contextmenu)
   - [CollapsibleContent](#collapsiblecontent)
   - [SpeedDial](#speeddial)
9. [Données](#9-données)
   - [DataTable](#datatable)

---

## 1. Types globaux

Ces types TypeScript sont définis dans `/resources/js/types/ui-kit.ts` et utilisés par la quasi-totalité des composants.

### Severity

Couleur sémantique commune à Button, Badge, Alert, Card, ProgressBar, Toggle, Slider…

```ts
type Severity =
  | 'primary'    // couleur d'action principale du design system
  | 'secondary'  // ton neutre / gris
  | 'success'    // vert
  | 'danger'     // rouge
  | 'info'       // bleu
  | 'warning'    // orange
  | 'help'       // violet
  | 'contrast'   // contraste fort (noir/blanc selon le thème)
```

### Size

Taille standardisée commune à Button, Badge, Avatar, Input…

```ts
type Size = 'tiny' | 'small' | 'default' | 'large' | 'extra'
```

### ButtonShape

Forme visuelle du composant Button (et SplitButton).

```ts
type ButtonShape = 'plain' | 'outline' | 'ghost' | 'link'
```

### BadgeShape

Forme visuelle du composant Badge.

```ts
type BadgeShape = 'filled' | 'outline' | 'ghost'
```

---

## 2. Inputs

### Input

Champ de texte de base. Supporte `v-model`, validation (`error`), désactivation et l'attribut HTML `type`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string \| number` | — | Valeur liée via `v-model` |
| `defaultValue` | `string \| number` | — | Valeur initiale non contrôlée |
| `type` | `string` | `'text'` | Type HTML de l'input (`text`, `email`, `search`, `file`…) |
| `placeholder` | `string` | — | Texte indicatif |
| `disabled` | `boolean` | `false` | Désactive le champ |
| `required` | `boolean` | `false` | Marque le champ comme requis |
| **`error`** | `string` | — | Si défini, applique le style d'erreur (`aria-invalid`) |
| `class` | `string` | — | Classes Tailwind additionnelles |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string \| number` | Émis à chaque frappe |

#### Exemples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input } from '@/components/ui/input'

const email = ref('')
</script>

<template>
  <Input v-model="email" type="email" placeholder="votre@email.com" />
</template>
```

```vue
<!-- Avec erreur de validation -->
<Input
  v-model="email"
  type="email"
  placeholder="votre@email.com"
  :error="errors.email"
/>
<p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
```

---

### InputPassword

Champ mot de passe avec bouton bascule pour afficher/masquer la valeur. Mêmes styles et comportements que `Input`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string` | — | Valeur liée via `v-model` |
| `defaultValue` | `string` | — | Valeur initiale non contrôlée |
| `placeholder` | `string` | — | Texte indicatif |
| `disabled` | `boolean` | `false` | Désactive le champ |
| `required` | `boolean` | `false` | Marque le champ comme requis |
| **`error`** | `string` | — | Active le style d'erreur |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string` | Émis à chaque frappe |

#### Exemple

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { InputPassword } from '@/components/ui/input'

const password = ref('')
</script>

<template>
  <InputPassword v-model="password" placeholder="Mot de passe" />
</template>
```

---

### InputNumber

Champ numérique avec boutons `−` et `+` intégrés. Gère `min`, `max` et `step`. Les boutons se désactivent automatiquement aux bornes.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `number` | — | Valeur liée via `v-model` |
| `defaultValue` | `number` | — | Valeur initiale non contrôlée |
| `placeholder` | `string` | — | Texte indicatif |
| `disabled` | `boolean` | `false` | Désactive le champ et les boutons |
| `required` | `boolean` | `false` | Marque le champ comme requis |
| **`error`** | `string` | — | Active le style d'erreur |
| **`min`** | `number` | — | Valeur minimale |
| **`max`** | `number` | — | Valeur maximale |
| **`step`** | `number` | `1` | Incrément des boutons +/− |
| **`controls`** | `boolean` | `true` | Affiche ou masque les boutons +/− |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number` | Émis à chaque changement |

#### Exemple

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { InputNumber } from '@/components/ui/input'

const quantity = ref(1)
</script>

<template>
  <!-- Quantité entre 1 et 99 -->
  <InputNumber v-model="quantity" :min="1" :max="99" />

  <!-- Sans boutons (champ seul) -->
  <InputNumber v-model="quantity" :controls="false" />
</template>
```

---

### InputArea

Zone de texte multiligne (`textarea`) avec compteur de caractères optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `modelValue` | `string` | — | Valeur liée via `v-model` |
| `defaultValue` | `string` | — | Valeur initiale non contrôlée |
| `placeholder` | `string` | — | Texte indicatif |
| `disabled` | `boolean` | `false` | Désactive le champ |
| `required` | `boolean` | `false` | Marque le champ comme requis |
| **`error`** | `string` | — | Active le style d'erreur |
| `rows` | `number` | `3` | Nombre de lignes visibles |
| `cols` | `number` | — | Largeur fixe en colonnes (mode `inline`) |
| **`maxlength`** | `number` | — | Limite de caractères — affiche un compteur |
| **`resize`** | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Comportement du redimensionnement |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `string` | Émis à chaque frappe |

#### Exemples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { InputArea } from '@/components/ui/input'

const bio = ref('')
</script>

<template>
  <InputArea v-model="bio" placeholder="Votre biographie…" :rows="5" />
</template>
```

```vue
<!-- Avec limite de caractères et resize désactivé -->
<InputArea
  v-model="bio"
  :maxlength="280"
  resize="none"
  placeholder="Bio (280 car. max)"
/>
```

---

### Checkbox

Case à cocher accessible, construite sur `CheckboxRoot` de Reka UI. Compatible avec `v-model` (prop `checked` / événement `update:checked`).

#### Props

Hérite de `CheckboxRootProps` (Reka UI) :

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`checked`** / `v-model` | `boolean \| 'indeterminate'` | — | État de la case |
| `defaultChecked` | `boolean` | — | État initial non contrôlé |
| `disabled` | `boolean` | `false` | Désactive la case |
| `required` | `boolean` | `false` | Marque comme requis dans un formulaire |
| `name` | `string` | — | Nom pour la soumission de formulaire |
| `value` | `string` | — | Valeur pour la soumission de formulaire |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Icône custom à la place de la coche par défaut |

#### Exemple

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'

const accepted = ref(false)
</script>

<template>
  <label class="flex items-center gap-2 cursor-pointer">
    <Checkbox v-model:checked="accepted" />
    <span>J'accepte les conditions d'utilisation</span>
  </label>
</template>
```

---

## 3. Boutons & Actions

### Button

Bouton polyvalent avec 8 variantes de couleur, 4 formes, 5 tailles et des options d'icônes, de badge et de chargement. Basé sur `Primitive` de Reka UI pour pouvoir être rendu en `<a>`, `<router-link>`, etc.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur sémantique |
| **`shape`** | `ButtonShape` | `'plain'` | Forme visuelle (`plain`, `outline`, `ghost`, `link`) |
| **`size`** | `Size` | `'default'` | Taille (`tiny`, `small`, `default`, `large`, `extra`) |
| `fluid` | `boolean` | `false` | Prend toute la largeur disponible (`w-full`) |
| `rounded` | `boolean` | `false` | Coins complètement arrondis (`rounded-full`) |
| **`icon`** | `boolean` | `false` | Mode icône seule — bouton carré (ou cercle si `rounded`) |
| **`loading`** | `boolean` | `false` | Affiche un spinner et désactive le bouton |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| **`badge`** | `number \| null` | `null` | Badge numérique en overlay coin supérieur droit (max `99+`) |
| **`iconLeft`** | `Component` | — | Composant icône affiché à gauche du texte |
| **`iconRight`** | `Component` | — | Composant icône affiché à droite du texte |
| `as` | `string \| Component` | `'button'` | Élément ou composant HTML rendu |
| `asChild` | `boolean` | `false` | Passe les props à l'enfant direct (pattern Reka UI) |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du bouton (texte, icône principale) |

#### Exemples

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { SaveIcon, TrashIcon } from 'lucide-vue-next'
</script>

<template>
  <!-- Variantes de forme -->
  <Button variant="primary" shape="plain">Enregistrer</Button>
  <Button variant="danger" shape="outline">Supprimer</Button>
  <Button variant="secondary" shape="ghost">Annuler</Button>
  <Button variant="primary" shape="link">En savoir plus</Button>
</template>
```

```vue
<!-- Tailles, icônes, loading, badge -->
<Button size="small" :icon-left="SaveIcon">Sauvegarder</Button>
<Button size="large" variant="danger" :icon-left="TrashIcon" shape="outline">Supprimer</Button>
<Button :loading="isSaving" variant="primary">Traitement…</Button>
<Button :badge="5" variant="primary">Notifications</Button>

<!-- Mode icône seule -->
<Button :icon="true" variant="ghost" rounded :aria-label="'Supprimer'">
  <TrashIcon />
</Button>

<!-- Rendu en lien -->
<Button as="a" href="/dashboard" variant="secondary" shape="ghost">
  Tableau de bord
</Button>
```

---

### SplitButton

Bouton divisé : partie gauche déclenchable et partie droite ouvrant un menu déroulant. Partage les mêmes variantes que `Button`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur sémantique |
| **`shape`** | `'plain' \| 'outline' \| 'ghost'` | `'plain'` | Forme visuelle |
| **`size`** | `Size` | `'default'` | Taille |
| `fluid` | `boolean` | `false` | Prend toute la largeur disponible |
| `disabled` | `boolean` | `false` | Désactive les deux parties |
| `loading` | `boolean` | `false` | Affiche un spinner dans la partie principale |
| **`iconLeft`** | `Component` | — | Icône à gauche du label dans la partie principale |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu de la partie principale (texte) |
| **`dropdown`** | Items du menu déroulant (utiliser `DropdownMenuItem`) |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `click` | `MouseEvent` | Clic sur la partie principale du bouton |

#### Exemple

```vue
<script setup lang="ts">
import { SplitButton } from '@/components/ui/split-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SaveIcon } from 'lucide-vue-next'

function save() { /* ... */ }
function saveAsDraft() { /* ... */ }
function saveAndPublish() { /* ... */ }
</script>

<template>
  <SplitButton variant="primary" :icon-left="SaveIcon" @click="save">
    Enregistrer
    <template #dropdown>
      <DropdownMenuItem @click="saveAsDraft">Sauvegarder comme brouillon</DropdownMenuItem>
      <DropdownMenuItem @click="saveAndPublish">Sauvegarder et publier</DropdownMenuItem>
    </template>
  </SplitButton>
</template>
```

---

### Toggle

Bouton à bascule (actif/inactif) basé sur `Toggle` de Reka UI. Peut afficher un texte différent selon l'état via `onValue` / `offValue`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur quand l'état est `on` |
| **`shape`** | `'ghost' \| 'outline' \| 'plain'` | `'ghost'` | Forme visuelle |
| **`size`** | `Size` | `'default'` | Taille |
| `pressed` | `boolean` | — | État contrôlé |
| `defaultPressed` | `boolean` | — | État initial non contrôlé |
| `disabled` | `boolean` | `false` | Désactive le toggle |
| **`onValue`** | `string` | — | Texte affiché quand `pressed = true` |
| **`offValue`** | `string` | — | Texte affiché quand `pressed = false` |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du toggle (icône, texte). Ignoré si `onValue`/`offValue` sont définis |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:pressed` | `boolean` | Changement d'état |

#### Exemples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Toggle } from '@/components/ui/toggle'
import { BoldIcon } from 'lucide-vue-next'

const bold = ref(false)
</script>

<template>
  <!-- Toggle icône (éditeur de texte) -->
  <Toggle v-model:pressed="bold" variant="primary" shape="outline" aria-label="Gras">
    <BoldIcon />
  </Toggle>
</template>
```

```vue
<!-- Toggle texte contextuel -->
<Toggle
  v-model:pressed="isPublic"
  variant="success"
  on-value="Public"
  off-value="Privé"
  shape="plain"
/>
```

---

### ToggleSwitch

Interrupteur de type switch (on/off) avec label intégré. Tailles limitées à `small`, `default`, `large`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur quand le switch est actif |
| **`size`** | `'small' \| 'default' \| 'large'` | `'default'` | Taille |
| **`label`** | `string` | — | Libellé affiché à droite du switch |
| `checked` | `boolean` | — | État contrôlé |
| `defaultChecked` | `boolean` | — | État initial non contrôlé |
| `disabled` | `boolean` | `false` | Désactive le switch |
| `required` | `boolean` | `false` | Marque comme requis |
| `name` | `string` | — | Nom pour la soumission de formulaire |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:checked` | `boolean` | Changement d'état |

#### Exemples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ToggleSwitch } from '@/components/ui/toggle-switch'

const notifications = ref(true)
</script>

<template>
  <ToggleSwitch v-model:checked="notifications" label="Notifications push" />
</template>
```

```vue
<!-- Variantes de couleur et taille -->
<ToggleSwitch v-model:checked="darkMode" variant="contrast" label="Mode sombre" size="large" />
<ToggleSwitch v-model:checked="analytics" variant="info" label="Analytics" size="small" />
```

---

## 4. Badge & Avatar

### Badge

Pastille d'étiquette inline avec 8 couleurs, 3 formes et 5 tailles. Supporte un point coloré décoratif via `dot`.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur sémantique |
| **`shape`** | `BadgeShape` | `'filled'` | Forme (`filled`, `outline`, `ghost`) |
| **`size`** | `Size` | `'default'` | Taille |
| `fluid` | `boolean` | `false` | Prend toute la largeur disponible |
| **`dot`** | `boolean` | `false` | Affiche un petit point coloré à gauche du texte |
| `as` | `string \| Component` | `'span'` | Élément HTML rendu |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Contenu du badge (texte) |

#### Exemples

```vue
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
</script>

<template>
  <!-- Formes -->
  <Badge variant="success" shape="filled">Actif</Badge>
  <Badge variant="warning" shape="outline">En attente</Badge>
  <Badge variant="danger" shape="ghost">Erreur</Badge>

  <!-- Avec point -->
  <Badge variant="success" dot>En ligne</Badge>

  <!-- Tailles -->
  <Badge size="tiny" variant="info">Tiny</Badge>
  <Badge size="extra" variant="primary">Extra</Badge>
</template>
```

---

### OverlayBadge

Enveloppe positionnant un badge numérique (ou un point) en overlay par rapport à son enfant. Typiquement utilisé sur une icône ou un avatar.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`value`** | `number \| null` | — | Nombre affiché. `0`, `null` ou absent = point. Max affiché : `99+` |
| **`variant`** | `Severity` | `'danger'` | Couleur du badge |
| **`position`** | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position de l'overlay |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Élément cible (icône, avatar…) |

#### Exemples

```vue
<script setup lang="ts">
import { OverlayBadge } from '@/components/ui/badge'
import { BellIcon } from 'lucide-vue-next'
</script>

<template>
  <!-- Badge numérique sur une icône -->
  <OverlayBadge :value="12" variant="danger">
    <BellIcon class="size-6" />
  </OverlayBadge>

  <!-- Point indicateur (pas de valeur) -->
  <OverlayBadge variant="success">
    <img src="/avatar.jpg" class="size-8 rounded-full" alt="Avatar" />
  </OverlayBadge>

  <!-- Position personnalisée -->
  <OverlayBadge :value="3" position="bottom-right" variant="primary">
    <BellIcon class="size-6" />
  </OverlayBadge>
</template>
```

---

### Avatar

Conteneur circulaire pour une image ou des initiales, basé sur `AvatarRoot` de Reka UI. Utiliser les sous-composants Reka UI `AvatarImage` et `AvatarFallback` à l'intérieur.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`size`** | `Size` | `'default'` | Taille (`tiny`=20px, `small`=28px, `default`=36px, `large`=48px, `extra`=64px) |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | `AvatarImage` + `AvatarFallback` de Reka UI |

#### Exemples

```vue
<script setup lang="ts">
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage, AvatarFallback } from 'reka-ui'
</script>

<template>
  <!-- Avatar avec image et fallback initiales -->
  <Avatar size="large">
    <AvatarImage src="/users/alice.jpg" alt="Alice" />
    <AvatarFallback class="bg-blue-100 text-blue-700 font-semibold text-sm">
      AL
    </AvatarFallback>
  </Avatar>

  <!-- Différentes tailles -->
  <Avatar size="tiny"><AvatarFallback>A</AvatarFallback></Avatar>
  <Avatar size="small"><AvatarFallback>AB</AvatarFallback></Avatar>
  <Avatar size="extra"><AvatarFallback>AB</AvatarFallback></Avatar>
</template>
```

---

## 5. Feedback

### Alert

Bannière d'alerte avec icône, titre, fermeture et disparition automatique. Se monte/démonte avec une animation de transition.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'info'` | Couleur sémantique |
| `title` | `string` | — | Titre en gras affiché avant le corps |
| **`dismissible`** | `boolean` | `false` | Affiche un bouton de fermeture × |
| **`icon`** | `boolean` | `true` | Affiche l'icône par défaut selon la variante |
| **`iconComponent`** | `Component` | — | Remplace l'icône par défaut par un composant Vue |
| **`delay`** | `number` | `0` | Fermeture automatique après N millisecondes (`0` = désactivé) |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Corps du message |
| `icon` | Icône personnalisée (remplace `iconComponent`) |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `close` | — | Émis quand l'alerte se ferme (bouton ou `delay`) |

#### Exemples

```vue
<script setup lang="ts">
import { Alert } from '@/components/ui/alert'
</script>

<template>
  <Alert variant="success" title="Enregistrement réussi">
    Vos modifications ont bien été sauvegardées.
  </Alert>

  <Alert variant="danger" title="Erreur" :dismissible="true">
    Une erreur est survenue lors de la connexion au serveur.
  </Alert>
</template>
```

```vue
<!-- Auto-fermeture après 5 secondes -->
<Alert variant="info" :delay="5000" @close="handleClose">
  Votre session expirera dans 5 minutes.
</Alert>

<!-- Icône personnalisée -->
<Alert variant="warning" :icon-component="ShieldIcon" title="Sécurité">
  Activez l'authentification à deux facteurs.
</Alert>
```

---

### Toast — useToast()

Système de notifications toast global. Les toasts s'affichent via le composable `useToast()`. Maximum 3 toasts simultanés — le plus ancien est automatiquement retiré.

#### Durées par défaut

| Variante | Durée | Persistant |
|----------|-------|-----------|
| `info` | 4 000 ms | non |
| `success` | 4 000 ms | non |
| `warning` | 6 000 ms | non |
| `error` | — | **oui** (doit être fermé manuellement) |

#### API du composable

```ts
const { toasts, success, warning, error, info, dismiss } = useToast()
```

| Méthode | Signature | Description |
|---------|-----------|-------------|
| **`success`** | `(message: string, options?: ToastOptions) => string` | Toast de succès |
| **`warning`** | `(message: string, options?: ToastOptions) => string` | Toast d'avertissement |
| **`error`** | `(message: string, options?: ToastOptions) => string` | Toast d'erreur persistant |
| **`info`** | `(message: string, options?: ToastOptions) => string` | Toast informatif |
| **`dismiss`** | `(id: string) => void` | Ferme un toast par son identifiant |
| `toasts` | `Toast[]` réactif | Liste des toasts visibles |

#### Type ToastOptions

```ts
type ToastOptions = {
  duration?:   number;   // Durée d'affichage en ms (écrase la valeur par défaut)
  persistent?: boolean;  // true = ne se ferme pas automatiquement
}
```

#### Exemple

```vue
<script setup lang="ts">
import { useToast } from '@/composables/useToast'

const toast = useToast()

async function saveData() {
  try {
    await api.save()
    toast.success('Données enregistrées avec succès.')
  } catch (err) {
    toast.error('Impossible d'enregistrer. Vérifiez votre connexion.')
  }
}

function notify() {
  const id = toast.info('Traitement en cours…', { persistent: true })
  setTimeout(() => toast.dismiss(id), 3000)
}
</script>

<template>
  <button @click="saveData">Enregistrer</button>
  <button @click="toast.warning('Stock faible !', { duration: 8000 })">Avertir</button>
</template>
```

---

### ProgressBar

Barre de progression déterminée ou indéterminée (animation) avec label de pourcentage optionnel.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`value`** | `number` | — | Valeur de `0` à `100`. Si absent : mode **indéterminé** (animation de défilement) |
| **`variant`** | `Severity` | `'primary'` | Couleur de la barre |
| **`size`** | `'tiny' \| 'small' \| 'default' \| 'large'` | `'default'` | Épaisseur de la barre |
| **`label`** | `boolean` | `false` | Affiche le pourcentage en texte à droite |
| `class` | `string` | — | Classes additionnelles |

> **Note :** `size` n'inclut pas `'extra'` pour ce composant.

#### Exemple

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ProgressBar } from '@/components/ui/progress'

const progress = ref(65)
</script>

<template>
  <!-- Barre déterminée avec label -->
  <ProgressBar :value="progress" variant="primary" :label="true" />

  <!-- Barre indéterminée (chargement) -->
  <ProgressBar variant="info" size="tiny" />

  <!-- Variantes de couleur -->
  <ProgressBar :value="80" variant="success" size="small" />
  <ProgressBar :value="30" variant="danger" size="large" />
</template>
```

---

## 6. Contenu

### Card + CardHeader

Conteneur de contenu avec bordure, ombre et slots structurels. `CardHeader` est un sous-composant optionnel qui organise le titre et les actions en grille.

#### Card — Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `'default' \| Severity` | `'default'` | Couleur de la bordure |
| `padded` | `boolean` | `true` | Ajoute un padding interne et un gap entre les slots |
| `bordered` | `boolean` | `true` | Affiche la bordure |
| **`hoverable`** | `boolean` | `false` | Effet de survol (ombre + curseur pointer) |
| **`raised`** | `boolean` | `false` | Ombre plus prononcée |
| `class` | `string` | — | Classes additionnelles |

#### Card — Slots

| Slot | Description |
|------|-------------|
| `header` | Zone d'en-tête (typiquement `CardHeader`) |
| `default` | Corps principal |
| `footer` | Pied de carte (actions, boutons…) |

#### CardHeader — Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`flush`** | `boolean` | `false` | Supprime le padding — utile pour une image collée aux bords |
| `class` | `string` | — | Classes additionnelles |

#### Exemples

```vue
<script setup lang="ts">
import { Card, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Card>
    <template #header>
      <CardHeader>
        <h3 class="font-semibold text-lg">Titre de la carte</h3>
        <p class="text-sm text-muted-foreground">Description optionnelle</p>
      </CardHeader>
    </template>

    <p>Contenu principal de la carte.</p>

    <template #footer>
      <div class="flex justify-end gap-2 px-6">
        <Button variant="secondary" shape="ghost">Annuler</Button>
        <Button variant="primary">Confirmer</Button>
      </div>
    </template>
  </Card>
</template>
```

```vue
<!-- Carte cliquable avec variante de couleur -->
<Card variant="success" :hoverable="true" :raised="true" @click="handleClick">
  <template #header>
    <CardHeader>
      <h3 class="font-semibold">Paiement réussi</h3>
    </CardHeader>
  </template>
  <p class="px-6">Votre commande a été confirmée.</p>
</Card>
```

---

### Code

Bloc de code avec coloration syntaxique (highlight.js, thème Atom One Dark), bouton de copie, numéros de ligne et hauteur maximale configurable.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`code`** | `string` | — | Code à afficher (alternatif : slot par défaut) |
| **`language`** | `string` | — | Langage pour highlight.js (`javascript`, `php`, `json`, `bash`, `yaml`…) |
| `filename` | `string` | — | Nom de fichier affiché dans l'en-tête |
| **`copyable`** | `boolean` | `true` | Affiche le bouton "Copier" |
| **`lineNumbers`** | `boolean` | `false` | Affiche les numéros de ligne |
| **`maxHeight`** | `string` | — | CSS `max-height` du corps scrollable (ex : `'400px'`) |
| `class` | `string` | — | Classes additionnelles |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Alternative à `code` : texte brut du code (le composant extrait le texte) |

#### Exemples

```vue
<script setup lang="ts">
import { Code } from '@/components/ui/code'

const snippet = `const greet = (name: string) => \`Hello, \${name}!\``
</script>

<template>
  <!-- Via prop code -->
  <Code :code="snippet" language="typescript" filename="greet.ts" />

  <!-- Via slot -->
  <Code language="json" :line-numbers="true">{{ '{"key": "value"}' }}</Code>

  <!-- Sans bouton de copie, avec hauteur max -->
  <Code :code="longCode" language="php" :copyable="false" max-height="300px" />
</template>
```

---

### Image

Composant image avec skeleton de chargement, fallback en cas d'erreur, ratio d'aspect et `object-fit` configurables.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`src`** | `string` | — | **Requis.** URL de l'image |
| `alt` | `string` | `''` | Texte alternatif |
| **`ratio`** | `'1/1' \| '4/3' \| '16/9' \| '3/2' \| '2/3' \| '9/16'` | — | Ratio d'aspect fixe |
| **`fit`** | `'cover' \| 'contain' \| 'fill' \| 'none'` | `'cover'` | CSS `object-fit` |
| **`skeleton`** | `boolean` | `true` | Affiche un skeleton pendant le chargement |
| **`fallback`** | `string` | — | URL de remplacement en cas d'erreur |
| **`rounded`** | `boolean \| 'full'` | `false` | `true` = coins arrondis, `'full'` = cercle |
| `class` | `string` | — | Classes additionnelles sur le wrapper |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `load` | `Event` | Image chargée avec succès |
| `error` | `Event` | Erreur de chargement |

#### Exemples

```vue
<script setup lang="ts">
import { Image } from '@/components/ui/image'
</script>

<template>
  <!-- Image 16/9 avec skeleton -->
  <Image src="/banner.jpg" ratio="16/9" alt="Bannière" />

  <!-- Avatar circulaire -->
  <Image src="/avatar.jpg" ratio="1/1" rounded="full" class="w-16" />

  <!-- Avec fallback -->
  <Image
    src="/product.jpg"
    fallback="/placeholder.jpg"
    ratio="4/3"
    fit="contain"
    @error="onImageError"
  />
</template>
```

---

### Carousel + CarouselSlide

Carrousel tactile avec navigation, indicateurs et lecture automatique.

#### Carousel — Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `arrows` | `boolean` | `true` | Affiche les flèches de navigation |
| `dots` | `boolean` | `true` | Affiche les points indicateurs |
| **`autoplay`** | `number` | `0` | Intervalle en ms entre les slides (`0` = désactivé) |
| **`loop`** | `boolean` | `false` | Retourne au début après la dernière slide |
| **`perView`** | `number` | `1` | Nombre de slides visibles simultanément |
| **`gap`** | `string` | `'gap-4'` | Classe Tailwind de gap entre les slides |
| `class` | `string` | — | Classes additionnelles |

#### Carousel — Slots

| Slot | Description |
|------|-------------|
| `default` | Les `CarouselSlide` à afficher |

#### CarouselSlide — Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`perView`** | `number` | `1` | Doit correspondre au `:perView` du `Carousel` parent pour le calcul de largeur |
| `class` | `string` | — | Classes additionnelles |

#### Exemple

```vue
<script setup lang="ts">
import { Carousel, CarouselSlide } from '@/components/ui/carousel'

const slides = [
  { title: 'Slide 1', img: '/img/1.jpg' },
  { title: 'Slide 2', img: '/img/2.jpg' },
  { title: 'Slide 3', img: '/img/3.jpg' },
]
</script>

<template>
  <!-- Carrousel simple -->
  <Carousel :autoplay="4000" loop>
    <CarouselSlide v-for="s in slides" :key="s.title">
      <img :src="s.img" :alt="s.title" class="w-full rounded-lg" />
    </CarouselSlide>
  </Carousel>

  <!-- Multi-slides (2 visibles) -->
  <Carousel :per-view="2" gap="gap-6" :dots="false">
    <CarouselSlide v-for="s in slides" :key="s.title" :per-view="2">
      <div class="rounded-lg bg-gray-100 p-6">{{ s.title }}</div>
    </CarouselSlide>
  </Carousel>
</template>
```

---

## 7. Formulaires étendus

### Slider

Curseur de sélection de valeur numérique, basé sur `SliderRoot` de Reka UI. Supporte les plages (range) via un tableau de valeurs.

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`variant`** | `Severity` | `'primary'` | Couleur de la range et du thumb |
| **`size`** | `'small' \| 'default' \| 'large'` | `'default'` | Épaisseur de la piste et taille du thumb |
| `modelValue` / `v-model` | `number[]` | — | Valeur(s) contrôlée(s) |
| `defaultValue` | `number[]` | — | Valeur(s) initiale(s) non contrôlée(s) |
| `min` | `number` | `0` | Valeur minimale |
| `max` | `number` | `100` | Valeur maximale |
| `step` | `number` | `1` | Incrément |
| `disabled` | `boolean` | `false` | Désactive le slider |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation |
| `class` | `string` | — | Classes additionnelles |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| `update:modelValue` | `number[]` | Changement de valeur pendant le glissement |
| `valueCommit` | `number[]` | Valeur finalisée au relâchement |

#### Exemples

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const volume = ref([50])
const priceRange = ref([20, 80])
</script>

<template>
  <!-- Curseur simple -->
  <Slider v-model="volume" :min="0" :max="100" variant="primary" />
  <p>Volume : {{ volume[0] }}%</p>

  <!-- Plage de prix -->
  <Slider v-model="priceRange" :min="0" :max="200" :step="5" variant="success" size="large" />
  <p>Prix : {{ priceRange[0] }}€ – {{ priceRange[1] }}€</p>
</template>
```

---

## 8. Overlays & Navigation

### ContextMenu

Menu contextuel (clic droit) composé de plusieurs sous-composants. Basé sur Reka UI.

#### Composants exportés

| Composant | Rôle |
|-----------|------|
| `ContextMenu` | Racine — gère l'état ouvert/fermé |
| `ContextMenuTrigger` | Zone déclenchant l'ouverture (clic droit) |
| `ContextMenuContent` | Conteneur du menu (panneau flottant) |
| `ContextMenuItem` | Élément cliquable |
| `ContextMenuLabel` | Libellé non cliquable (groupe) |
| `ContextMenuSeparator` | Séparateur horizontal |
| `ContextMenuShortcut` | Raccourci clavier aligné à droite |
| `ContextMenuGroup` | Groupe logique d'items |
| `ContextMenuSub` | Racine du sous-menu |
| `ContextMenuSubTrigger` | Déclencheur du sous-menu |
| `ContextMenuSubContent` | Contenu du sous-menu |
| `ContextMenuCheckboxItem` | Item avec case à cocher |
| `ContextMenuRadioGroup` | Groupe radio |
| `ContextMenuRadioItem` | Item radio |

#### ContextMenuContent — Props

Hérite de `ContextMenuContentProps` de Reka UI.

| Prop | Type | Description |
|------|------|-------------|
| `class` | `string` | Classes additionnelles |

#### ContextMenuItem — Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `inset` | `boolean` | `false` | Décale le contenu vers la droite (alignement avec icône) |
| **`variant`** | `'default' \| 'danger'` | `'default'` | `'danger'` colore l'item en rouge |
| `disabled` | `boolean` | `false` | Désactive l'item |
| `class` | `string` | — | Classes additionnelles |

#### Exemple complet

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
} from '@/components/ui/context-menu'
import { ref } from 'vue'

const showPreview = ref(true)

function openFile()   { /* ... */ }
function deleteFile() { /* ... */ }
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="w-64 h-32 rounded-lg border border-dashed flex items-center justify-center cursor-default select-none">
        Clic droit ici
      </div>
    </ContextMenuTrigger>

    <ContextMenuContent>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuSeparator />

      <ContextMenuItem @click="openFile">
        Ouvrir
        <ContextMenuShortcut>⌘O</ContextMenuShortcut>
      </ContextMenuItem>

      <ContextMenuSub>
        <ContextMenuSubTrigger>Partager</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Par e-mail</ContextMenuItem>
          <ContextMenuItem>Lien public</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>

      <ContextMenuCheckboxItem v-model:checked="showPreview">
        Aperçu
      </ContextMenuCheckboxItem>

      <ContextMenuSeparator />

      <ContextMenuItem variant="danger" @click="deleteFile">
        Supprimer
        <ContextMenuShortcut>⌫</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

---

### CollapsibleContent

Extension du `CollapsibleContent` de Reka UI avec un mode **overlay** : le panneau se déploie par-dessus les éléments suivants sans perturber le flux du document (idéal pour des menus déroulants custom).

#### Props

Hérite de `CollapsibleContentProps` de Reka UI.

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`overlay`** | `boolean` | `false` | Positionne le contenu en `absolute` par-dessus le reste |
| `class` | `string` | — | Classes additionnelles |

> **Note :** En mode `overlay`, le parent doit avoir `position: relative`.

#### Exemple

```vue
<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
</script>

<template>
  <!-- Collapsible normal (dans le flux) -->
  <CollapsibleRoot>
    <CollapsibleTrigger as-child>
      <Button variant="secondary" shape="outline">Afficher les détails</Button>
    </CollapsibleTrigger>
    <CollapsibleContent class="mt-2 p-4 border rounded-lg">
      <p>Contenu révélé dans le flux normal.</p>
    </CollapsibleContent>
  </CollapsibleRoot>

  <!-- Mode overlay (dropdown custom) -->
  <div class="relative">
    <CollapsibleRoot>
      <CollapsibleTrigger as-child>
        <Button variant="secondary" shape="outline">Options</Button>
      </CollapsibleTrigger>
      <CollapsibleContent :overlay="true" class="p-2">
        <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Option 1</button>
        <button class="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Option 2</button>
      </CollapsibleContent>
    </CollapsibleRoot>
  </div>
</template>
```

---

### SpeedDial

Bouton d'action flottant (FAB) qui révèle un ensemble d'actions secondaires dans une direction configurable. Chaque action dispose d'un tooltip au survol.

#### Type SpeedDialItem

```ts
interface SpeedDialItem {
  label:     string;     // Texte du tooltip
  icon:      Component;  // Icône Lucide (ou tout composant Vue)
  onClick:   () => void; // Callback au clic
  disabled?: boolean;    // Désactive l'action
  variant?:  Severity;   // Couleur du bouton action (défaut : 'secondary')
}
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`items`** | `SpeedDialItem[]` | — | **Requis.** Liste des actions secondaires |
| **`direction`** | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction d'ouverture |
| **`variant`** | `Severity` | `'primary'` | Couleur du bouton principal |
| **`size`** | `'small' \| 'default' \| 'large'` | `'default'` | Taille du bouton principal |
| **`icon`** | `Component` | — | Icône custom du bouton principal (sinon `+` / `×`) |
| `disabled` | `boolean` | `false` | Désactive tout le composant |
| `class` | `string` | — | Classes additionnelles |

#### Exemple

```vue
<script setup lang="ts">
import { SpeedDial, type SpeedDialItem } from '@/components/ui/speed-dial'
import { EditIcon, TrashIcon, ShareIcon, DownloadIcon } from 'lucide-vue-next'

const actions: SpeedDialItem[] = [
  { label: 'Modifier',     icon: EditIcon,     onClick: () => console.log('edit'),     variant: 'primary' },
  { label: 'Partager',     icon: ShareIcon,    onClick: () => console.log('share'),    variant: 'info' },
  { label: 'Télécharger',  icon: DownloadIcon, onClick: () => console.log('download'), variant: 'success' },
  { label: 'Supprimer',    icon: TrashIcon,    onClick: () => console.log('delete'),   variant: 'danger' },
]
</script>

<template>
  <!-- Fixé en bas à droite -->
  <div class="fixed bottom-6 right-6 z-50">
    <SpeedDial :items="actions" direction="up" variant="primary" size="default" />
  </div>

  <!-- Direction horizontale -->
  <SpeedDial :items="actions" direction="right" variant="secondary" size="small" />
</template>
```

---

## 9. Données

### DataTable

Tableau de données complet avec tri multi-colonnes, recherche globale (debounced), sélection de lignes, pagination et slots custom par colonne.

#### Type DataTableColumn

```ts
interface DataTableColumn<Row = Record<string, unknown>> {
  key:       string;                                // Clé dans l'objet de données
  label:     string;                                // En-tête de la colonne
  sortable?: boolean;                               // Active le tri sur cette colonne
  width?:    string;                                // Largeur CSS ('120px', '20%'…)
  align?:    'left' | 'center' | 'right';           // Alignement du contenu (défaut : 'left')
  format?:   (value: unknown, row: Row) => string;  // Formateur de valeur (fallback si pas de slot)
}
```

#### Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| **`columns`** | `DataTableColumn[]` | — | **Requis.** Définition des colonnes |
| **`data`** | `T[]` | — | **Requis.** Données à afficher |
| **`searchable`** | `boolean` | `false` | Affiche un champ de recherche globale (debounce 250 ms) |
| **`selectable`** | `boolean` | `false` | Affiche une colonne de cases à cocher |
| **`pageSize`** | `number` | `15` | Nombre de lignes par page (`0` = pas de pagination) |
| **`pageSizes`** | `number[]` | `[10,25,50,100]` | Options du sélecteur de taille de page |
| **`loading`** | `boolean` | `false` | Affiche le skeleton de chargement |
| `emptyText` | `string` | `'Aucun résultat.'` | Texte affiché si aucune donnée |
| **`striped`** | `boolean` | `false` | Lignes alternées (zèbre) |
| `hoverable` | `boolean` | `true` | Mise en évidence au survol |
| `class` | `string` | — | Classes additionnelles |

#### v-model

| Binding | Type | Description |
|---------|------|-------------|
| **`v-model:selected`** | `T[]` | Tableau des lignes sélectionnées (active implicitement la colonne checkbox) |

#### Événements

| Événement | Payload | Description |
|-----------|---------|-------------|
| **`@row-click`** | `row: T` | Clic sur une ligne entière |
| **`@cell-click`** | `key: string, row: T` | Clic sur une cellule précise |

#### Slots

| Slot | Props du slot | Description |
|------|---------------|-------------|
| **`#column-{key}`** | `{ row: T, value: unknown }` | Rendu custom pour la colonne `key`. Remplace le formateur `format` |
| `#empty` | — | Contenu de l'état vide (remplace `emptyText`) |

#### Exemple complet

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DataTable, type DataTableColumn } from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface User {
  id:     number
  name:   string
  email:  string
  role:   string
  status: 'active' | 'inactive' | 'pending'
  joined: string
}

const columns: DataTableColumn<User>[] = [
  { key: 'name',   label: 'Nom',     sortable: true,  width: '200px' },
  { key: 'email',  label: 'E-mail',  sortable: true },
  { key: 'role',   label: 'Rôle',   align: 'center', width: '120px' },
  { key: 'status', label: 'Statut', align: 'center', width: '120px' },
  { key: 'joined', label: 'Inscrit',
    sortable: true,
    format: (v) => new Date(v as string).toLocaleDateString('fr-FR'),
  },
  { key: 'actions', label: '', width: '80px', align: 'right' },
]

const users = ref<User[]>([
  { id: 1, name: 'Alice Martin',   email: 'alice@example.com', role: 'Admin',    status: 'active',   joined: '2024-01-15' },
  { id: 2, name: 'Bob Dupont',     email: 'bob@example.com',   role: 'Éditeur',  status: 'inactive', joined: '2024-03-22' },
  { id: 3, name: 'Claire Bernard', email: 'claire@example.com',role: 'Lecteur',  status: 'pending',  joined: '2024-06-01' },
])

const selected = ref<User[]>([])
const loading  = ref(false)

function handleRowClick(user: User) {
  console.log('Ligne cliquée :', user.name)
}

function editUser(user: User) {
  console.log('Modifier :', user.id)
}
</script>

<template>
  <DataTable
    :columns="columns"
    :data="users"
    v-model:selected="selected"
    :searchable="true"
    :striped="true"
    :loading="loading"
    :page-size="10"
    empty-text="Aucun utilisateur trouvé."
    @row-click="handleRowClick"
    @cell-click="(key, row) => console.log(key, row)"
  >
    <!-- Slot custom pour la colonne status -->
    <template #column-status="{ value }">
      <Badge
        :variant="value === 'active' ? 'success' : value === 'pending' ? 'warning' : 'secondary'"
        shape="filled"
        size="small"
      >
        {{ value === 'active' ? 'Actif' : value === 'pending' ? 'En attente' : 'Inactif' }}
      </Badge>
    </template>

    <!-- Slot custom pour les actions -->
    <template #column-actions="{ row }">
      <Button
        size="small"
        variant="secondary"
        shape="ghost"
        @click.stop="editUser(row)"
      >
        Modifier
      </Button>
    </template>

    <!-- État vide personnalisé -->
    <template #empty>
      <div class="py-8 text-center text-gray-400">
        <p class="font-medium">Aucun résultat</p>
        <p class="text-sm mt-1">Modifiez vos critères de recherche.</p>
      </div>
    </template>
  </DataTable>

  <!-- Affichage des lignes sélectionnées -->
  <p v-if="selected.length" class="mt-4 text-sm text-gray-600">
    {{ selected.length }} utilisateur(s) sélectionné(s) :
    {{ selected.map(u => u.name).join(', ') }}
  </p>
</template>
```

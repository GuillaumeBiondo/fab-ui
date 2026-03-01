import type { InjectionKey } from 'vue'
import type { Severity } from '@/types/ui-kit'

export type TabsPlacement = 'top' | 'left' | 'right'
export type TabsSize      = 'small' | 'default' | 'large'

export interface TabsContext {
    placement: TabsPlacement
    variant:   Severity
    size:      TabsSize
}

export const TABS_CONTEXT_KEY: InjectionKey<TabsContext> = Symbol('fab-tabs')

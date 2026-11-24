export type SectionId = 'overview' | 'grid' | 'spacing' | 'breakpoints';

export type ContainerPreset = 'compact' | 'standard' | 'wide';

export interface NavItem {
  id: SectionId;
  label: string;
  href: string;
  summary: string;
}

export interface BreakpointSpec {
  prefix: string;
  minWidthPx: number;
  containerRule: string;
  columns: number;
  gutterPx: number;
}

export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '#overview',
    summary: 'Full-height flex column wrapper pairing a sticky top bar with a centered main viewport.',
  },
  {
    id: 'grid',
    label: 'Grid System',
    href: '#grid',
    summary: 'Adaptive multi-column grid that reflows from one column on mobile to three on desktop.',
  },
  {
    id: 'spacing',
    label: 'Spacing',
    href: '#spacing',
    summary: 'Consistent outer padding and inner gap rhythm across viewport widths.',
  },
  {
    id: 'breakpoints',
    label: 'Breakpoints',
    href: '#breakpoints',
    summary: 'Responsive Tailwind CSS breakpoint thresholds and container width limits.',
  },
] as const;

export const BREAKPOINT_SPECS: readonly BreakpointSpec[] = [
  {
    prefix: 'base',
    minWidthPx: 0,
    containerRule: '100% width · 16px horizontal padding',
    columns: 1,
    gutterPx: 16,
  },
  {
    prefix: 'sm',
    minWidthPx: 640,
    containerRule: '100% width · 24px horizontal padding',
    columns: 1,
    gutterPx: 24,
  },
  {
    prefix: 'md',
    minWidthPx: 768,
    containerRule: 'Desktop nav visible · 2-column grid',
    columns: 2,
    gutterPx: 24,
  },
  {
    prefix: 'lg',
    minWidthPx: 1024,
    containerRule: 'Max-width container · 32px horizontal padding',
    columns: 3,
    gutterPx: 24,
  },
  {
    prefix: 'xl',
    minWidthPx: 1280,
    containerRule: 'Full desktop measure · balanced line length',
    columns: 3,
    gutterPx: 32,
  },
] as const;

export const CONTAINER_PRESETS: Record<
  ContainerPreset,
  { label: string; maxWidthClass: string; maxPx: number }
> = {
  compact: {
    label: 'Compact',
    maxWidthClass: 'max-w-4xl',
    maxPx: 896,
  },
  standard: {
    label: 'Standard',
    maxWidthClass: 'max-w-6xl',
    maxPx: 1152,
  },
  wide: {
    label: 'Wide',
    maxWidthClass: 'max-w-7xl',
    maxPx: 1280,
  },
};

export function getSectionById(id: string): NavItem {
  return NAV_ITEMS.find((item) => item.id === id) ?? NAV_ITEMS[0];
}

export function getContainerMaxWidthClass(preset: ContainerPreset): string {
  return CONTAINER_PRESETS[preset].maxWidthClass;
}

export function getBreakpointColumnsForWidth(widthPx: number): number {
  if (widthPx >= 1024) {
    return 3;
  }
  if (widthPx >= 768) {
    return 2;
  }
  return 1;
}

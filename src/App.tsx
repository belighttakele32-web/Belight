/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  BREAKPOINT_SPECS,
  CONTAINER_PRESETS,
  ContainerPreset,
  NAV_ITEMS,
  SectionId,
  getContainerMaxWidthClass,
  getSectionById,
} from './layout/sections';

interface LayoutCard {
  id: string;
  section: SectionId;
  kicker: string;
  title: string;
  description: string;
  classesUsed: string;
}

const LAYOUT_CARDS: readonly LayoutCard[] = [
  {
    id: 'shell',
    section: 'overview',
    kicker: 'Root Container',
    title: 'Full-Viewport Flex Shell',
    description:
      'Anchors the header at the top and stretches the main region across remaining vertical space without pushing the footer off short pages.',
    classesUsed: 'min-h-screen flex flex-col bg-neutral-50',
  },
  {
    id: 'header-bar',
    section: 'overview',
    kicker: 'Header Region',
    title: 'Sticky Three-Zone Top Bar',
    description:
      'Keeps brand identity, primary navigation links, and one primary action aligned in a single row with responsive mobile collapse.',
    classesUsed: 'sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm',
  },
  {
    id: 'main-region',
    section: 'grid',
    kicker: 'Main Content Area',
    title: 'Centered Responsive Measure',
    description:
      'Uses flex-1 so main content fills the viewport cleanly while constraining line lengths and adapting horizontal padding at sm and lg.',
    classesUsed: 'flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8',
  },
  {
    id: 'adaptive-grid',
    section: 'grid',
    kicker: 'Content Grid',
    title: '1-to-3 Column Flow',
    description:
      'Stacks cleanly on mobile viewports, splits into two columns at tablet widths, and expands into three balanced columns on desktop.',
    classesUsed: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  },
  {
    id: 'outer-rhythm',
    section: 'spacing',
    kicker: 'Spatial Rhythm',
    title: 'Outer-to-Inner Padding Ratio',
    description:
      'Maintains wider outer container margins than internal card gaps so section boundaries stay legible across every screen size.',
    classesUsed: 'py-8 sm:py-12 space-y-10',
  },
  {
    id: 'focus-states',
    section: 'breakpoints',
    kicker: 'Accessibility',
    title: 'Keyboard & Touch Targets',
    description:
      'All header links, width presets, and mobile drawer toggles use native button or anchor semantics with visible focus rings.',
    classesUsed: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900',
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [containerPreset, setContainerPreset] = useState<ContainerPreset>('standard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentSection = getSectionById(activeSection);
  const containerWidthClass = getContainerMaxWidthClass(containerPreset);

  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const handleResetLayout = () => {
    setActiveSection('overview');
    setContainerPreset('standard');
    setMobileMenuOpen(false);
  };

  const visibleCards =
    activeSection === 'overview'
      ? LAYOUT_CARDS
      : LAYOUT_CARDS.filter((card) => card.section === activeSection || card.section === 'overview');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Responsive Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
        <div
          className={`w-full ${containerWidthClass} mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8 transition-[max-width] duration-200`}
        >
          {/* Zone 1: Brand wordmark */}
          <a
            href="#overview"
            onClick={(event) => {
              event.preventDefault();
              handleSelectSection('overview');
            }}
            className="text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 rounded-sm"
          >
            Atelier Shell
          </a>

          {/* Zone 2: Primary navigation links (desktop) */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSelectSection(item.id);
                  }}
                  className={`text-sm font-medium whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900 ${
                    isActive
                      ? 'text-neutral-950 border-slate-900'
                      : 'text-neutral-600 border-transparent hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single primary action + mobile menu button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleResetLayout}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              Reset View
            </button>

            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Collapsible Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 space-y-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    handleSelectSection(item.id);
                  }}
                  className={`flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-neutral-100 text-neutral-950'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-neutral-100 sm:hidden">
              <button
                type="button"
                onClick={handleResetLayout}
                className="w-full min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors duration-150 cursor-pointer"
              >
                Reset View
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main
        className={`flex-1 w-full ${containerWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-[max-width] duration-200`}
      >
        <div className="space-y-10">
          {/* Page Intro & Width Preset Controls */}
          <section
            aria-labelledby="page-heading"
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-neutral-200"
          >
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-neutral-500">
                <span>Layout Wrapper</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>{currentSection.label}</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span className="tabular-nums">{CONTAINER_PRESETS[containerPreset].maxPx}px max</span>
              </p>
              <h1
                id="page-heading"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 [text-wrap:balance]"
              >
                {currentSection.label} Architecture
              </h1>
              <p className="text-base leading-relaxed text-neutral-600">
                {currentSection.summary}
              </p>
            </div>

            {/* Interactive Container Width Selector */}
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <span className="text-xs font-medium text-neutral-500">Container Width</span>
              <div
                role="group"
                aria-label="Container width preset"
                className="self-start sm:self-end inline-flex items-center gap-1 p-1 bg-neutral-200/70 rounded-lg"
              >
                {(Object.keys(CONTAINER_PRESETS) as ContainerPreset[]).map((presetKey) => {
                  const preset = CONTAINER_PRESETS[presetKey];
                  const isSelected = containerPreset === presetKey;
                  return (
                    <button
                      key={presetKey}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setContainerPreset(presetKey)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                        isSelected
                          ? 'bg-white text-neutral-950 shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Responsive Content Grid */}
          <section aria-labelledby="modules-heading" className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="modules-heading" className="text-xl font-semibold tracking-tight text-neutral-900">
                Structural Regions
              </h2>
              <span className="text-xs text-neutral-500 tabular-nums">
                {visibleCards.length} {visibleCards.length === 1 ? 'region' : 'regions'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCards.map((card) => (
                <article
                  key={card.id}
                  className="bg-white border border-neutral-200 rounded-xl p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-2.5">
                    <p className="text-xs font-medium text-neutral-500">{card.kicker}</p>
                    <h3 className="text-lg font-semibold text-neutral-950">{card.title}</h3>
                    <p className="text-sm leading-relaxed text-neutral-600">{card.description}</p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <code className="block font-mono text-xs text-slate-700 break-words">
                      {card.classesUsed}
                    </code>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Breakpoint Reference Table */}
          <section aria-labelledby="breakpoints-heading" className="space-y-4">
            <h2 id="breakpoints-heading" className="text-xl font-semibold tracking-tight text-neutral-900">
              Responsive Breakpoints
            </h2>
            <div className="bg-white border border-neutral-200 rounded-xl overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 text-xs font-semibold text-neutral-600">
                    <th scope="col" className="py-3 px-4">Prefix</th>
                    <th scope="col" className="py-3 px-4 text-right">Min Width</th>
                    <th scope="col" className="py-3 px-4">Behavior</th>
                    <th scope="col" className="py-3 px-4 text-right">Columns</th>
                    <th scope="col" className="py-3 px-4 text-right">Gutter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {BREAKPOINT_SPECS.map((spec) => (
                    <tr key={spec.prefix} className="hover:bg-neutral-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs font-medium text-neutral-900">
                        {spec.prefix}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-neutral-700 tabular-nums">
                        {spec.minWidthPx}px
                      </td>
                      <td className="py-3 px-4 text-neutral-600">{spec.containerRule}</td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-neutral-700 tabular-nums">
                        {spec.columns}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-xs text-neutral-700 tabular-nums">
                        {spec.gutterPx}px
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-neutral-200 bg-white">
        <div
          className={`w-full ${containerWidthClass} mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500`}
        >
          <span>Atelier Shell · Tailwind CSS Layout Wrapper</span>
          <span className="tabular-nums">Sticky header · Flex main · Mobile drawer</span>
        </div>
      </footer>
    </div>
  );
}

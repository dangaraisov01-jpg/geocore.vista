/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TopNav, HeroSection } from './components/NavbarAndHero';
import { ProjectsAndGisSection } from './components/ProjectsAndGisSection';
import { LogsAndSamplingSection } from './components/LogsAndSamplingSection';
import { ExportAndParserSection } from './components/ExportAndParserSection';
import { OfflineRolesAndFaqSection } from './components/OfflineRolesAndFaqSection';
import { ContinuousEarthBackground } from './components/LithoColumnDecor';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#231C16] text-[#14171A] relative">
      <TopNav />

      {/* Единое бесшовное полотно геологического разреза на весь сайт (не привязано к отдельным пунктам) */}
      <div className="relative flex-1">
        <ContinuousEarthBackground />

        <main className="relative z-10 flex-1">
          <HeroSection />
          <ProjectsAndGisSection />
          <LogsAndSamplingSection />
          <ExportAndParserSection />
          <OfflineRolesAndFaqSection />
        </main>
      </div>
    </div>
  );
}

import { Analytics } from "@vercel/analytics/next";
import { Header, Hero, Workflow } from "./components/showcase/Intro";
import {
  ProductShowcase,
  RealResults,
} from "./components/showcase/ProductShowcase";
import {
  FieldAndTeam,
  Output,
  FAQ,
  Footer,
} from "./components/showcase/Details";
import { I18nProvider, useI18n } from "./i18n";

function PageContent() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Workflow />
        <ProductShowcase />
        <RealResults />
        <Output />
        <FieldAndTeam />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <PageContent />
      <Analytics />
    </I18nProvider>
  );
}

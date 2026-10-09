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

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
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

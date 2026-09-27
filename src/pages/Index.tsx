import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import HeroV2 from "@/components/v2/HeroV2";
import MethodSection from "@/components/v2/MethodSection";
import ResultsShowcase from "@/components/v2/ResultsShowcase";
import FinalCTA from "@/components/v2/FinalCTA";
import ScrollChapter from "@/components/v2/ScrollChapter";
import { PlansPreview, ChallengesPreview } from "@/components/v2/HomePreviews";
export default function Index() {
  return (
    <div className="home-v2">
      <Navigation />
      <main id="main-content">
        <ScrollChapter
          id="presentacion"
          number="01"
          next={{ id: "capitulo-metodo", label: "El método" }}
        >
          <HeroV2 />
        </ScrollChapter>
        <ScrollChapter
          id="capitulo-metodo"
          number="02"
          next={{ id: "capitulo-futbolistas", label: "Clientes" }}
        >
          <MethodSection />
        </ScrollChapter>
        <ScrollChapter
          id="capitulo-futbolistas"
          number="03"
          next={{ id: "capitulo-planes", label: "Planes y packs" }}
        >
          <ResultsShowcase />
        </ScrollChapter>
        <ScrollChapter
          id="capitulo-planes"
          number="04"
          next={{ id: "capitulo-retos", label: "Retos con JPS" }}
        >
          <PlansPreview />
        </ScrollChapter>
        <ScrollChapter
          id="capitulo-retos"
          number="05"
          next={{ id: "capitulo-dudas", label: "Tus dudas" }}
        >
          <ChallengesPreview />
        </ScrollChapter>
        <ScrollChapter
          id="capitulo-dudas"
          number="06"
          next={{ id: "capitulo-empezar", label: "El siguiente paso" }}
        >
          <FAQ compact />
        </ScrollChapter>
        <ScrollChapter id="capitulo-empezar" number="07">
          <FinalCTA />
        </ScrollChapter>
      </main>
      <Footer />
    </div>
  );
}

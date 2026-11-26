import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/cinematic/Marquee";
import Preloader from "@/components/cinematic/Preloader";
import CyberParticles from "@/components/cinematic/CyberParticles";
import CursorSpotlight from "@/components/cinematic/CursorSpotlight";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const Index = () => {
  useSmoothScroll();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Preloader />
      <CyberParticles />
      <CursorSpotlight />
      <div className="film-grain" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Certifications />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProjectGallery } from "../components/ProjectGallery";
import { Hero } from "../components/Hero";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProjectGallery />
      </main>
      <Footer />
    </>
  );
}

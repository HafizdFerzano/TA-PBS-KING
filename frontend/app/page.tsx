// app/page.tsx
import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import LearnSection from "./components/LearnSection";
import ScanSection from "./components/ScanSection";
import QuizSection from "./components/QuizSection";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-20">
        <HomeSection />
        <LearnSection />
        <ScanSection />
        <QuizSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}

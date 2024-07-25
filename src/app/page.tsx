import HeroSearchBox from "@/components/home/HeroSearchBox";
import HeroSection from "@/components/home/HeroSection";
import HomeSection1 from "@/components/home/HomeSection1";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HeroSearchBox />
      <HomeSection1 />
      {/* <HomeSection2 />
      <HomeSection3 />
      <HomeSection4 />
      <Footer /> */}
    </main>
  );
}

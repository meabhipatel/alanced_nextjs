// import HeroSearchBox from "@/components/home/HeroSearchBox";
import HeroSection from "@/components/home/HeroSection";
import HomeSection1 from "@/components/home/HomeSection1";
import HomeSection2 from "@/components/home/HomeSection2";
import HomeSection3 from "@/components/home/HomeSection3";

export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* <HeroSearchBox /> */}
      <HomeSection1 />
      <HomeSection2 />
      <HomeSection3 />
    </main>
  );
}

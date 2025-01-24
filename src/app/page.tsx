import { Footer } from "@/components/Footer/Footer";
import { EmailSection } from "@/components/Landing/EmailSection";
import { FeaturesSection } from "@/components/Landing/FeaturesSection";
import { Header } from "@/components/Landing/Header";
import { HeroSection } from "@/components/Landing/HeroSection";
import { LandingContainer } from "@/components/Landing/LandingContainer";
import { Suspense } from "react";

export default function Page() {
  return (
    <LandingContainer>
      <Header
        // links={[
        //   {
        //     link: "/about",
        //     label: "Home",
        //   },
        //   {
        //     link: "/learn",
        //     label: "Features",
        //   },
        //   {
        //     link: "/pricing",
        //     label: "Pricing",
        //   },
        // ]}
        links={[]}
      />
      <HeroSection />
      <FeaturesSection
        title="Features"
        description="We provision wallets to segregate your funds to different accounts."
      />
      <Suspense fallback={<p>Loading...</p>}>
        <EmailSection />
      </Suspense>
      <Footer />
    </LandingContainer>
  );
}

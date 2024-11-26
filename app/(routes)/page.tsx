import { FeaturesSectionDemo } from "@/components/features";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import SubscriptionPlans from "@/components/subscription-plans";
import Testimonials from "@/components/testimonial";

import TrustedSection from "@/components/trusted";
import { LogoutButton } from "@/components/ui/logout-button";

export default async function Home() {
  return (
    <section>
      <LogoutButton>Logout</LogoutButton>
      <HeroSection />
      <FeaturesSectionDemo />
      <TrustedSection />
      <SubscriptionPlans />
      <Testimonials />
      <Footer />
    </section>
  );
}

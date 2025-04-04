import { FeaturesSection } from '@/features/homepage/features-section';
import { HeroSection } from '@/features/homepage/hero-section';
import { LatestArrivals } from '@/features/homepage/latest-arrivals';
import { OurBrandsSection } from '@/features/homepage/our-brands-section';
import type { PageProps } from '@/config/types';

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full min-h-screen bg-background">
      <HeroSection searchParams={searchParams} />
      <FeaturesSection />
      <LatestArrivals />
      <OurBrandsSection />
    </div>
  );
}

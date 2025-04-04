import {
  FeaturesSection,
  HeroSection,
  LatestArrivals,
  OurBrandsSection,
} from '@/features/homepage/components';

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

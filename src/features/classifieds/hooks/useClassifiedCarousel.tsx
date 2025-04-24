'use client';

import { useCallback, useState } from 'react';

import { imgixLoader } from '@/lib/imgix-loader';

import type { Image as PrismaImage } from '@prisma/client';
import type { Swiper as SwiperType } from 'swiper/types';

export const useClassifiedCarousel = (images: PrismaImage[]) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const setSwiper = useCallback((swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  const handleImageClick = useCallback(() => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: activeIndex,
    });
  }, [lightboxController.toggler, activeIndex]);

  const sources = images.map((image) => imgixLoader({ src: image.src, width: 2400, quality: 100 }));

  return {
    thumbsSwiper,
    activeIndex,
    lightboxController,
    setSwiper,
    handleSlideChange,
    handleImageClick,
    sources,
  };
};

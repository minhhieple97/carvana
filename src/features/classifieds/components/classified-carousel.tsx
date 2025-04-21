'use client';

import { imgixLoader } from '@/lib/imgix-loader';

import FsLightbox from 'fslightbox-react';
import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/virtual';
import { EffectFade, Navigation, Thumbs, Virtual } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { SwiperButtons } from '@/components/shared/swiper-button';
import { ImgixImage } from '@/components/ui/imgix-image';

import { CarouselSkeleton } from './carousel-skeleton';

import type { Image as PrismaImage } from '@prisma/client';
import type { Swiper as SwiperType } from 'swiper/types';
import { cn } from '@/lib/utils';

type ClassifiedCarouselProps = {
  images: PrismaImage[];
};

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <CarouselSkeleton />,
});

const SwiperThumb = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => null,
});

export const ClassifiedCarousel = ({ images }: ClassifiedCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const setSwiper = (swiper: SwiperType) => {
    setThumbsSwiper(swiper);
  };

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

  return (
    <>
      <FsLightbox
        toggler={lightboxController.toggler}
        sourceIndex={lightboxController.sourceIndex}
        sources={sources}
        type="image"
      />
      <div className="relative group">
        <Swiper
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          effect="fade"
          spaceBetween={10}
          fadeEffect={{ crossFade: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[EffectFade, Navigation, Thumbs, Virtual]}
          virtual={{
            addSlidesAfter: 8,
            enabled: true,
          }}
          className="aspect-3/2"
          onSlideChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.id} virtualIndex={index}>
              <ImgixImage
                blurDataURL={image.blurhash}
                placeholder="blur"
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                quality={45}
                className="aspect-3/2 object-cover rounded-md cursor-pointer w-full"
                onClick={handleImageClick}
              />
            </SwiperSlide>
          ))}
          <SwiperButtons
            prevClassName="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-background/70 hover:bg-background/90 text-foreground rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            nextClassName="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-background/70 hover:bg-background/90 text-foreground rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Swiper>
      </div>
      <SwiperThumb
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[Navigation, Thumbs, EffectFade]}
        className="mt-2"
      >
        {images.map((image, index) => (
          <SwiperSlide
            className={cn(
              'relative h-fit w-full cursor-grab transition-opacity duration-200',
              activeIndex !== index && 'opacity-60 hover:opacity-80'
            )}
            key={image.id}
          >
            <ImgixImage
              className="object-cover aspect-3/2 rounded-md"
              width={150}
              height={100}
              src={image.src}
              alt={image.alt}
              quality={1}
              placeholder="blur"
              blurDataURL={image.blurhash}
            />
          </SwiperSlide>
        ))}
      </SwiperThumb>
    </>
  );
};

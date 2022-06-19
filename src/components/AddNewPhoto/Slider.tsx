import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Navigation } from "swiper";
import { PhotoInterface } from "./AddNewPhoto";

interface SliderProps {
  photos: PhotoInterface[] | null;
}

const Slider: FC<SliderProps> = ({ photos }) => {
  return (
    <>
      {photos && (
        <Swiper
          spaceBetween={10}
          navigation={photos.length > 1}
          modules={[FreeMode, Navigation]}
          loop={true}
          className="mySwiper2"
        >
          {photos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <img src={photo.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  );
};

export default Slider;

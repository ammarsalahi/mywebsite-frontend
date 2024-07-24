import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { showImage } from '../api/Index'

interface imgprops{
  imgs:any
}
 export default function SwipperImage(props:imgprops){
  return (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
    {props.imgs?.map((item:any,idx:number)=>(
         <SwiperSlide key={idx}>
          <img src={showImage(item.img)} width={'100%'}/>
          </SwiperSlide>
      ))}

    </Swiper>
  );
};


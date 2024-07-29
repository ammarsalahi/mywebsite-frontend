import { showImage } from '../api/Index'
import { Carousel } from 'antd';
import React,{useState} from 'react'
import { AiOutlineLeftCircle,AiOutlineRightCircle } from "react-icons/ai";
import { FaCircleChevronLeft ,FaCircleChevronRight} from "react-icons/fa6";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";
interface CarouselProps {
  children: React.ReactNode[];
  interval?: number;
}
 export default function ImageCarousel({ children, interval = 5000 }){

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % children.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + children.length) % children.length);
  };

  const handlePause = () => {
    setPaused(!paused);
  };

  return (
    <div className="carousel" dir="ltr">
      <div className="carousel-inner">
        {children.map((child:any, index:number) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            {child}
          </div>
        ))}
      </div>
      <div className="carousel-controls flex justify-between">
        <button className="carousel-prev" onClick={handlePrev}>
         <FaChevronLeft fontSize={30}/>
        </button>
        <span className="carousel-slide-number">
          {currentIndex + 1} / {children.length}
        </span>
        <button className="carousel-next" onClick={handleNext}>
        <FaChevronRight fontSize={30}/>
        </button>
     
      </div>
    </div>
  );
};



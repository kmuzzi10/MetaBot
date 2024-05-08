import React from "react";
import Slider from "react-slick";
import slider1 from "../assets/HomePagePics/servicesImages/slider1.jpg"
import slider2 from "../assets/HomePagePics/servicesImages/slider2.jpg"
import slider3 from "../assets/HomePagePics/servicesImages/slider3.jpg"
import slider4 from "../assets/HomePagePics/servicesImages/slider4.jpg"
import slider5 from "../assets/HomePagePics/servicesImages/slider5.jpg"
function CenterModeSliderService() {

var imageArray = [
    slider1,slider2,slider3,slider4,slider5
]

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        
        {
            imageArray.map(i=>{
                return(
                    <div>
                    <img width={'100%'} height={'100%'} src={i} alt='sliderImage' />
                    </div>
                )
            })
        }
        
      </Slider>
    </div>
  );
}

export default CenterModeSliderService;

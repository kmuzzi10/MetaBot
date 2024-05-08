import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reactLogo from "../assets/HomePagePics/tech/react.png"
import angularLogo from "../assets/HomePagePics/tech/ang.png"
import azLogo from "../assets/HomePagePics/tech/az.png"
import dartLogo from "../assets/HomePagePics/tech/dart.png"
import firebaseLogo from "../assets/HomePagePics/tech/firebase.png"
import gitLogo from "../assets/HomePagePics/tech/git.png"
import graphLogo from "../assets/HomePagePics/tech/graph.png"
import jsLogo from "../assets/HomePagePics/tech/js.png"
import awsLogo from "../assets/HomePagePics/tech/aws.png"
import mgdbLogo from "../assets/HomePagePics/tech/mgdb.png"
import nodeLogo from "../assets/HomePagePics/tech/node.png"
import psqlLogo from "../assets/HomePagePics/tech/psql.png"
import pyLogo from "../assets/HomePagePics/tech/py.png"
import redisLogo from "../assets/HomePagePics/tech/redis.png"
import sqlLogo from "../assets/HomePagePics/tech/sql.png"
import tsLogo from "../assets/HomePagePics/tech/ts.png"
import vueLogo from "../assets/HomePagePics/tech/vue.png"
import wordpressLogo from "../assets/HomePagePics/tech/wordpress.png"


let picArray = [
  reactLogo, angularLogo, dartLogo, firebaseLogo, gitLogo, graphLogo, jsLogo, awsLogo, azLogo, mgdbLogo, nodeLogo, psqlLogo, pyLogo, redisLogo, sqlLogo, tsLogo, vueLogo, wordpressLogo
]

function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1500,
    cssEase: "linear"
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {picArray.map(i => {
          return (
            <div>
              <img height={'100px'} width={'100px'} src={i} className="" alt="logo" />
            </div>
          )

        })}
      </Slider>
    </div>
  );
}

export default AutoPlay;

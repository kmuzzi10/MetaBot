import React, { useEffect, useRef } from 'react';
import "../css/swingerTwo.css";

const SwingerTwo = () => {
  const counterRefs = useRef([]);

  useEffect(() => {
    const updateCounter = (counter, targetValue, duration) => {
      let currentValue = 0;
      const increment = targetValue / duration;

      const update = () => {
        if (currentValue < targetValue) {
          currentValue += increment;
          counter.innerText = Math.ceil(currentValue);
          requestAnimationFrame(update);
        } else {
          counter.innerText = targetValue;
        }
      };

      update();
    };

    counterRefs.current.forEach(counter => {
      const targetValue = parseInt(counter.dataset.to, 10);
      const speed = parseInt(counter.dataset.speed, 10) || 2000;
      const duration = speed / targetValue * 800;

      updateCounter(counter, targetValue, duration);
    });
  }, []);

  return (
    <section className="wow fadeIn animated" style={{ visibility: "visible", animationName: "fadeIn" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="300ms" style={{ visibility: "visible", animationDuration: "300ms", animationName: "fadeInUp" }}>
          <i class="fa-solid fa-calendar-days medium-icon"></i>
            <span ref={ref => counterRefs.current[0] = ref} className="timer counter alt-font appear" data-to="980" data-speed="7000">2800</span>
            <span className="counter-title">Timely Operations</span>
          </div>
          <div className="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="600ms" style={{ visibility: "visible", animationDuration: "600ms", animationName: "fadeInUp" }}>
            <i className="fa fa-heart medium-icon"></i>
            <span ref={ref => counterRefs.current[1] = ref} className="timer counter alt-font appear" data-to="980" data-speed="7000">980</span>
            <span className="counter-title">Happy Clients</span>
          </div>
          <div className="col-md-3 col-sm-6 bottom-margin-small text-center counter-section wow fadeInUp xs-margin-bottom-ten animated" data-wow-duration="900ms" style={{ visibility: "visible", animationDuration: "900ms", animationName: "fadeInUp" }}>
          <i class="fa-solid fa-briefcase medium-icon" />
            <span ref={ref => counterRefs.current[2] = ref} className="timer counter alt-font appear" data-to="810" data-speed="7000">810</span>
            <span className="counter-title">Projects Completed</span>
          </div>
          <div className="col-md-3 col-sm-6 text-center counter-section wow fadeInUp animated" data-wow-duration="1200ms" style={{ visibility: "visible", animationDuration: "1200ms", animationName: "fadeInUp" }}>
            <i className="fa fa-user medium-icon"></i>
            <span ref={ref => counterRefs.current[3] = ref} className="timer counter alt-font appear" data-to="600" data-speed="7000">600</span>
            <span className="counter-title">Social Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SwingerTwo;

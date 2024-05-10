import React, { useEffect } from 'react';
import '../css/swinger.css'; // Import your CSS file
import { Link } from "react-router-dom"

const Swinger = () => {
    useEffect(() => {
        const animateCounter = (element, end, duration) => {
            let start = 0;
            const step = () => {
                start += (end - start) / duration;
                element.textContent = Math.ceil(start);
                if (start < end) {
                    requestAnimationFrame(step);
                }
            };
            step();
        };

        const counters = document.querySelectorAll('.number');
        counters.forEach(counter => {
            const end = parseInt(counter.textContent);
            animateCounter(counter, end, 2000); // Adjust duration as needed
        });
    }, []); // Run only once after component mount

    return (
        <div>
            <div>
                <div className="sectiontitle">
                    <h1  className='project-heading'>PROJECTS STATISTICS</h1>

                </div>
                <div id="projectFacts" className="sectionClass">
                    <div className="fullWidth eight columns">
                        <div className="projectFactsWrap ">
                            <div className="item wow fadeInUpBig animated animated" data-number={12} style={{ visibility: 'visible' }}>
                                <i className="fa fa-briefcase" />
                                <p id="number1" className="number">12</p>
                                <span />
                                <p>Projects done</p>
                            </div>
                            <div className="item wow fadeInUpBig animated animated" data-number={359} style={{ visibility: 'visible' }}>
                                <i class="fa-regular fa-circle-check" />
                                <p id="number3" className="number">359</p>
                                <span />
                                <p>Project Success</p>
                            </div> 
                            <div className="item wow fadeInUpBig animated animated" data-number={55} style={{ visibility: 'visible' }}>
                                <i class="fa-solid fa-person" />
                                <p id="number2" className="number">55</p>
                                <span />
                                <p>Happy clients</p>
                            </div>
                            <div className="item wow fadeInUpBig animated animated" data-number={246} style={{ visibility: 'visible' }}>
                                <i class="fa-regular fa-face-smile-wink" />
                                <p id="number4" className="number">246</p>
                                <span />
                                <p>Happy Stake Holders</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Swinger;

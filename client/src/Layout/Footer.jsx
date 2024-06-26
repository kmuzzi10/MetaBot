import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import metabot from "../assets/HomePagePics/logos/F-removebg-preview.png";
const Footer = () => {
  var date = new Date()
  var year = date.getFullYear()
  return (
    <div className='footerBody'>

      <footer className=" text-center text-white">
        <div className="container p-4">
          <section className="mb-4">
            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} to='https://m.facebook.com/METABOTSolutions/' role="button"><i className="fab fa-facebook-f" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} to='https://twitter.com/metabotsol'
              role="button"><i className="fab fa-twitter" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} to='https://www.instagram.com/metabot_sols?igsh=MTducnhzMmQ0bmFzdw==' role="button"><i className="fab fa-instagram" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} to='https://www.linkedin.com/company/metabot-solutions/' role="button"><i className="fab fa-linkedin-in" /></Link>
          </section>
          <section className="mb-1">
            <p style={{fontSize:'1rem',paddingTop:'20px'}}>
            Metabot: 🌟 Innovating with Excellence! Crafting software solutions that redefine industry standards. 💻 Join us in shaping the future! 🚀
            </p>
            <p style={{fontSize:'1rem',paddingTop:'20px'}}>
              EMAIL : info@metabotsolutions.com || PHONE : +923362529622
            </p>
          </section>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',fontSize:'1.2rem' }}>
          © Copyright {year} <img width={'150px'} height={'150px'} src={metabot} alt='metabot' />
          
        </div>
      </footer>
    </div>


  )
}

export default Footer
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
            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#3b5998' }} to='https://www.facebook.com/people/MetaBot/61559489362619/?is_tour_dismissed' role="button"><i className="fab fa-facebook-f" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#55acee' }} to=''
              role="button"><i className="fab fa-twitter" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} to='' role="button"><i className="fab fa-instagram" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#0082ca' }} to='https://www.linkedin.com/in/meta-bot-bb7b4a307/' role="button"><i className="fab fa-linkedin-in" /></Link>

            <Link className="btn btn-primary btn-floating m-1" style={{ backgroundColor: '#333333' }} to='' role="button"><i className="fab fa-github" /></Link>
          </section>
          <section className="mb-1">
            <p style={{fontSize:'1rem',paddingTop:'20px'}}>
            Metabot: 🌟 Innovating with Excellence! Crafting software solutions that redefine industry standards. 💻 Join us in shaping the future! 🚀
            </p>
            <p style={{fontSize:'1rem',paddingTop:'20px'}}>
              EMAIL : metabot.solutions@gmail.com || PHONE : +923325098238
            </p>
          </section>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',fontSize:'1.2rem' }}>
          © {year} <img width={'150px'} height={'150px'} src={metabot} alt='metabot' />
          
        </div>
      </footer>
    </div>


  )
}

export default Footer
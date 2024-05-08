import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'


const Layout = (props) => {
    return (
        <div>
            <main style={{ backgroundColor: 'black', color: 'white' }}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name='description' content={props.description} />
                    <meta name='keywords' content={props.keywords} />
                    <meta name='author' content={props.author} />
                    <title>{props.title}</title>
                </Helmet>
                <Header />


                {props.children}
                <Footer />
            </main>
        </div>
    )
}

Layout.defaultProps = {
    title: 'Sofware House',
    description: 'MERN Stack Project',
    keywords: 'react node mongodb express',
    author: 'Muzammil Ahmed Khan'
}

export default Layout
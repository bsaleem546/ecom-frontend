import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Navbar/>
            <Hero/>
            <Footer/>
        </div>
    )
}

export default Home
import React from 'react'
import landscape from '../img/landscape.jpg'
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <section className='home'>
        <Link className="feed" to={"/"}>
        <h1 className='welcome'>welcome to <span className='artists-prompts'>prompt land</span></h1>
        <h3 className='home-desc'>a place to write and share artist prompts</h3>
        <img
        src={landscape}
        alt="prompt land landscape"
        className='home-img'
        />
        </Link>
        </section>
    )
}

export default Home
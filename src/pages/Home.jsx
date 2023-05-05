import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate('/pokedex')
    }

  return (
    <section className=''>
        {/* Parte superior */}
        <section className="min-h-screen grid grid-rows-[1fr_auto] App  place-content-center  bg-[url('/public/images/pokemonImage.jpg')] bg-cover bg-center  bg-fixed  px-2">
            
            <article className="sm:max-w-[900px] ">
                <div>
                    <img src="/public/images/pokedex.png" alt="" />
                    
                </div>
                <div className='bg-black/40 rounded-lg '>
                <h2 className="font-['Akshar'] text-4xl font-bold text-white text-center mt-20 ">¡Hi Trainer!</h2>
                <p className="font-['Akshar'] text-2xl font-bold text-white text-center mt-4">Let start, give me your name</p>
                </div>
                <form className='grid sm:px-20' onSubmit={handleSubmit}>
                    <input className="mt-10 p-4 font-['Akshar'] outline-none opacity-80 rounded-lg shadow-lg shadow-red-500 px-6" id='nameTrainer' type="text" placeholder='Your name...' />
                    <button className="mt-8 bg-red-600/80 mx-auto p-3 rounded-lg text-white font-['Akshar'] transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 hover:bg-black mb-10">Lets beginning</button>
                </form>
            </article>
        </section>

        {/* footer */}
        <Footer />
    </section>
  )
}

export default Home
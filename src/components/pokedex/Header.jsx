import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";

const Header = () => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setNameTrainer(""));
  }

  return (
    <section className="flex-wrap ">
        <div className="relative ">
            <img className="absolute top-0 w-[180px] left-1/3 sm:w-[400px] sm:h-auto lg:w-[620px] lg:ml-20 " src="/images/pokedex.png" alt="" />
            <img className="absolute w-[100px] animate-bounce sm:left-20 sm:top-6 sm:w-[120px] lg:w-[160px] lg:ml-16 lg:mt-5 " src="/images/poke.png" alt="" />
           
            <i onClick={logout} className='bx bxs-log-out absolute left-80 text-3xl py-5 mr-6 text-gray-300 cursor-pointer transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 sm:text-5xl sm:left-4 sm:mt-4 lg:mt-14'></i>
          
        </div>
        <div>
      <svg
        className="bg-black sm:bg-fixed sm:h-auto "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#F11611"
          fill-opacity="1"
          d="M0,224L48,202.7C96,181,192,139,288,133.3C384,128,480,160,576,192C672,224,768,256,864,266.7C960,277,1056,267,1152,240C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      </div>
    </section>
  );
};

export default Header;

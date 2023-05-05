import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
    grass: 'border-green-300',
    fire: 'border-orange-500',
    poison: 'border-green-800',
    bug: 'border-amber-800',
    flying: 'border-cyan-300',
    water: 'border-blue-300',
    normal: 'border-yellow-400',
    fighter: 'border-red-400',
    fighting: 'border-violet-600',
    ground: 'border-emerald-400',
    rock: 'border-gray-600',
    ghost: 'border-pink-900',
    steel: 'border-lime-300',
    electric: 'border-blue-800',
    psychic: 'border-fuchsia-300',
    ice: 'border-sky-200',
    dragon: 'border-red-700',
    dark: 'border-black',
    fairy: 'border-pink-200',
    unknow: 'border-black',
    
}

const backgraundByType = {
    grass: 'from-green-300 to-white',
    fire: 'from-orange-500 to-white',
    poison: 'from-green-800 to-white',
    bug: 'from-amber-800 to-white',
    flying: 'from-cyan-300 to-white',
    water: 'from-blue-300 to-white',
    normal: 'from-yellow-400 to-white',
    fighter: 'from-red-800 to-white',
    fighting: 'from-violet-600 to-white',
    ground: 'from-emerald-400 to-white',
    rock: 'from-gray-600 to-white',
    ghost: 'from-pink-900 to-white',
    steel: 'from-lime-300 to-white',
    electric: 'from-blue-800 to-white',
    psychic: 'from-fuchsia-300 to-white',
    ice: 'from-sky-200 to-white',
    dragon: 'from-red-700 to-white',
    dark: 'from-black to-white',
    fairy: 'from-pink-200 to-white',
    unknow: 'from-black to-white',
} 

const shadowByType = {
    grass: 'shadow-lg shadow-green-500/50',
    fire: 'shadow-lg shadow-orange-500/70',
    poison: 'shadow-lg shadow-green-700/80',
    bug: 'shadow-lg shadow-amber-800',
    flying: 'shadow-lg shadow-cyan-500/70',
    water: 'shadow-lg shadow-blue-500/70',
    normal: 'shadow-lg shadow-yellow-500/70',
    fighter: 'shadow-lg shadow-red-500/70',
    fighting: 'shadow-lg shadow-violet-600',
    ground: 'shadow-lg shadow-emerald-400',
    rock: 'shadow-lg shadow-gray-600',
    ghost: 'shadow-lg shadow-pink-600',
    steel: 'shadow-lg shadow-lime-500',
    electric: 'shadow-lg shadow-blue-700',
    psychic: 'shadow-lg shadow-fuchsia-500',
    ice: 'shadow-lg shadow-sky-300',
    dragon: 'shadow-lg shadow-red-700',
    dark: 'shadow-lg shadow-black/50',
    fairy: 'shadow-lg shadow-pink-200',
    unknow: 'shadow-lg shadow-black',
}

const textByType = {
    grass: 'text-green-300',
    fire: 'text-orange-500',
    poison: 'text-green-800',
    bug: 'text-amber-800',
    flying: 'text-cyan-300',
    water: 'text-blue-300',
    normal: 'text-yellow-400',
    fighter: 'text-red-400',
    fighting: 'text-violet-600',
    ground: 'text-emerald-400',
    rock: 'text-gray-400',
    ghost: 'text-pink-700',
    steel: 'text-lime-300',
    electric: 'text-blue-700',
    psychic: 'text-fuchsia-300',
    ice: 'text-sky-300',
    dragon: 'text-red-600',
    dark: 'text-black',
    fairy: 'text-pink-200',
    unknow: 'text-black',
}

const PokemonCard = ({ pokemonUrl }) => {

    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ")

  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-xl shadow-lg  ${shadowByType[pokemon?.types[0].type.name]} transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none ${bordersByType[pokemon?.types[0].type.name]}`}>
        {/* Seccion superior */}
        <section className={`bg-gradient-to-b ${backgraundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
            <div className='absolute -bottom-14 w-[200px] left-1/2 -translate-x-1/2 '>
                <img className="text-or" src={pokemon?.sprites.other.home.front_default} alt="" />
            </div>
        </section>

        {/* Seccion Inferior */}
        <section>
            <h3 className={`mt-16 App font-['Akshar'] font-bold text-3xl ${textByType[pokemon?.types[0].type.name]} `}>{pokemon?.name} </h3>
            <h4 className="font-['Akshar'] font-medium ">{types} </h4>
            <span className={"font-['Akshar'] font-extralight text-xm "}>Type</span>

            <hr className="mb-2 mt-2 "/>

            <section className="grid grid-cols-3 gap-2 p-2 font-['Akshar']">
                {
                    pokemon?.stats.map(stat => (
                        <div key={stat.stat.name}>
                            <h5 className="font-extralight text-xm">{stat.stat.name} </h5>
                            <span className={`font-bold ${textByType[pokemon?.types[0].type.name]}`}>{stat.base_stat} </span>
                        </div>
                    ))
                }
            </section>
        </section>
    </Link>
  );
};

export default PokemonCard;

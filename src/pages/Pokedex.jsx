import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/pokedex/Header";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  //?Array de pokemons antes de filtrar
  const [pokemons, setPokemons] = useState([]);

  //? String para filtrar los pokemones por nombres
  const [pokemonName, setPokemonName] = useState("");

  //?Arreglo de tipos de pokemones posibles
  const [types, setTypes] = useState([]);

  //? String del tipo de pokemon actual, cambia de acuerdo al select
  const [currentType, setCurrentType] = useState("");

  //? pagina actual
  const [currentPage, setCurrentPage] = useState(1);
  
  const input = useRef(null)

  //? Estado global donde se almacena el nombre del usuario
  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const pagination = () => {
    //Cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12

    //pokemons que se mostraran en la pagina actual
    const sliceStart = (currentPage -1)* POKEMONS_PER_PAGE
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE

    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

    //ultima pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

    //bloque actual
    const PAGES_PER_BLOCK = 3
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

    //paginas que se muestran en el bloque actual
    const pagesInBlock = []
    const minPage = (actualBlock - 1)* PAGES_PER_BLOCK + 1
    const maxPage = actualBlock * PAGES_PER_BLOCK
    for(let i = minPage; i <= maxPage; i++){
      if(i <= lastPage){
        pagesInBlock.push(i)
      }
    }

    return {pokemonInPage, lastPage, pagesInBlock}
  }

  const {lastPage, pagesInBlock, pokemonInPage} = pagination()

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1 
    if(newCurrentPage >= 1){
      setCurrentPage(newCurrentPage)
    }
  }

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1 
    if(newCurrentPage <= lastPage){
      setCurrentPage(newCurrentPage)
    }
  }
  
  useEffect(() => {
    if(!currentType){
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";

    axios
      .get(URL)
      .then((res) => setPokemons(res.data.results))
      .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(currentType){
    const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;

    axios
      .get(URL)
      .then((res) => {
        const pokemonByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
        setPokemons(pokemonByType)
      })
      .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  },[pokemonName, currentType]);

  useEffect(() => {
    setPokemonName("") 
    input.current.value = ""
  }, [currentType]);
  

  return (
    <section className="min-h-screen  ">
      <Header />

      {/* Seccion de filtros y saludos */}
      <section className="py-6 px-4 ">
        <h3 className="text-red-600 font-['Akshar'] text-2xl text-center">
          Welcome {nameTrainer},{" "}
          <span className="text-black">
            here you can find your favorite pokemon
          </span>
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="text-center mt-5 mb-5">
            <input ref={input}
              id="pokemonName"
              className="outline-none border-2 border-red-600/40 rounded-lg p-1 mr-3 font-['Akshar'] "
              type="text"
              placeholder="search your pokemon..."
            />
            <button className="bg-gradient-to-r from-red-500 via-red-700 p-2 rounded-lg text-white border-2 border-white hover:bg-black shadow-lg shadow-red-500/50 font-['Akshar'] hover:animate-bounce ">
              Search
            </button>
          </div>

          <div className="text-center "> 
          <select className="bg-gradient-to-r from-red-500 via-red-700 p-2 rounded-lg text-white border-2 border-white hover:bg-black shadow-lg shadow-red-500/50 font-['Akshar'] hover:animate-bounce " onChange={(e) => setCurrentType(e.target.value)}>
            <option value="">All</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}{" "}
              </option>
            ))}
          </select>
          </div>
        </form>
      </section>

      {/* paginacion */}

      <ul className="flex gap-2 justify-center mb-10 px-2 flex-wrap">

        {/* primera pagina */}
        <li onClick={() => setCurrentPage(1)} className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer"><i className='bx bx-first-page' ></i></li>

        {/* pagina anterior */}
        <li onClick={handleClickPreviusPage} className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer"><i className='bx bxs-left-arrow'></i></li>

        {/* lista de paginas */}
        {
          pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer ${numberPage === currentPage && 'bg-gray-600'}`} key={numberPage}>{numberPage} </li>)
        }

        {/* pagina siguiente */}
        <li onClick={handleClickNextPage} className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer "><i className='bx bxs-right-arrow'></i> </li>

        {/* ultima pagina */}  
        <li onClick={() => setCurrentPage(lastPage)} className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer "><i className='bx bx-last-page'></i> </li>
      </ul>

      {/* Seccion lista de pokemons */}
      <section className="px-2 grid gap-6 grid-cols-[340px] place-content-center mb-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:p-2 sm:w-[640px] sm:mx-auto lg:grid-cols-3 lg:w-[1024px] ">
        {pokemonInPage.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;

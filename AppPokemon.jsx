import React, { useState, useEffect } from 'react';
import './App.css';

const AppPokemon = () => {
  // Definiendo el estado inicial del componente.
  const [pokemonId, setPokemonId] = useState(1); // ID del Pokémon a buscar al cargar la aplicación.
  const [pokemonInfo, setPokemonInfo] = useState(''); // Información detallada del Pokémon.
  const [search, setSearch] = useState(''); // Término de búsqueda ingresado por el usuario.
  const [imageUrl, setImageUrl] = useState(''); // URL de la imagen del Pokémon.
  const [theeFirst, setTheeFirst] = useState(''); // Las primeras tres palabras de la información del Pokémon.
  const [lastWords, setLastWords] = useState(''); // Las últimas tres palabras de la información del Pokémon.

  // Función para obtener información de un Pokémon específico por su ID o nombre.
  const fetchPokemon = (idOrName) => {
    // Realizando la solicitud HTTP a la API de Pokémon.
    fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
      .then((res) => res.json()) // Parseando la respuesta en formato JSON.
      .then((data) => {
        // Extrayendo y formateando los datos relevantes de la respuesta.
        const { name, abilities } = data;
        const info = `Name: ${name}, Abilities: ${abilities.map(ability => ability.ability.name).join(', ')}`;
        setPokemonInfo(info); // Actualizando el estado con la información del Pokémon.

        // Procesando la información para obtener las primeras y últimas tres palabras.
        const words = info.split(' ');
        const threeFirstWords = words.slice(0, 3).join(' ');
        setTheeFirst(threeFirstWords);
        const lastThreeWords = words.slice(-3).join(' ');
        setLastWords(lastThreeWords);

        // Actualizando el estado con la URL de la imagen del Pokémon.
        setImageUrl(data.sprites.front_default);
      })
      .catch((error) => {
        // Manejando cualquier error que pueda ocurrir durante la solicitud.
        console.error('Error fetching data:', error);
      });
  };

  // useEffect para realizar la solicitud inicial a la API cuando el componente se monta.
  useEffect(() => {
    fetchPokemon(pokemonId); // Buscando el Pokémon inicial por ID.
  }, [pokemonId]); // Este efecto se ejecuta cada vez que el valor de 'pokemonId' cambia.

  // Manejador para actualizar el 'pokemonId' y así mostrar el próximo Pokémon.
  const handleNextPokemon = () => {
    setPokemonId(pokemonId + 1); // Incrementando el ID del Pokémon en uno.
  };

  // Manejador para los cambios en el campo de búsqueda.
  const handleSearchChange = (event) => {
    setSearch(event.target.value); // Actualizando el término de búsqueda con el valor ingresado por el usuario.
  };

  // Manejador para realizar la búsqueda cuando el usuario hace clic en el botón de búsqueda.
  const handleSearchSubmit = () => {
    fetchPokemon(search.toLowerCase()); // Realizando la búsqueda con el término ingresado (en minúsculas).
  };

  // Renderizando la interfaz de usuario del componente.
  return (
    <main>
      <h1>Pokémon API</h1>
      <section>
        <div className='search-container'>
          {/* Campo de entrada para el término de búsqueda del usuario. */}
          <input 
            type='text'
            value={search}
            onChange={handleSearchChange}
            placeholder='Enter Pokémon name'
          />
          {/* Botón que activa la función de búsqueda. */}
          <button onClick={handleSearchSubmit}>Search Pokémon</button>
        </div>
        <div className='text-container'>
          {/* Mostrando la información del Pokémon y las primeras y últimas palabras. */}
          {pokemonInfo && <p className="centered-fact">{pokemonInfo}</p>}
          <p><b>The first three words are:</b> {theeFirst}</p>
          <p><b>The last three words are:</b> {lastWords}</p>
        </div>
        {/* Mostrando la imagen del Pokémon. */}
        {imageUrl && <img src={imageUrl} alt={`Image of ${pokemonInfo}`} />}
        {/* Botón para cargar la información del próximo Pokémon. */}
        <button onClick={handleNextPokemon}>Next Pokémon</button>
      </section>
    </main>
  );
};

export default AppPokemon;

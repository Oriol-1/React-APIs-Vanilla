import React, { useState } from 'react'; 
import useCatImage from "../hooks/userCatImage";

export function Otro () {
  const phrases = ['Gatos son lindos', 'Me encantan los gatos', 'Gatitos adorables', 'Felinos maravillosos', 'Gatos yyyyy más gatos'];
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const [phrase, setPhrase] = useState(randomPhrase);
  const { imageUrl } = useCatImage(phrase);
  
  const handleChangeImage = () => {
    const newRandomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(newRandomPhrase);
  };

  return (
    <>
      <button onClick={handleChangeImage}>Cambiar Imagen Aleatoriamente</button>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
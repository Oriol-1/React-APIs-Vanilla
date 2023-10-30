import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const CAT_RANDOM_FACT = 'https://catfact.ninja/fact';

const AppGat = () => {
  const [fact, setFact] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState('');
  const [threeFirst, setThreeFirst] = useState('');
  const [lastWords, setLastWords] = useState('');

  const fetchCatFact = useCallback(() => {
    fetch(CAT_RANDOM_FACT)
      .then((res) => res.json())
      .then((data) => {
       setFact(data.fact);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    fetchCatFact();
  }, [fetchCatFact]);

  useEffect(() => {
    if (!fact) return;
    const words = fact.split(' ');
    const threeFirstWords = words.slice(0, 3).join(' ');
    const lastThreeWords = words.slice(-3).join(' ');
    setThreeFirst(threeFirstWords); 
    setLastWords(lastThreeWords);
      const catImageUrl = `https://cataas.com/cat/says/${(threeFirstWords)}?size=50&color=red`;

      setImageUrl(catImageUrl);
      setImageError('');
    
  }, [fact]);

  const handleImageError = () => {
    setImageError('No se pudo cargar la imagen del gato');
  };

  return (
    <main>
      <h1>Cat API</h1>
      <section>
        <div className='text-container'>
          {fact && <p className="centered-fact">{fact}</p>}
          <p><b>The first three words are:</b> {threeFirst}</p> 
          <p><b>The last three words are:</b> {lastWords}</p>
        </div>
        {imageUrl && 
          <img 
            src={imageUrl} 
            alt="Imagen de un gato con texto relacionado al hecho"
            onError={handleImageError}
          />
        }
        {imageError && <p className="image-error">{imageError}</p>} 
      </section>
      <button onClick={fetchCatFact}>Get a new Cat Fact!</button>  
    </main>
  );
};

export default AppGat;

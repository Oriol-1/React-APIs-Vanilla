import React, { useState } from 'react';
import useCatFact from './hooks/userCatfact';
import useCatImage from './hooks/userCatImage';
import { Otro } from './components/Otro';
import './App.css';

const AppgatFinal = () => {
  const { fact, getCatFact, threeFirst, lastWords } = useCatFact();
  const { imageUrl } = useCatImage(fact);


  return (
    <main className='text-container'>
      <h1>App de gatitos</h1>


      <button onClick={getCatFact}>Get new fact</button>
      

      {fact && <p>{fact}</p>}
      <p><b>The first three words are:</b> {threeFirst}</p> 
      <p><b>The last three words are:</b> {lastWords}</p>
      <section>
      {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words of ${fact}`} />}
    <Otro />
    </section>
    </main>

  );
}

export default AppgatFinal;
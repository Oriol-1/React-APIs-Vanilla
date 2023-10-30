import { useState, useEffect, useCallback } from 'react';
import fetchCatFact from '../services/fact';



const useCatFact = () => {
  const [fact, setFact] = useState('');
  const [threeFirst, setThreeFirst] = useState('');
  const [lastWords, setLastWords] = useState('');

  const getCatFact = useCallback(() => {
    fetchCatFact()
      .then(dataFact => {
        setFact(dataFact);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    getCatFact();
  }, [getCatFact]);

  useEffect(() => {
    if (!fact) return;
    const words = fact.split(' ');
    const threeFirstWords = words.slice(0, 3).join(' ');
    const lastThreeWords = words.slice(-3).join(' ');
    setThreeFirst(threeFirstWords); 
    setLastWords(lastThreeWords);
  }, [fact]);

  return { fact, threeFirst, lastWords, getCatFact };
};

export default useCatFact;

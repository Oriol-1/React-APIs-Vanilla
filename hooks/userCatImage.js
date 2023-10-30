import { useState, useEffect } from 'react';

const useCatImage = (fact) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (!fact) return;
    const words = fact.split(' ');
    const threeFirstWords = words.slice(0, 3).join(' ');
    const catImageUrl = `https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red`;

    setImageUrl(catImageUrl);
    setImageError('');
  }, [fact]);

  const handleImageError = () => {
    setImageError('No se pudo cargar la imagen del gato');
  };

  return { imageUrl, imageError, handleImageError };
};

export default useCatImage;


const CAT_RANDOM_FACT = 'https://catfact.ninja/fact';

const fetchCatFact = async () => {
  try {
      const response = await fetch(CAT_RANDOM_FACT);
      const data = await response.json();
      return data.fact;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
};

export default fetchCatFact;





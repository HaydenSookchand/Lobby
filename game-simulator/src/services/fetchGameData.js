export const fetchGameData = async () => {
    try {
      const response = await fetch('data/data.json');
      const { config, data } = await response.json();
      return { config, data };
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  };
 export const fetchData = async () => {
  try {
      const response = await fetch('http://192.168.56.1:5000/upperwear');

      // Response'un statusunu kontrol et
      if (!response.ok) {
          console.error('HTTP error, status =', response.status);
          return [];
      }

      // JSON'a çevir
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return [];
  }
};

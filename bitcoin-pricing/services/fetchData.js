const fetchBitcoinPrice = () => {
  return fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => response.json())
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}

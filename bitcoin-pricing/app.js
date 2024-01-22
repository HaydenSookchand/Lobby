const updateDOM = (data) => {
  const bitcoinPriceElement = document.getElementById('bitcoinPrice')

  if (data && data.bpi) {
    const timeUpdated = data.time.updated
    const disclaimer = data.disclaimer
    const htmlContent = `
            <p><strong>Time Updated:</strong> ${timeUpdated}</p>
            <p class="disclaimer"><strong>Disclaimer:</strong> ${disclaimer}</p>
            <ul>
                <li><strong>USD:</strong> ${data.bpi.USD.symbol} ${data.bpi.USD.rate}</li>
                <li><strong>GBP:</strong> ${data.bpi.GBP.symbol} ${data.bpi.GBP.rate}</li>
                <li><strong>EUR:</strong> ${data.bpi.EUR.symbol} ${data.bpi.EUR.rate}</li>
            </ul>
        `
    bitcoinPriceElement.innerHTML = htmlContent
  } else {
    bitcoinPriceElement.innerHTML = '<p>Error: Unable to fetch Bitcoin price.</p>'
  }
}

window.onload = function () {
  fetchBitcoinPrice().then((data) => {
    updateDOM(data)
  })
}

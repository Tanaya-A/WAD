function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');
  
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "weather.json", true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const weather = data[city];
  
        if (weather) {
          resultDiv.innerHTML = `
            <strong>Weather in ${city}</strong><br>
            Temperature: ${weather.temperature}<br>
            Humidity: ${weather.humidity}<br>
            Condition: ${weather.condition}
          `;
        } else {
          resultDiv.innerHTML = `City "${city}" not found in the local repository.`;
        }
      } else {
        resultDiv.innerHTML = "Failed to load weather data.";
      }
    };
    xhr.send();
  }
  
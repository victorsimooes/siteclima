document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const apiKey = '73e534ea27f683bf5c3ea8ba3205fffe'; // Sua chave de API da OpenWeather
    const cityInput = document.getElementById('cityInput').value.trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherData = document.getElementById('weatherData');
            weatherData.innerHTML = ""; // Limpa resultados anteriores

            const weatherRow = document.createElement('tr');
            const cityCell = document.createElement('td');
            const tempCell = document.createElement('td');
            const conditionCell = document.createElement('td');

            cityCell.textContent = cityInput;
            tempCell.textContent = data.main.temp + " °C";
            conditionCell.textContent = data.weather[0].description;

            weatherRow.appendChild(cityCell);
            weatherRow.appendChild(tempCell);
            weatherRow.appendChild(conditionCell);

            weatherData.appendChild(weatherRow);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            const weatherData = document.getElementById('weatherData');
            weatherData.innerHTML = ""; // Limpa resultados anteriores

            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.colSpan = 3;
            errorCell.textContent = "Erro ao buscar dados";

            errorRow.appendChild(errorCell);
            weatherData.appendChild(errorRow);
        });
});

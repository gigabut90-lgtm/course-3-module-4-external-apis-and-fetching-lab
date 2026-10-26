
const weatherApi = "https://api.weather.gov/alerts/active?area=";

async function fetchWeatherAlerts(state) {
    const stateInput = document.querySelector("#state-input");
    const alertsDisplay = document.querySelector("#alerts-display");
    const errorMessage = document.querySelector("#error-message");

    alertsDisplay.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    try {
        
        const response = await fetch(`${weatherApi}${state}`);

        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }

        const data = await response.json();

        
        displayAlerts(data);

        stateInput.value = "";

    } catch (error) {
      
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }
}

function displayAlerts(data) {
    const alertsDisplay = document.querySelector("#alerts-display");

  
    const summary = document.createElement("h2");
    summary.textContent = `Weather Alerts: ${data.features.length}`;
    alertsDisplay.appendChild(summary);

    
    data.features.forEach(alert => {
        const paragraph = document.createElement("p");
        paragraph.textContent = alert.properties.headline;
        alertsDisplay.appendChild(paragraph);
    });
}


document.querySelector("#fetch-alerts").addEventListener("click", () => {
    const stateInput = document.querySelector("#state-input");
    const state = stateInput.value.trim();

    if (state) {
        fetchWeatherAlerts(state);
    }
});

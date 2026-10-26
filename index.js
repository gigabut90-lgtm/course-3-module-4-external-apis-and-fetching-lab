// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

async function fetchWeatherAlerts(state) {
    const stateInput = document.querySelector("#state");
    const summary = document.querySelector("#summary");
    const alertList = document.querySelector("#alert-list");
    const errorMessage = document.querySelector("#error-message");

    // Clear previous data before making a new request
    summary.textContent = "";
    alertList.innerHTML = "";
    errorMessage.textContent = "";
    errorMessage.hidden = true;

    try{
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
        if (!response.ok){
            throw new Error(`HTTP ERROR: ${response.status}`)
        }
        const alert = await response.json();
        
        console.log(alert);
        displayAlerts(alert)
        stateInput.value = "";
        

    }catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.hidden = false;
    console.log(error.message);
    }
}
    

    function displayAlerts(data){
        const summary = document.querySelector("#summary");
        const alertList = document.querySelector("#alert-list");

        summary.textContent = `${data.title}: ${data.features.length}`;

        alertList.innerHTML = "";

        data.features.forEach(alert => {
        const li = document.createElement("li");
        li.textContent = alert.properties.headline;
        alertList.append(li);
    });


    }
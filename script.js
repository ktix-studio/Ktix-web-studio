// ========================================
// KTIX LIVE INDIA CLIMATE DASHBOARD - FIXED
// Real data: Open-Meteo APIs
// ========================================

const stateLocations = {
  "AndhraPradesh": [16.5062, 80.6480],
  "ArunachalPradesh": [27.0844, 93.6053],
  "Assam": [26.1445, 91.7362],
  "Bihar": [25.5941, 85.1376],
  "Chhattisgarh": [21.2514, 81.6296],
  "Goa": [15.4909, 73.8278],
  "Gujarat": [23.0225, 72.5714],
  "Haryana": [30.7333, 76.7794],
  "HimachalPradesh": [31.1048, 77.1734],
  "Jharkhand": [23.3441, 85.3096],
  "Karnataka": [12.9716, 77.5946],
  "Kerala": [8.5241, 76.9366],
  "MadhyaPradesh": [23.2599, 77.4126],
  "Maharashtra": [19.0760, 72.8777],
  "Manipur": [24.8170, 93.9368],
  "Meghalaya": [25.5788, 91.8933],
  "Mizoram": [23.7271, 92.7176],
  "Nagaland": [25.6751, 94.1086],
  "Odisha": [20.2961, 85.8245],
  "Punjab": [31.6340, 74.8723],
  "Rajasthan": [26.9124, 75.7873],
  "Sikkim": [27.3389, 88.6065],
  "TamilNadu": [13.0827, 80.2707],
  "Telangana": [17.3850, 78.4867],
  "Tripura": [23.8315, 91.2868],
  "UttarPradesh": [26.8467, 80.9462],
  "Uttarakhand": [30.3165, 78.0322],
  "WestBengal": [22.5726, 88.3639]
};

// GET ELEMENTS
const stateSelect = document.getElementById("stateSelect");
const menu = document.querySelector(".menu") || document.querySelector(".menu-toggle");
const nav = document.querySelector("nav") || document.getElementById("mainNav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
    nav.classList.toggle("mobile-open");
  });
}

const temperatureValue = document.getElementById("temperatureValue");
const co2Value = document.getElementById("co2Value");
const renewableValue = document.getElementById("renewableValue");

async function updateClimateData() {
  if (!stateSelect ||!temperatureValue) return;

  const state = stateSelect.value;
  const location = stateLocations[state];
  if (!location) {
    console.log("Location not found for:", state);
    return;
  }
  const [latitude, longitude] = location;

  temperatureValue.textContent = "Loading...";
  co2Value.textContent = "Loading...";
  renewableValue.textContent = "Loading...";

  try {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,shortwave_radiation&timezone=auto`;
    const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=carbon_dioxide&timezone=auto`;

    const [weatherResponse, airResponse] = await Promise.all([fetch(weatherURL), fetch(airURL)]);

    if (!weatherResponse.ok ||!airResponse.ok) throw new Error("API request failed");

    const weather = await weatherResponse.json();
    const air = await airResponse.json();

    temperatureValue.textContent = `${weather.current.temperature_2m}°C`;
    co2Value.textContent = `${air.current.carbon_dioxide} ppm`;
    renewableValue.textContent = `${Math.round(weather.current.shortwave_radiation)} W/m²`;

    const dataNotes = document.querySelectorAll(".data-note");
    if (dataNotes.length >= 3) {
      dataNotes[0].textContent = "Live weather data";
      dataNotes[1].textContent = "Live atmospheric CO₂";
      dataNotes[2].textContent = "Current solar radiation";
    }

    const updated = document.getElementById("climateUpdated");
    if (updated) {
      const now = new Date();
      updated.textContent = `Last updated: ${now.toLocaleString("en-IN")}`;
    }
  } catch (error) {
    console.error(error);
    temperatureValue.textContent = "Unavailable";
    co2Value.textContent = "Unavailable";
    renewableValue.textContent = "Unavailable";
  }
}

if (stateSelect) {
  stateSelect.addEventListener("change", updateClimateData);
  updateClimateData();
  setInterval(updateClimateData, 10 * 60 * 1000);
}

const refreshButton = document.getElementById("refreshClimate");
if (refreshButton) {
  refreshButton.addEventListener("click", () => {
    updateClimateData();
    refreshButton.textContent = "↻ Refreshing...";
    setTimeout(() => refreshButton.textContent = "↻ Refresh Data", 1500);
  });
}

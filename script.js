// ========================================
// ALL-INDIA CLIMATE DASHBOARD
// Interactive State Data
// ========================================

const climateData = {
  Meghalaya: {
    temperature: "22°C",
    co2: "Low",
    renewable: "68%"
  },

  Assam: {
    temperature: "25°C",
    co2: "Moderate",
    renewable: "54%"
  },

  ArunachalPradesh: {
    temperature: "18°C",
    co2: "Low",
    renewable: "82%"
  },

  Sikkim: {
    temperature: "16°C",
    co2: "Low",
    renewable: "91%"
  },

  WestBengal: {
    temperature: "27°C",
    co2: "High",
    renewable: "38%"
  },

  Odisha: {
    temperature: "28°C",
    co2: "Moderate",
    renewable: "47%"
  },

  Maharashtra: {
    temperature: "26°C",
    co2: "High",
    renewable: "42%"
  },

  Gujarat: {
    temperature: "29°C",
    co2: "High",
    renewable: "61%"
  },

  Rajasthan: {
    temperature: "30°C",
    co2: "Moderate",
    renewable: "74%"
  },

  Kerala: {
    temperature: "27°C",
    co2: "Moderate",
    renewable: "58%"
  },

  Karnataka: {
    temperature: "25°C",
    co2: "Moderate",
    renewable: "63%"
  },

  TamilNadu: {
    temperature: "28°C",
    co2: "High",
    renewable: "69%"
  },

  Delhi: {
    temperature: "31°C",
    co2: "Very High",
    renewable: "21%"
  },

  Punjab: {
    temperature: "24°C",
    co2: "High",
    renewable: "35%"
  },

  Haryana: {
    temperature: "25°C",
    co2: "High",
    renewable: "39%"
  },

  Bihar: {
    temperature: "26°C",
    co2: "Moderate",
    renewable: "31%"
  },

  UttarPradesh: {
    temperature: "27°C",
    co2: "High",
    renewable: "36%"
  }
};


// ========================================
// GET ELEMENTS
// ========================================

const stateSelect = document.getElementById("stateSelect");
const temperatureValue = document.getElementById("temperatureValue");
const co2Value = document.getElementById("co2Value");
const renewableValue = document.getElementById("renewableValue");


// ========================================
// UPDATE CLIMATE DATA
// ========================================

function updateClimateData() {

  const selectedState = stateSelect.value;
  const data = climateData[selectedState];

  if (!data) return;

  temperatureValue.textContent = data.temperature;
  co2Value.textContent = data.co2;
  renewableValue.textContent = data.renewable;
}


// ========================================
// STATE CHANGE EVENT
// ========================================

if (stateSelect) {
  stateSelect.addEventListener("change", updateClimateData);

  // Load Meghalaya data when page opens
  updateClimateData();
} 

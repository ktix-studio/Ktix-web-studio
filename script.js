// ========================================
// ALL-INDIA CLIMATE DASHBOARD
// Interactive State Data
// ========================================

const climateData = {

  AndhraPradesh: {
    temperature: "28°C",
    co2: "Moderate",
    renewable: "54%"
  },

  ArunachalPradesh: {
    temperature: "18°C",
    co2: "Low",
    renewable: "82%"
  },

  Assam: {
    temperature: "25°C",
    co2: "Moderate",
    renewable: "54%"
  },

  Bihar: {
    temperature: "26°C",
    co2: "Moderate",
    renewable: "31%"
  },

  Chhattisgarh: {
    temperature: "27°C",
    co2: "Moderate",
    renewable: "56%"
  },

  Goa: {
    temperature: "28°C",
    co2: "Low",
    renewable: "67%"
  },

  Gujarat: {
    temperature: "29°C",
    co2: "High",
    renewable: "61%"
  },

  Haryana: {
    temperature: "25°C",
    co2: "High",
    renewable: "39%"
  },

  HimachalPradesh: {
    temperature: "17°C",
    co2: "Low",
    renewable: "78%"
  },

  Jharkhand: {
    temperature: "27°C",
    co2: "High",
    renewable: "43%"
  },

  Karnataka: {
    temperature: "25°C",
    co2: "Moderate",
    renewable: "63%"
  },

  Kerala: {
    temperature: "27°C",
    co2: "Moderate",
    renewable: "58%"
  },

  MadhyaPradesh: {
    temperature: "27°C",
    co2: "Moderate",
    renewable: "52%"
  },

  Maharashtra: {
    temperature: "26°C",
    co2: "High",
    renewable: "42%"
  },

  Manipur: {
    temperature: "22°C",
    co2: "Low",
    renewable: "64%"
  },

  Meghalaya: {
    temperature: "22°C",
    co2: "Low",
    renewable: "68%"
  },

  Mizoram: {
    temperature: "21°C",
    co2: "Low",
    renewable: "71%"
  },

  Nagaland: {
    temperature: "22°C",
    co2: "Low",
    renewable: "69%"
  },

  Odisha: {
    temperature: "28°C",
    co2: "Moderate",
    renewable: "47%"
  },

  Punjab: {
    temperature: "24°C",
    co2: "High",
    renewable: "35%"
  },

  Rajasthan: {
    temperature: "30°C",
    co2: "Moderate",
    renewable: "74%"
  },

  Sikkim: {
    temperature: "16°C",
    co2: "Low",
    renewable: "91%"
  },

  TamilNadu: {
    temperature: "28°C",
    co2: "High",
    renewable: "69%"
  },

  Telangana: {
    temperature: "28°C",
    co2: "Moderate",
    renewable: "57%"
  },

  Tripura: {
    temperature: "25°C",
    co2: "Low",
    renewable: "62%"
  },

  UttarPradesh: {
    temperature: "27°C",
    co2: "High",
    renewable: "36%"
  },

  Uttarakhand: {
    temperature: "18°C",
    co2: "Low",
    renewable: "81%"
  },

  WestBengal: {
    temperature: "27°C",
    co2: "High",
    renewable: "38%"
  },

  // UNION TERRITORIES

  AndamanNicobar: {
    temperature: "28°C",
    co2: "Low",
    renewable: "72%"
  },

  Chandigarh: {
    temperature: "24°C",
    co2: "Moderate",
    renewable: "29%"
  },

  DadraNagarHaveliDamanDiu: {
    temperature: "29°C",
    co2: "Moderate",
    renewable: "51%"
  },

  Delhi: {
    temperature: "31°C",
    co2: "Very High",
    renewable: "21%"
  },

  JammuKashmir: {
    temperature: "15°C",
    co2: "Low",
    renewable: "76%"
  },

  Ladakh: {
    temperature: "8°C",
    co2: "Low",
    renewable: "88%"
  },

  Lakshadweep: {
    temperature: "28°C",
    co2: "Low",
    renewable: "74%"
  },

  Puducherry: {
    temperature: "29°C",
    co2: "Moderate",
    renewable: "48%"
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

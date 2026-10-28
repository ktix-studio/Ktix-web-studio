// ========================================
// KTIX WEB STUDIO - MAIN SCRIPT v2.0 + AI LABS
// Climate + Menu + AI Integration (Groq LLaMA)
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

// MENU TOGGLE
const menu = document.querySelector(".menu") || document.querySelector(".menu-toggle");
const nav = document.querySelector("nav") || document.getElementById("mainNav");
if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
    nav.classList.toggle("mobile-open");
  });
}

// CLIMATE DASHBOARD
const stateSelect = document.getElementById("stateSelect");
const temperatureValue = document.getElementById("temperatureValue");
const co2Value = document.getElementById("co2Value");
const renewableValue = document.getElementById("renewableValue");

async function updateClimateData() {
  if (!stateSelect || !temperatureValue) return;
  const state = stateSelect.value;
  const location = stateLocations[state];
  if (!location) return;
  const [latitude, longitude] = location;

  temperatureValue.textContent = "Loading...";
  if(co2Value) co2Value.textContent = "Loading...";
  if(renewableValue) renewableValue.textContent = "Loading...";

  try {
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,shortwave_radiation&timezone=auto`;
    const airURL = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=carbon_dioxide&timezone=auto`;
    const [weatherResponse, airResponse] = await Promise.all([fetch(weatherURL), fetch(airURL)]);
    if (!weatherResponse.ok || !airResponse.ok) throw new Error("API failed");
    const weather = await weatherResponse.json();
    const air = await airResponse.json();
    temperatureValue.textContent = `${weather.current.temperature_2m}°C`;
    if(co2Value) co2Value.textContent = `${air.current.carbon_dioxide} ppm`;
    if(renewableValue) renewableValue.textContent = `${Math.round(weather.current.shortwave_radiation)} W/m²`;
    const updated = document.getElementById("climateUpdated");
    if (updated) updated.textContent = `Last updated: ${new Date().toLocaleString("en-IN")}`;
  } catch (error) {
    console.error(error);
    temperatureValue.textContent = "Unavailable";
    if(co2Value) co2Value.textContent = "Unavailable";
    if(renewableValue) renewableValue.textContent = "Unavailable";
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

// ========================================
// KTIX AI STUDIO - GROQ INTEGRATION (NEW)
// Safe: key saved in localStorage only, never pushed to GitHub
// ========================================
const groqKeyInput = document.getElementById("groqKey");
if (groqKeyInput) {
  groqKeyInput.value = localStorage.getItem('ktix_groq_key') || '';
  groqKeyInput.addEventListener('input', e => {
    localStorage.setItem('ktix_groq_key', e.target.value.trim());
  });
}

async function generateAI(){
  const keyEl = document.getElementById("groqKey");
  const ideaEl = document.getElementById("bizIdea");
  const resultEl = document.getElementById("aiResult");
  const statusEl = document.getElementById("ai-status");
  
  const key = (keyEl?.value.trim() || localStorage.getItem('ktix_groq_key') || "");
  const prompt = ideaEl?.value.trim() || "";

  if(!key || !key.startsWith('gsk_')){
    if(statusEl) statusEl.textContent = "⚠️ Paste valid Groq key (gsk_...). Get FREE at console.groq.com";
    return;
  }
  if(!prompt){
    if(statusEl) statusEl.textContent = "Write your business idea first.";
    return;
  }

  if(statusEl) statusEl.textContent = "Generating with Groq LLaMA 3.1...";
  if(resultEl) resultEl.innerHTML = "⏳ AI thinking... crafting luxury copy...";

  try{
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are KTIX Studio's elite copywriter for luxury brands. Given business idea, return: 1) Hero Title (max 7 words, expensive sounding), 2) Subtitle (max 18 words), 3) Two hex colors that match luxury vibe, 4) One CTA button text. Format with clean line breaks and emoji." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 400
      })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error.message);
    const output = data.choices[0].message.content;
    if(resultEl) resultEl.innerText = output;
    if(statusEl){ statusEl.textContent = "✓ Generated! Key is safe, never pushed to GitHub."; statusEl.style.color = "#22c55e"; }
    
    // Optional: GSAP animation for result
    if(window.gsap && resultEl){ gsap.from(resultEl, {y:10, opacity:0, duration:.4, ease:"power2.out"}) }
  } catch(err){
    console.error(err);
    if(resultEl) resultEl.innerText = "Error: " + err.message + "\n\nTip: Check if key is correct, or try again.";
    if(statusEl) statusEl.textContent = "Failed. Check key or internet.";
  }
}

// Make function global for onclick
window.generateAI = generateAI;

let selectedVoice = null;

// Function to list available voices
function getVoices() {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        setTimeout(getVoices, 100); // Retry if voices aren't available yet
        return;
    }

    // Loop through voices to find a female voice
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === "en-US" && voices[i].name.toLowerCase().includes("female")) {
            selectedVoice = voices[i];  // Explicitly picking a female voice
            break;
        }
    }

    // If no female voice found, fall back to the first available voice
    if (!selectedVoice) {
        selectedVoice = voices[0];
    }
}

// Initialize the voices when available
window.speechSynthesis.onvoiceschanged = getVoices;
getVoices();  // Ensure we retrieve voices immediately

// Function to speak with the selected voice (Baymax-like tone)
function speak(message) {
    if (!selectedVoice) {
        speak("I'm sorry, I couldn't find the right voice. Please wait.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(message);
    speech.voice = selectedVoice;
    speech.volume = 1;
    speech.rate = 0.75;  // Slower for a calming, Baymax-like tone
    speech.pitch = 2.0; // Higher pitch for a soothing, friendly voice (similar to Baymax)
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

// Function to introduce Healix (Baymax-like introduction)
function introduction() {
    speak("Hello, I am Healix, your friendly healthcare companion. How can I assist you today?");
}

// Call the introduction when the page loads
window.onload = function() {
    introduction();
};

// Function to check health and provide tailored advice
function checkHealth() {
    let heartRate = document.getElementById('heartRate').value;
    let temperature = document.getElementById('temperature').value;
    let breathingRate = document.getElementById('breathingRate').value;

    let fever = document.getElementById('fever').checked;
    let cough = document.getElementById('cough').checked;
    let headache = document.getElementById('headache').checked;
    let fatigue = document.getElementById('fatigue').checked;
    let shortBreath = document.getElementById('shortBreath').checked;

    let healthCondition = "";
    let advice = "";

    // Separate Health Scanning & Diagnostics
    if (temperature && heartRate && breathingRate) {
        if (temperature > 38) {
            healthCondition = "You have a fever.";
            advice = "Please drink plenty of fluids, like water or herbal teas. Rest in a cool, comfortable place. You can also take fever-reducing medicine like Paracetamol. If your temperature stays above 39°C for more than a few days, or if you feel worse, please consult a healthcare provider.";
        } else if (heartRate > 100) {
            healthCondition = "Your heart rate is a little high.";
            advice = "Try to relax and take deep breaths. Avoid any physical activity for now, and drink water to stay hydrated. If your heart rate stays elevated, it may be good to consult a doctor to make sure everything is okay.";
        } else if (breathingRate > 20) {
            healthCondition = "Your breathing rate is higher than usual.";
            advice = "Please take slow, deep breaths and relax. If you're feeling short of breath, rest and avoid physical exertion. If your breathing continues to be difficult, please seek medical attention.";
        } else {
            healthCondition = "Your vitals seem normal.";
            advice = "You're doing well! Keep following healthy habits, stay hydrated, and maintain a balanced diet. If you notice any changes, feel free to check in again.";
        }
        speak(healthCondition + " " + advice);
    }

    // Separate Symptoms Check
    if (fever) {
        healthCondition = "You have a fever.";
        advice = "Make sure to drink plenty of water, rest, and keep yourself comfortable. You can try over-the-counter medication like Paracetamol to help reduce the fever. If the fever lasts for more than 3 days or you feel worse, please see a doctor.";
    }
    if (cough) {
        healthCondition = "You have a cough.";
        advice = "Warm fluids like honey lemon tea may help soothe your throat. If you have a dry cough, you can try a cough suppressant. If your cough lasts for more than a week or becomes more severe, it's a good idea to consult a healthcare professional.";
    }
    if (headache) {
        healthCondition = "You have a headache.";
        advice = "Make sure to hydrate and rest in a dark, quiet room. You can also take over-the-counter painkillers like Ibuprofen or Paracetamol. If the headache continues for an extended period, or if it’s particularly severe, you may want to visit a doctor.";
    }
    if (fatigue) {
        healthCondition = "You feel fatigued.";
        advice = "Fatigue can happen for many reasons. Make sure you're getting enough rest and drinking enough water. Try to relax and de-stress. If the fatigue persists for more than a week or is accompanied by other symptoms, it's best to speak with a healthcare provider.";
    }
    if (shortBreath) {
        healthCondition = "You are experiencing shortness of breath.";
        advice = "Stop any strenuous activity and sit in a relaxed position. Breathe slowly and deeply. If you continue to feel short of breath or have chest discomfort, please seek medical attention immediately.";
    }

    // Update text dynamically
    document.getElementById('condition').innerText = healthCondition;
    document.getElementById('advice').innerText = advice;

    // Speak the health condition and advice
    speak(healthCondition + " " + advice);
}

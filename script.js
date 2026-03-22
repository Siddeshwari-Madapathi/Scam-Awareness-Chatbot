let scans = 0, threats = 0, safe = 0;

function updateDashboard(type) {
  scans++;
  if(type === "threat") threats++;
  else safe++;

  document.getElementById("scanCount").innerText = scans;
  document.getElementById("threatCount").innerText = threats;
  document.getElementById("safeCount").innerText = safe;
}

function sendMessage() {
  let input = document.getElementById("userInput").value;
  if(!input) return;

  addMessage(input, "user");
  let res = detectScam(input);

  setTimeout(() => addMessage(res.text, "bot"), 400);
  updateDashboard(res.type);

  document.getElementById("userInput").value = "";
}

function addMessage(text, sender) {
  let chatbox = document.getElementById("chatbox");
  let msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

/* Fill input from example buttons */
function fillInput(text) {
  document.getElementById("userInput").value = text;
}

/* Main Scam Detection Logic */
function detectScam(input) {
  let text = input.toLowerCase();

  // Links
  if (/(http|https|www\.)/.test(text)) {
    return {
      text: "🔴 Phishing Link Detected! Do NOT click unknown links.",
      type: "threat"
    };
  }

  // Phone numbers
  if (/\d{10}/.test(text)) {
    return {
      text: "📞 Phone Number Detected! Unknown numbers may be scam calls.",
      type: "threat"
    };
  }

  // OTP detection
  if (text.includes("otp") || /\d{4,6}/.test(text)) {
    return {
      text: "🔐 OTP Alert! Never share OTP codes with anyone.",
      type: "threat"
    };
  }

  // Urgency keywords
  if (text.includes("urgent") || text.includes("immediately") || text.includes("act now")) {
    return {
      text: "⚠️ Urgency detected! Scammers create panic. Stay calm & verify.",
      type: "threat"
    };
  }

  // Money request
  if (text.includes("pay") || text.includes("fee") || text.includes("send money")) {
    return {
      text: "💰 Money Request Warning! Legit services don't ask random payments.",
      type: "threat"
    };
  }

  // Job scam
  if (text.includes("job")) {
    return {
      text: "💼 Job Scam Alert! Never pay for jobs.",
      type: "threat"
    };
  }

  // Bank scam
  if (text.includes("bank") || text.includes("account")) {
    return {
      text: "🏦 Bank Scam! Banks never ask for OTP or passwords.",
      type: "threat"
    };
  }

  // Lottery scam
  if (text.includes("lottery") || text.includes("win")) {
    return {
      text: "🎰 Lottery Scam! No real prize asks fees.",
      type: "threat"
    };
  }

  return {
    text: "🟢 Looks safe. Still verify unknown sources.",
    type: "safe"
  };
}

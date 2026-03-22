let scans = 0, threats = 0, safe = 0;

function updateDashboard(type) {
  document.getElementById("statsBox").style.display = "flex";

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

function fillInput(text) {
  document.getElementById("userInput").value = text;
}

function detectScam(input) {
  let text = input.toLowerCase();

  if (/(http|https|www\.)/.test(text)) {
    return { text: "🔴 Phishing Link Detected! Do NOT click unknown links.", type: "threat" };
  }

  if (/\d{10}/.test(text)) {
    return { text: "📞 Phone Number Detected! Unknown numbers may be scam calls.", type: "threat" };
  }

  if (text.includes("otp") || /\d{4,6}/.test(text)) {
    return { text: "🔐 OTP Alert! Never share OTP codes with anyone.", type: "threat" };
  }

  if (text.includes("urgent") || text.includes("act now")) {
    return { text: "⚠️ Urgency detected! Scammers create panic.", type: "threat" };
  }

  if (text.includes("pay") || text.includes("fee")) {
    return { text: "💰 Money Request Warning! Legit services don't ask random payments.", type: "threat" };
  }

  if (text.includes("job")) {
    return { text: "💼 Job Scam Alert! Never pay for jobs.", type: "threat" };
  }

  if (text.includes("bank")) {
    return { text: "🏦 Bank Scam! Banks never ask for OTP or passwords.", type: "threat" };
  }

  if (text.includes("lottery") || text.includes("win")) {
    return { text: "🎰 Lottery Scam! No real prize asks fees.", type: "threat" };
  }

  return { text: "🟢 Looks safe. Still verify unknown sources.", type: "safe" };
}

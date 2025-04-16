// FUDGE Dice Roller with Log + Shared View
console.log("Is app defined?", typeof app !== "undefined");

// Utilities
function rollFudge() {
  const symbols = ["➖", "➕", "⬜"];
  const roll = () => symbols[Math.floor(Math.random() * 3)];
  return [roll(), roll(), roll(), roll()];
}

function calculateTotal(rolls) {
  return rolls.reduce((total, symbol) => {
    if (symbol === "➕") return total + 1;
    if (symbol === "➖") return total - 1;
    return total;
  }, 0);
}

// DOM references
const rollBtn = document.getElementById("roll-btn");
const resultSpan = document.getElementById("result");
const logList = document.getElementById("log");

function renderLog(log) {
  logList.innerHTML = "";
  log.slice().reverse().forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.result} (${entry.rolls.join(" ")})`;
    logList.appendChild(li);
  });
}

// Rolling and syncing
async function rollAndShare() {
  const rolls = rollFudge();
  const total = calculateTotal(rolls);
  const user = await app.user.getUserInfo();
  const name = user?.displayName || "Unknown Player";

  const newEntry = {
    name,
    rolls,
    result: total,
    timestamp: Date.now()
  };

  const current = (await app.storage.read("sharedRolls")) || [];
  const updated = [...current, newEntry].slice(-20); // Keep last 20 rolls
  await app.storage.write("sharedRolls", updated);
}

// Listen for shared roll updates
app.storage.onChange("sharedRolls", (newLog) => {
  renderLog(newLog || []);
});

// Setup
rollBtn.addEventListener("click", rollAndShare);

(async () => {
  const currentLog = (await app.storage.read("sharedRolls")) || [];
  renderLog(currentLog);
})();

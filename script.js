function rollDie() {
  const outcomes = [-1, 0, 1];
  return outcomes[Math.floor(Math.random() * outcomes.length)];
}

function rollDice() {
  let total = 0;
  let rolls = [];
  for (let i = 0; i < 4; i++) {
    const roll = rollDie();
    total += roll;
    rolls.push(roll);
  }
  document.getElementById('result').textContent = `Rolls: ${rolls.join(', ')} | Total: ${total}`;
}

function rollFudgeDie() {
  const faces = [-1, 0, 1];
  return faces[Math.floor(Math.random() * 3)];
}

function renderSymbol(n) {
  if (n === 1) return '+';
  if (n === -1) return '−';
  return '0';
}

document.getElementById('rollFudge').addEventListener('click', () => {
  const rolls = Array.from({ length: 4 }, rollFudgeDie);
  const symbols = rolls.map(renderSymbol).join(' ');
  const total = rolls.reduce((a, b) => a + b, 0);
  document.getElementById('output').innerText = `🎲 ${symbols} = ${total}`;
});
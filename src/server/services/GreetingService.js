function addGreeting(name) {
  const timestamp = new Date();
  appendRow(CONFIG.SHEET_NAMES.GREETINGS, [name, timestamp.toISOString()]);
}

function getAllGreetings() {
  const rows = findAll(CONFIG.SHEET_NAMES.GREETINGS);
  if (rows.length === 0) return [];
  return rows.slice(1).map((row, i) => ({
    id: i + 1,
    name: row[0],
    timestamp: row[1],
  }));
}

const consonants = [
  // Plosivas
  { symbol: "p", manner: "plosive", place: "bilabial", voicing: "voiceless" },
  { symbol: "b", manner: "plosive", place: "bilabial", voicing: "voiced" },
  { symbol: "t", manner: "plosive", place: "alveolar", voicing: "voiceless" },
  { symbol: "d", manner: "plosive", place: "alveolar", voicing: "voiced" },
  { symbol: "k", manner: "plosive", place: "velar", voicing: "voiceless" },
  { symbol: "g", manner: "plosive", place: "velar", voicing: "voiced" },

  // Nasais
  { symbol: "m", manner: "nasal", place: "bilabial", voicing: "voiced" },
  { symbol: "n", manner: "nasal", place: "alveolar", voicing: "voiced" },
  { symbol: "ɲ", manner: "nasal", place: "palatal", voicing: "voiced" },
  { symbol: "ŋ", manner: "nasal", place: "velar", voicing: "voiced" },

  // Fricativas
  { symbol: "f", manner: "fricative", place: "labiodental", voicing: "voiceless" },
  { symbol: "v", manner: "fricative", place: "labiodental", voicing: "voiced" },
  { symbol: "s", manner: "fricative", place: "alveolar", voicing: "voiceless" },
  { symbol: "z", manner: "fricative", place: "alveolar", voicing: "voiced" },
  { symbol: "ʃ", manner: "fricative", place: "postalveolar", voicing: "voiceless" },
  { symbol: "ʒ", manner: "fricative", place: "postalveolar", voicing: "voiced" },
  { symbol: "h", manner: "fricative", place: "glottal", voicing: "voiceless" },
  { symbol: "ʁ", manner: "fricative", place: "uvular", voicing: "voiced" },

  // Africadas
  { symbol: "tʃ", manner: "affricate", place: "postalveolar", voicing: "voiceless" },
  { symbol: "dʒ", manner: "affricate", place: "postalveolar", voicing: "voiced" },

  // Laterais
  { symbol: "l", manner: "lateral-approximant", place: "alveolar", voicing: "voiced" },
  { symbol: "ʎ", manner: "lateral-approximant", place: "palatal", voicing: "voiced" },

  // Vibrante simples
  { symbol: "ɾ", manner: "tap", place: "alveolar", voicing: "voiced" },
];

const manners = [
  "plosive",
  "nasal",
  "fricative",
  "affricate",
  "tap",
  "lateral-approximant",
];

const places = [
  "bilabial",
  "labiodental",
  "alveolar",
  "postalveolar",
  "palatal",
  "velar",
  "uvular",
  "glottal",
];

function createChart() {
  const table = document.createElement("table");
  table.className = "consonant-chart";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const corner = document.createElement("th");
  corner.className = "corner";
  headerRow.appendChild(corner);

  places.forEach((place) => {
    const th = document.createElement("th");
    th.className = "place";
    th.textContent = place;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  manners.forEach((manner) => {
    const row = document.createElement("tr");

    const mannerCell = document.createElement("th");
    mannerCell.className = "manner";
    mannerCell.textContent = manner;
    row.appendChild(mannerCell);

    places.forEach((place) => {
      const td = document.createElement("td");
      td.className = "cell";

      const sounds = consonants.filter(
        (c) => c.place === place && c.manner === manner
      );

      sounds.forEach((c) => {
        const span = document.createElement("span");
        span.textContent = c.symbol;
        span.classList.add("phoneme", c.voicing);
        td.appendChild(span);
      });

      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  document.getElementById("chart-container").appendChild(table);
}

document.addEventListener("DOMContentLoaded", createChart);

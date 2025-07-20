// Lista de fonemas selecionados e seus traços
const fonemas = [
  { simbolo: "p", traços: ["+consonantal", "-silábico"] },
  { simbolo: "b", traços: ["+consonantal", "-silábico", "+vozeado"] },
  { simbolo: "t", traços: ["+consonantal", "-silábico"] },
  { simbolo: "d", traços: ["+consonantal", "-silábico", "+vozeado"] },
  { simbolo: "k", traços: ["+consonantal", "-silábico"] },
  { simbolo: "g", traços: ["+consonantal", "-silábico", "+vozeado"] },
  { simbolo: "f", traços: ["+consonantal", "-silábico", "+contínuo"] },
  { simbolo: "v", traços: ["+consonantal", "-silábico", "+contínuo", "+vozeado"] },
  { simbolo: "s", traços: ["+consonantal", "-silábico", "+contínuo"] },
  { simbolo: "z", traços: ["+consonantal", "-silábico", "+contínuo", "+vozeado"] },
  { simbolo: "\u0283", traços: ["+consonantal", "-silábico", "+contínuo"] }, // ʃ = ʃ
  { simbolo: "\u0292", traços: ["+consonantal", "-silábico", "+contínuo", "+vozeado"] }, // ʒ = ʒ
  { simbolo: "m", traços: ["+consonantal", "-silábico", "+nasal", "+soante"] },
  { simbolo: "n", traços: ["+consonantal", "-silábico", "+nasal", "+soante"] },
  { simbolo: "\u0272", traços: ["+consonantal", "-silábico", "+nasal", "+soante"] }, // ɲ = ɲ
  { simbolo: "l", traços: ["+consonantal", "-silábico", "+lateral", "+soante"] },
  { simbolo: "\u028e", traços: ["+consonantal", "-silábico", "+aproximante", "+soante"] }, // ʎ = ʎ
  { simbolo: "\u0281", traços: ["+consonantal", "-silábico", "+aproximante", "+soante"] }, // ʁ = ʁ
  { simbolo: "t\u0283", traços: ["+consonantal", "-silábico"] }, // tʃ
  { simbolo: "d\u0292", traços: ["+consonantal", "-silábico", "+vozeado"] }, // dʒ
];

const vogais = [
  { simbolo: "i", traços: ["+silábico", "-consonantal", "+alto", "+anterior"] },
  { simbolo: "e", traços: ["+silábico", "-consonantal", "-alto", "+anterior"] },
  { simbolo: "\u025B", traços: ["+silábico", "-consonantal", "-alto", "+anterior"] },
  { simbolo: "a", traços: ["+silábico", "-consonantal", "+baixo"] },
  { simbolo: "o", traços: ["+silábico", "-consonantal", "-alto", "-anterior", "+arredondado"] },
  { simbolo: "u", traços: ["+silábico", "-consonantal", "+alto", "-anterior", "+arredondado"] },
];

const tabelaFonemas = document.getElementById("tabela-fonemas");
const tabelaVogais = document.getElementById("tabela-vogais");
const filtros = document.querySelectorAll("#filters input[type=radio]");

function aplicarRegrasLogicas(traco, valor) {
  const dependencias = {
    "+consonantal": [{ traco: "silábico", valor: "-" }],
    "+silábico": [
      { traco: "consonantal", valor: "-" },
      { traco: "soante", valor: "+" },
      { traco: "contínuo", valor: "+" },
    ],
    "+soante": [{ traco: "vozeado", valor: "+" }],
    "+contínuo": [{ traco: "soltura retardada", valor: "-" }],
    "+soltura retardada": [{ traco: "contínuo", valor: "-" }],
    "+nasal": [
      { traco: "lateral", valor: "-" },
      { traco: "aproximante", valor: "-" },
      { traco: "silábico", valor: "-" },
      { traco: "consonantal", valor: "+" },
    ],
    "+lateral": [
      { traco: "nasal", valor: "-" },
      { traco: "aproximante", valor: "-" },
      { traco: "silábico", valor: "-" },
      { traco: "consonantal", valor: "+" },
    ],
    "+aproximante": [
      { traco: "nasal", valor: "-" },
      { traco: "lateral", valor: "-" },
      { traco: "silábico", valor: "-" },
      { traco: "consonantal", valor: "+" },
    ],
  };

  const regras = dependencias[`${valor}${traco}`];
  if (regras) {
    regras.forEach(({ traco: t, valor: v }) => {
      const input = document.querySelector(`input[name='${t}'][value='${v}']`);
      if (input) input.checked = true;
    });
  }
}

function filtrarFonemas(fonemas) {
  const criterios = {};
  filtros.forEach(f => {
    if (f.checked) criterios[f.name] = f.value;
  });

  return fonemas.filter(fonema => {
    return Object.entries(criterios).every(([traco, valor]) =>
      fonema.traços.includes(`${valor}${traco}`)
    );
  });
}

function renderTabela(fonemas, container) {
  container.innerHTML = "";
  const tabela = document.createElement("table");
  const linha = document.createElement("tr");
  fonemas.forEach(f => {
    const cel = document.createElement("td");
    cel.className = "fonema";
    cel.textContent = f.simbolo;
    linha.appendChild(cel);
  });
  tabela.appendChild(linha);
  container.appendChild(tabela);
}

filtros.forEach(f => {
  f.addEventListener("change", () => {
    aplicarRegrasLogicas(f.name, f.value);
    const consonantesVisiveis = filtrarFonemas(fonemas);
    const vogaisVisiveis = filtrarFonemas(vogais);
    renderTabela(consonantesVisiveis, tabelaFonemas);
    renderTabela(vogaisVisiveis, tabelaVogais);
  });
});

// Render inicial
renderTabela(fonemas, tabelaFonemas);
renderTabela(vogais, tabelaVogais);

// Traços por fonema
const featuresByPhoneme = {
  // Consoantes (apenas exemplo parcial; complete conforme necessário)
  "p": ["+consonantal", "-silábico", "-soante", "+anterior", "-contínuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "b": ["+consonantal", "-silábico", "-soante", "+anterior", "-contínuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],
  "t": ["+consonantal", "-silábico", "-soante", "+anterior", "-contínuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada", "+coronal"],
  "d": ["+consonantal", "-silábico", "-soante", "+anterior", "-contínuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada", "+coronal"],
  "k": ["+consonantal", "-silábico", "-soante", "-anterior", "-contínuo", "-nasal", "-lateral", "-vozeado", "-soltura retardada"],
  "g": ["+consonantal", "-silábico", "-soante", "-anterior", "-contínuo", "-nasal", "-lateral", "+vozeado", "-soltura retardada"],

  // Vogais e glides
  "i": ["-consonantal", "+silábico", "+soante", "+contínuo", "+alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "ɪ": ["-consonantal", "-silábico", "+soante", "+contínuo", "+alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "u": ["-consonantal", "+silábico", "+soante", "+contínuo", "+alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "ʊ": ["-consonantal", "-silábico", "+soante", "+contínuo", "+alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "e": ["-consonantal", "+silábico", "+soante", "+contínuo", "-alto", "-baixo", "-recuado", "-arredondado", "+vozeado"],
  "o": ["-consonantal", "+silábico", "+soante", "+contínuo", "-alto", "-baixo", "+recuado", "+arredondado", "+vozeado"],
  "ɛ": ["-consonantal", "+silábico", "+soante", "+contínuo", "-alto", "+baixo", "-recuado", "-arredondado", "+vozeado"],
  "ɔ": ["-consonantal", "+silábico", "+soante", "+contínuo", "-alto", "+baixo", "+recuado", "+arredondado", "+vozeado"],
  "a": ["-consonantal", "+silábico", "+soante", "+contínuo", "-alto", "+baixo", "+recuado", "-arredondado", "+vozeado"]
};

// Lógica de dependências entre traços
const dependencies = {
  "+consonantal": [["-silábico"]],
  "+silábico": ["-consonantal", "+soante", "+contínuo"],
  "+soante": ["+vozeado"],
  "+contínuo": ["-soltura retardada"],
  "+soltura retardada": ["-contínuo"],
  "+nasal": ["-lateral", "-aproximante", "-silábico", "+consonantal"],
  "+lateral": ["-nasal", "-aproximante", "-silábico", "+consonantal"],
  "+aproximante": ["-nasal", "-lateral", "-silábico", "+consonantal"]
};

// Quando clica em um traço
document.querySelectorAll('.toggle-group input').forEach(input => {
  input.addEventListener('change', () => {
    const traço = input.name;
    const valor = input.value;
    aplicarDependencias(traço, valor);
    atualizarDestaque();
  });
});

// Aplica as dependências lógicas
function aplicarDependencias(traço, valor) {
  const dependentes = dependencies[`${valor}${traço}`];
  if (!dependentes) return;

  dependentes.forEach(dep => {
    const depTraço = dep.slice(1);
    const depValor = dep[0];
    const radio = document.querySelector(`input[name="${depTraço}"][value="${depValor}"]`);
    if (radio && !radio.checked) {
      radio.checked = true;
      aplicarDependencias(depTraço, depValor); // recursivo
    }
  });
}

// Atualiza a tabela para destacar fonemas compatíveis com os traços selecionados
function atualizarDestaque() {
  // Traços selecionados
  const selecionados = [];
  document.querySelectorAll('.toggle-group input:checked').forEach(input => {
    selecionados.push(`${input.value}${input.name}`);
  });

  // Para cada célula com fonemas
  document.querySelectorAll('td span').forEach(span => {
    const fonema = span.textContent;
    const traçosDoFonema = featuresByPhoneme[fonema] || [];
    const combina = selecionados.every(sel => traçosDoFonema.includes(sel));
    if (combina) {
      span.classList.add('highlight');
    } else {
      span.classList.remove('highlight');
    }
  });
}

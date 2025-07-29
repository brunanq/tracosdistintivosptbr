document.addEventListener('DOMContentLoaded', () => {
    const distinctiveFeatures = [
        "Consonantal", "Silábico", "Soante", "Coronal", "Anterior", "Contínuo",
        "Nasal", "Lateral", "Vozeado", "Soltura Retardada", "Alto", "Baixo",
        "Recuado", "Arredondado", "Tenso"
    ];

    const phonemes = [
        // Consoantes
        { symbol: "p", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "-vozeado", "+anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "b", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "+vozeado", "+anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "t", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "-vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "d", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "k", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "-vozeado", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "g", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "+vozeado", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "m", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "-coronal", "-soltura retardada", "+nasal", "-lateral", "-aproximante"] },
        { symbol: "n", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "+nasal", "-lateral", "-aproximante"] },
        { symbol: "ɲ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "-anterior", "+coronal", "-soltura retardada", "+nasal", "-lateral", "-aproximante"] },
        { symbol: "r", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ɾ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "f", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "-vozeado", "+anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "v", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "+vozeado", "+anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "s", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "-vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "z", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ʃ", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "-vozeado", "-anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ʒ", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "+vozeado", "-anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "x", traits: ["+consonantal", "-vozeado", "+contínuo", "-silábico", "-soante", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ɣ", traits: ["+consonantal", "+vozeado", "+contínuo", "-silábico", "-soante", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "χ", traits: ["+consonantal", "-vozeado", "+contínuo", "-silábico", "-soante", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ʁ", traits: ["+consonantal", "+vozeado", "+contínuo", "-silábico", "-soante", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "h", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "-vozeado", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ɦ", traits: ["+consonantal", "-silábico", "+contínuo","-soante", "+vozeado", "-anterior", "-coronal", "-soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "tʃ", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "-vozeado", "-anterior", "+coronal", "+soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "dʒ", traits: ["+consonantal", "-silábico", "-contínuo","-soante", "+vozeado", "-anterior", "+coronal", "+soltura retardada", "-nasal", "-lateral", "-aproximante"] },
        { symbol: "ɹ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "-anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "+aproximante"] },
        { symbol: "l", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "+lateral", "-aproximante"] },
        { symbol: "ʎ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "-anterior", "+coronal", "-soltura retardada", "-nasal", "+lateral", "-aproximante"] },
        // Vogais
        { symbol: "i", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "-recuado", "-arredondado", "+tenso"] },
        { symbol: "ɪ", traits: ["-consonantal", "-silábico","+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "-recuado", "-arredondado", "-tenso"] }, // Glide
        { symbol: "u", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "+recuado", "+arredondado", "+tenso"] },
        { symbol: "ʊ", traits: ["-consonantal", "-silábico","+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "+recuado", "+arredondado", "-tenso"] }, // Glide
        { symbol: "e", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "-baixo", "-recuado", "-arredondado", "+tenso"] },
        { symbol: "o", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "-baixo", "+recuado", "+arredondado", "+tenso"] },
        { symbol: "ɛ", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "+baixo", "-recuado", "-arredondado", "+tenso"] },
        { symbol: "ɔ", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "+baixo", "+recuado", "+arredondado", "+tenso"] },
        { symbol: "a", traits: ["-consonantal", "+silábico", "+soante", "+contínuo", "+vozeado","-alto", "+baixo", "+recuado", "-arredondado", "+tenso"] }
    ];

    const menu = document.querySelector('.menu');
    const toggles = {};

    distinctiveFeatures.forEach(feature => {
        const toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggle-container');

        const label = document.createElement('span');
        label.textContent = feature;
        toggleContainer.appendChild(label);

        const toggleSwitch = document.createElement('div');
        toggleSwitch.classList.add('toggle-switch');
        const slider = document.createElement('div');
        slider.classList.add('slider');
        toggleSwitch.appendChild(slider);
        toggleContainer.appendChild(toggleSwitch);

        menu.appendChild(toggleContainer);

        toggles[feature] = { state: 0, element: toggleSwitch }; // 0: neutral, 1: positive (+), -1: negative (-)

        toggleSwitch.addEventListener('click', () => {
            toggles[feature].state = (toggles[feature].state + 2) % 3 - 1; // Cycle -1 -> 0 -> 1 -> -1

            updateToggleAppearance(feature);
            applyContradictionRules(feature);
            highlightPhonemes();
        });
    });

    function updateToggleAppearance(feature) {
        const toggleSwitch = toggles[feature].element;
        toggleSwitch.classList.remove('positive', 'negative');
        if (toggles[feature].state === 1) {
            toggleSwitch.classList.add('positive');
        } else if (toggles[feature].state === -1) {
            toggleSwitch.classList.add('negative');
        }
    }

    function setToggleState(feature, state) {
        if (toggles[feature] && toggles[feature].state !== state) {
            toggles[feature].state = state;
            updateToggleAppearance(feature);
        }
    }

    function applyContradictionRules(changedFeature) {
        switch (changedFeature) {
            case "Consonantal":
            	break;

         	case "Silábico":
         		break;

         	case "Soante":
 		 		break;

            case "Contínuo":
  				break;

            case "Nasal":
				break;

            case "Lateral":
                break;

            case "Vozeado":
                break;

            case "Soltura Retardada":
                break;

            case "Alto":
               	break;

           case "Baixo":
                break;
                
           case "Tenso":
           		break;
      }
   }


    function getPhonemeSymbols(symbols) {
        const s1 = symbols[0] ? `<span class="phoneme-symbol" data-symbol="${symbols[0].trim()}">${symbols[0]}</span>` : '';
        const s2 = symbols[1] ? `<span class="phoneme-symbol" data-symbol="${symbols[1].trim()}">${symbols[1]}</span>` : '';

        let content = '';
        if (symbols.length === 1) {
            // Se houver apenas um símbolo, ele vai para a segunda metade (direita)
            content = `<div class="phoneme-cell-half empty-half"></div><div class="phoneme-cell-half">${s1}</div>`;
        } else if (symbols.length >= 2) {
            // Se houver dois símbolos, o primeiro vai para a primeira metade (esquerda), o segundo para a segunda (direita)
            content = `<div class="phoneme-cell-half">${s1}</div><div class="phoneme-cell-half">${s2}</div>`;
        } else {
            // Se não houver símbolos, retorna duas metades vazias
            content = `<div class="phoneme-cell-half empty-half"></div><div class="phoneme-cell-half empty-half"></div>`;
        }
        // Envolve as metades em um novo wrapper div
        return `<div class="phoneme-content-wrapper">${content}</div>`;
    }


    // Consonant Table Generation
    const consonantTable = document.querySelector('.consonants-table');
    const consonantHeader = document.createElement('thead');
    const consonantBody = document.createElement('tbody');

    const placesOfArticulation = ["BILABIAL", "LABIODENTAL", "ALVEOLAR", "PÓS-ALVEOLAR", "PALATAL", "  VELAR  ", "UVULAR", "FARINGAL", "GLOTAL"];
    const mannersOfArticulation = ["OCLUSIVA", "NASAL", "VIBRANTE", "TEPE", "FRICATIVA", "AFRICADA", "APROXIMANTE", "LATERAL"];


    let headerRow = '<th id="table-title" colspan="10">Consoantes</yh><tr><th ></th>';
    placesOfArticulation.forEach(place => {
        headerRow += `<th>${place}</th>`;
    });
    headerRow += '</tr>';
    consonantHeader.innerHTML = headerRow;
    consonantTable.appendChild(consonantHeader);

    mannersOfArticulation.forEach(manner => {
        let row = `<tr><td>${manner}</td>`;
        placesOfArticulation.forEach(place => {
            let cellContent = '';
            let phonemesInCell = [];
            let isGrayedOut = false;

        if (
            (manner === "LATERAL" && (place === "BILABIAL" || place === "LABIODENTAL")) ||
            (manner === "VIBRANTE" && place === "  VELAR  ") ||
            (manner === "TEPE" && place === "  VELAR  ") ||
            (place === "FARINGAL" && (manner === "OCLUSIVA" || manner === "NASAL" || manner === "LATERAL")) ||
            (place === "GLOTAL" && (manner === "OCLUSIVA" || manner === "NASAL" || manner === "VIBRANTE" || manner === "TEPE" || manner === "LATERAL"))
        ) {
            isGrayedOut = true;
        }

            if (manner === "OCLUSIVA") {
                if (place === "BILABIAL") { phonemesInCell = ["p", "b"]; }
                else if (place === "ALVEOLAR") { phonemesInCell = ["t", "d"]; }
                else if (place === "  VELAR  ") { phonemesInCell = ["k", "g"]; }
            } else if (manner === "NASAL") {
                if (place === "BILABIAL") { phonemesInCell = ["m"]; }
                else if (place === "ALVEOLAR") { phonemesInCell = ["n"]; }
                else if (place === "PALATAL") { phonemesInCell = ["ɲ"]; }
            } else if (manner === "VIBRANTE") {
                if (place === "ALVEOLAR") { phonemesInCell = ["r"]; }
            } else if (manner === "TEPE") {
                if (place === "ALVEOLAR") { phonemesInCell = ["ɾ"]; }
            } else if (manner === "FRICATIVA") {
                if (place === "LABIODENTAL") { phonemesInCell = ["f", "v"]; }
                else if (place === "ALVEOLAR") { phonemesInCell = ["s", "z"]; }
                else if (place === "PÓS-ALVEOLAR") { phonemesInCell = ["ʃ", "ʒ"]; }
                else if (place === "  VELAR  ") { phonemesInCell = ["x", "ɣ"]; }
                else if (place === "UVULAR") { phonemesInCell = ["χ", "ʁ"]; }
                else if (place === "GLOTAL") { phonemesInCell = ["h", "ɦ"]; }
            } else if (manner === "AFRICADA") {
                if (place === "PÓS-ALVEOLAR") { phonemesInCell = ["tʃ", "dʒ"]; }
            } else if (manner === "APROXIMANTE") {
                if (place === "PÓS-ALVEOLAR") { phonemesInCell = ["ɹ"]; }
            } else if (manner === "LATERAL") {
                if (place === "ALVEOLAR") { phonemesInCell = ["l"]; }
                else if (place === "PALATAL") { phonemesInCell = ["ʎ"]; }
            }
            cellContent = getPhonemeSymbols(phonemesInCell);
        row += `<td data-phonemes="${phonemesInCell.join(',')}" ${isGrayedOut ? 'class="grayed-out-cell"' : ''}>${cellContent}</td>`;
    });
    row += '</tr>';
    consonantBody.innerHTML += row;
    });
    consonantTable.appendChild(consonantBody);
    


    // Vowels Table Generation
    const vowelsTable = document.querySelector('.vowels-table');
    vowelsTable.innerHTML = `
        <thead>
        	<th id="table-title" colspan="4">
        		Vogais e glides
            <tr>
                <th rowspan="4"></th>
                <th colspan="1" class="feature-label-horizontal border-top-single border-bottom-double">-recuado</th>
                <th colspan="2" class="feature-label-horizontal border-top-single border-bottom-double">+recuado</th>
            </tr>
        </thead>
       </th>   
       <tbody>
            <tr>
                <td class="feature-label-vertical border-left-single border-right-double">+alto</td>
                <td data-phonemes="i,ɪ" class="border-right-double border-bottom-single">${getPhonemeSymbols(["i", "ɪ"])}</td>
                <td colspan="2" data-phonemes="u,ʊ" class="border-right-single border-bottom-single">${getPhonemeSymbols(["u", "ʊ"])}</td>
            </tr>
            <tr>
                <td class="feature-label-vertical border-left-single border-right-double">-baixo<br>-alto</td>
                <td data-phonemes="e" class="border-right-double border-bottom-single">${getPhonemeSymbols(["e"])}</td>
                <td colspan="2" data-phonemes="o" class="border-right-single border-bottom-single">${getPhonemeSymbols(["o"])}</td>
            </tr>
            <tr>
                <td class="feature-label-vertical border-left-single border-right-double">+baixo</td>
                <td data-phonemes="ɛ" class="border-right-double border-bottom-single">${getPhonemeSymbols(["ɛ"])}</td>
                <td colspan="2" data-phonemes="ɔ,a" class="border-right-single border-bottom-single">${getPhonemeSymbols(["a", "ɔ"])}</td>
      </tbody>
    `;


    function highlightPhonemes() {
        // 1. Limpa todos os destaques existentes
        document.querySelectorAll('.phoneme-symbol').forEach(span => {
            span.classList.remove('highlight'); // Remove negrito do símbolo
        });
        document.querySelectorAll('.phoneme-cell-half').forEach(div => {
            div.classList.remove('highlighted-half'); // Remove cor de fundo da div "metade da célula"
        });


        // 2. Obtém os filtros ativos
        const activeFilters = [];
        for (const feature in toggles) {
            if (toggles[feature].state !== 0) { // Check the .state property
                activeFilters.push({ feature: feature.toLowerCase(), state: toggles[feature].state });
            }
        }

        if (activeFilters.length === 0) return;

        // 3. Aplica os novos destaques
        phonemes.forEach(phoneme => {
            let matchesAllFilters = true;
            activeFilters.forEach(filter => {
                const trait = `${filter.state === 1 ? '+' : '-'}${filter.feature}`;
                if (!phoneme.traits.includes(trait)) {
                    matchesAllFilters = false;
                }
            });

            if (matchesAllFilters) {
                // Encontra todos os spans para este fonema
                document.querySelectorAll(`.phoneme-symbol[data-symbol="${phoneme.symbol}"]`).forEach(span => {
                    span.classList.add('highlight'); // Adiciona negrito ao símbolo

                    // Encontra a div pai (.phoneme-cell-half) e adiciona a classe de destaque
                    const parentHalfDiv = span.closest('.phoneme-cell-half');
                    if (parentHalfDiv) {
                        parentHalfDiv.classList.add('highlighted-half'); // Adiciona destaque à metade da célula
                    }
                });
            }
        });
    }
});


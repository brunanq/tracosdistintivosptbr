document.addEventListener('DOMContentLoaded', () => {
    const distinctiveFeatures = [
        "Consonantal", "Silábico", "Soante", "Coronal", "Anterior", "Contínuo",
        "Nasal", "Lateral", "Vozeado", "Soltura Retardada", "Alto", "Baixo",
        "Recuado", "Arredondado"
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
        { symbol: "ɹ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "-lateral", "+aproximante"] },
        { symbol: "l", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "+anterior", "+coronal", "-soltura retardada", "-nasal", "+lateral", "-aproximante"] },
        { symbol: "ʎ", traits: ["+consonantal", "-silábico", "-contínuo","+soante", "+vozeado", "-anterior", "+coronal", "-soltura retardada", "-nasal", "+lateral", "-aproximante"] },
        // Vogais
        { symbol: "i", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "-recuado", "-arredondado"] },
        { symbol: "ɪ", traits: ["-silábico","+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "-recuado", "-arredondado"] }, // Glide
        { symbol: "u", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "+recuado", "+arredondado"] },
        { symbol: "ʊ", traits: ["-silábico","+soante", "+contínuo", "+vozeado", "+alto", "-baixo", "+recuado", "+arredondado"] }, // Glide
        { symbol: "e", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "-baixo", "-recuado", "-arredondado"] },
        { symbol: "o", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "-baixo", "+recuado", "+arredondado"] },
        { symbol: "ɛ", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "+baixo", "-recuado", "-arredondado"] },
        { symbol: "ɔ", traits: ["+silábico", "+soante", "+contínuo", "+vozeado", "-alto", "+baixo", "+recuado", "+arredondado"] },
        { symbol: "a", traits: ["+silábico", "+soante", "+contínuo", "+vozeado","-alto", "+baixo", "+recuado", "-arredondado"] }
    ];

    const menu = document.querySelector('.menu');
    const toggles = {}; // Store toggle states and elements

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
        // Access state using toggles[feature].state
        switch (changedFeature) {
            case "Consonantal":
                if (toggles["Consonantal"].state === 1) { // Consonantal ON
                    setToggleState("Silábico", -1); // Silábico OFF
                } else if (toggles["Consonantal"].state === 0) { // Consonantal Neutral
                    setToggleState("Silábico", 0); // Silábico neutral
                    } else if (toggles["Consonantal"].state === -1) { // Consonantal Neutral
                    setToggleState("Silábico", 0); // Silábico neutral
                }
                break;
                
            case "Silábico":
                if (toggles["Silábico"].state === 1) { // Silábico ON
                    setToggleState("Consonantal", -1); // Consonantal OFF
                    setToggleState("Soante", 1); // Soante ON
                    setToggleState("Vozeado", 1); // Vozeado ON
                } else if (toggles["Silábico"].state === 0) { // Silábico Neutral
                    setToggleState("Consonantal", 0); // Consonantal neutral
                    setToggleState("Soante", 0); // Soante neutral
                    setToggleState("Vozeado", 0); // Vozeado neutral
                    }else if (toggles["Silábico"].state === -1) { // Silábico Neutral
                    setToggleState("Consonantal", 0); // Consonantal neutral
                    setToggleState("Soante", 0); // Soante neutral
                    setToggleState("Vozeado", 0); // Vozeado neutral
                }
                break;
                
            case "Soante":
                if (toggles["Soante"].state === 1) { // Soante ON
                    setToggleState("Vozeado", 1); // Vozeado ON
                } else if (toggles["Soante"].state === 0) { // Soante Neutral
                    setToggleState("Vozeado", 0); // Vozeado neutral
                    }else if (toggles["Soante"].state === -1) { // Soante Neutral
                    setToggleState("Vozeado", 0); // Vozeado neutral
                }
                break;
                
            case "Contínuo":
                if (toggles["Contínuo"].state === 1) { // Contínuo ON
                    setToggleState("Soltura Retardada", -1); // Soltura Retardada OFF
                } else if (toggles["Contínuo"].state === 0) { // Contínuo Neutral
                    setToggleState("Soltura Retardada", 0); // Soltura Retardada neutral
                    } else if (toggles["Contínuo"].state === -1) { // Contínuo Neutral
                    setToggleState("Soltura Retardada", 0); // Soltura Retardada neutral
                }
                break;
                
            case "Nasal":
                if (toggles["Nasal"].state === 1) { // Nasal ON
                    setToggleState("Lateral", -1); // Lateral OFF
                } else if (toggles["Nasal"].state === 0) { // Nasal Neutral
                    setToggleState("Lateral", 0); // Lateral neutral
                    } else if (toggles["Nasal"].state === -1) { // Nasal Neutral
                    setToggleState("Lateral", 0); // Lateral neutral
                }
                break;
            case "Lateral":
                if (toggles["Lateral"].state === 1) { // Lateral ON
                    setToggleState("Nasal", -1); // Nasal OFF
                } else if (toggles["Lateral"].state === 0) { // Lateral Neutral
                    setToggleState("Nasal", 0); // Nasal neutral
                    } else if (toggles["Lateral"].state === -1) { // Lateral Neutral
                    setToggleState("Nasal", 0); // Nasal neutral
                }
                break;
            case "Vozeado":
                if (toggles["Vozeado"].state === -1) { // Vozeado OFF
                    setToggleState("Soante", -1); // Soante OFF
                    setToggleState("Silábico", -1); // Silábico OFF
                    setToggleState("Consonantal", 1); // Consonantal ON
                } else if (toggles["Vozeado"].state === 1) { // Vozeado ON
                    setToggleState("Soante", 0); // Soante neutral
                    setToggleState("Silábico", 0); // Silábico neutral
                    setToggleState("Consonantal", 0); // Consonantal neutral
                }
                break;
            case "Soltura Retardada":
                if (toggles["Soltura Retardada"].state === 1) { // Soltura Retardada ON
                    setToggleState("Contínuo", -1); // Contínuo OFF
                    setToggleState("Consonantal", 1); // Consonantal ON
                    setToggleState("Silábico", -1); // Silábico OFF
                    setToggleState("Soante", -1); // Soante OFF
                    setToggleState("Anterior", -1); // Anterior OFF
                    setToggleState("Nasal", -1); // Nasal OFF
                    setToggleState("Lateral", -1); // Lateral OFF
                } else if (toggles["Soltura Retardada"].state === 0) { // Soltura Retardada Neutral
                    setToggleState("Contínuo", 0); // Contínuo neutral
                    setToggleState("Consonantal", 0); // Consonantal neutral
                    setToggleState("Silábico", 0); // Silábico neutral
                    setToggleState("Soante", 0); // Soante neutral
                    setToggleState("Anterior", 0); // Anterior neutral
                    setToggleState("Nasal", 0); // Nasal neutral
                    setToggleState("Lateral", 0); // Lateral neutral
                }
                break;
            case "Alto":
                if (toggles["Alto"].state === 1) { // Alto ON
                    setToggleState("Baixo", -1); // Baixo OFF
                } else if (toggles["Alto"].state === 0) { // Alto Neutral
                    setToggleState("Baixo", 0); // Baixo neutral
                }
                break;
            case "Baixo":
                if (toggles["Baixo"].state === 1) { // Baixo ON
                    setToggleState("Alto", -1); // Alto OFF
                } else if (toggles["Baixo"].state === 0) { // Baixo Neutral
                    setToggleState("Alto", 0); // Alto neutral
                }
                break;
        }
    }

    // REVISADO: Função para gerar símbolos de fonemas com a nova estrutura de divisões e um wrapper
    function getPhonemeSymbols(symbols) {
        // Remover os colchetes daqui
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

    const placesOfArticulation = ["BILABIAL", "LABIODENTAL", "ALVEOLAR", "PÓS-ALVEOLAR", "PALATAL", "VELAR", "UVULAR", "FARINGAL", "GLOTAL"];
    const mannersOfArticulation = ["OCLUSIVA", "NASAL", "VIBRANTE", "TEPE", "FRICATIVA", "AFRICADA", "RETROFLEXO", "LATERAL"];

    let headerRow = '<tr><th></th>';
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

            if (manner === "OCLUSIVA") {
                if (place === "BILABIAL") { phonemesInCell = ["p", "b"]; }
                else if (place === "ALVEOLAR") { phonemesInCell = ["t", "d"]; }
                else if (place === "VELAR") { phonemesInCell = ["k", "g"]; }
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
                else if (place === "VELAR") { phonemesInCell = ["x", "ɣ"]; }
                else if (place === "UVULAR") { phonemesInCell = ["χ", "ʁ"]; }
                else if (place === "GLOTAL") { phonemesInCell = ["h", "ɦ"]; }
            } else if (manner === "AFRICADA") {
                if (place === "PÓS-ALVEOLAR") { phonemesInCell = ["tʃ", "dʒ"]; }
            } else if (manner === "RETROFLEXO") {
                if (place === "PÓS-ALVEOLAR") { phonemesInCell = ["ɹ"]; }
            } else if (manner === "LATERAL") {
                if (place === "ALVEOLAR") { phonemesInCell = ["l"]; }
                else if (place === "PALATAL") { phonemesInCell = ["ʎ"]; }
            }
            cellContent = getPhonemeSymbols(phonemesInCell); // Passa o array para a função
            row += `<td data-phonemes="${phonemesInCell.join(',')}">${cellContent}</td>`;
        });
        row += '</tr>';
        consonantBody.innerHTML += row;
    });
    consonantTable.appendChild(consonantBody);


    // Vowels Table Generation
    const vowelsTable = document.querySelector('.vowels-table');
    vowelsTable.innerHTML = `
        <thead>
            <tr>
                <th rowspan="2" class="border-top-single border-left-single border-right-double"></th> <th colspan="2" class="feature-label-horizontal border-top-single border-bottom-single border-right-double">+alto</th> <th colspan="2" class="feature-label-horizontal border-top-single border-bottom-single border-right-single">-alto</th> </tr>
            <tr>
                <th class="feature-label-horizontal border-bottom-double border-right-single">-recuado</th> <th class="feature-label-horizontal border-bottom-double border-right-double">+recuado</th> <th class="feature-label-horizontal border-bottom-double border-right-single">-recuado</th> <th class="feature-label-horizontal border-bottom-double border-right-single">+recuado</th> </tr>
        </thead>
        <tbody>
            <tr>
                <td rowspan="2" class="feature-label-vertical border-left-single border-bottom-double">-baixo</td> <td data-phonemes="i" class="border-right-single border-bottom-single">${getPhonemeSymbols(["i"])}</td>
                <td data-phonemes="ɪ" class="border-right-double border-bottom-single">${getPhonemeSymbols(["ɪ"])}</td>
                <td data-phonemes="e" class="border-right-single border-bottom-single">${getPhonemeSymbols(["e"])}</td>
                <td data-phonemes="o" class="border-right-single border-bottom-single">${getPhonemeSymbols(["o"])}</td>
            </tr>
            <tr>
                <td class="empty-cell border-right-single border-bottom-double"></td>
                <td class="empty-cell border-right-double border-bottom-double"></td>
                <td data-phonemes="u" class="border-right-single border-bottom-double">${getPhonemeSymbols(["u"])}</td>
                <td data-phonemes="ʊ" class="border-right-single border-bottom-double">${getPhonemeSymbols(["ʊ"])}</td>
            </tr>
            <tr>
                <td rowspan="1" class="feature-label-vertical border-left-single border-bottom-double">+baixo</td> <td colspan="2" class="empty-cell border-right-double border-bottom-double"></td>
                <td data-phonemes="ɛ" class="border-right-single border-bottom-double">${getPhonemeSymbols(["ɛ"])}</td>
                <td data-phonemes="ɔ,a" class="border-right-single border-bottom-double">${getPhonemeSymbols(["ɔ", "a"])}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="recuado-header-row">
                <th class="border-left-single border-right-double border-top-double"></th> <th colspan="2" class="feature-label-horizontal border-top-double border-right-double">-recuado</th>
                <th colspan="2" class="feature-label-horizontal border-top-double border-right-single">+recuado</th>
            </tr>
        </tfoot>
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

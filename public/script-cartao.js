// public/script-cartao.js
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');

    if (!dataParam) {
        document.body.innerHTML = '<h1>Erro: Dados não encontrados.</h1>';
        return;
    }

    try {
        const state = JSON.parse(decodeURIComponent(dataParam));
        const cartaoDiv = document.getElementById('cartao-final');

        const frenteDiv = document.createElement('div');
        frenteDiv.className = 'ladoFrente';

        // 1. Aplica o fundo
        const bg = state.background;
        const backgroundStyle = bg.type === 'solid'
            ? bg.solidColor
            : `linear-gradient(${bg.gradientAngle}deg, ${bg.gradientColors.join(', ')})`;
        frenteDiv.style.background = backgroundStyle;
        frenteDiv.style.color = '#ffffff';

        // 2. Cria o grid
        frenteDiv.style.gridTemplateColumns = state.colSizes.join(' ');
        frenteDiv.style.gridTemplateRows = state.rowSizes.join(' ');

        // 3. Renderiza os widgets
        const totalCells = state.colSizes.length * state.rowSizes.length;
        for (let i = 0; i < totalCells; i++) {
            const celula = document.createElement('div');
            celula.className = 'gridCell';

            const widgetsNestaCelula = state.widgets.filter(w => w.gridCell === i);
            widgetsNestaCelula.forEach(widget => {
                const widgetElement = document.createElement('div');
                widgetElement.className = 'widget';
                Object.assign(widgetElement.style, widget.styles);

                if (['logo', 'qrcode'].includes(widget.type)) {
                    widgetElement.innerHTML = `<img src="${widget.content}" alt="${widget.type}">`;
                } else {
                    widgetElement.textContent = widget.content;
                }
                celula.appendChild(widgetElement);
            });
            frenteDiv.appendChild(celula);
        }

        cartaoDiv.appendChild(frenteDiv);

    } catch (error) {
        document.body.innerHTML = '<h1>Erro ao processar os dados do cartão.</h1>';
        console.error(error);
    }
});
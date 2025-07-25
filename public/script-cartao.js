// public/script-cartao.js (VERSÃO FINAL E CORRIGIDA)

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

        // --- LÓGICA DE ESTILO APRIMORADA ---

        function hexToRgba(hex, alpha = 1) {
            const numericAlpha = typeof alpha === 'string' ? parseFloat(alpha) : alpha;
            let r=0,g=0,b=0;
            if(hex.length==4){r="0x"+hex[1]+hex[1];g="0x"+hex[2]+hex[2];b="0x"+hex[3]+hex[3];}
            else if(hex.length==7){r="0x"+hex[1]+hex[2];g="0x"+hex[3]+hex[4];b="0x"+hex[5]+hex[6];}
            return `rgba(${+r},${+g},${+b},${numericAlpha})`;
        }

        // 1. Constrói a camada de fundo (AGORA CORRIGIDO)
        const bg = state.background;
        const backgroundLayer = bg.type === 'solid'
            ? hexToRgba(bg.solidColor, bg.solidOpacity)
            : `linear-gradient(${bg.gradientAngle}deg, ${bg.gradientColors.map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;
        
        // 2. Constrói a camada de sobreposição
        let overlayLayer = '';
        if (state.overlay && state.overlay.isActive) {
            const ov = state.overlay;
            overlayLayer = ov.type === 'solid'
                ? hexToRgba(ov.solidColor, ov.solidOpacity)
                : `linear-gradient(${ov.gradientAngle}deg, ${ov.gradientColors.map(c => hexToRgba(c.color, c.opacity)).join(', ')})`;
        }

        // 3. Combina as camadas
        const combinedBackground = overlayLayer ? `${overlayLayer}, ${backgroundLayer}` : backgroundLayer;
        frenteDiv.style.background = combinedBackground;
        
        // --- LÓGICA DE LAYOUT E WIDGETS ---
        
        frenteDiv.style.gridTemplateColumns = state.colSizes.join(' ');
        frenteDiv.style.gridTemplateRows = state.rowSizes.join(' ');

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
                    // Adiciona a imagem dentro do widget
                    widgetElement.innerHTML = `<img src="${widget.content || ''}" alt="${widget.type}">`;
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
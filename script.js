document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const resultArea = document.getElementById('result-area');
    const container = document.querySelector('.container');
    const effectOverlay = document.getElementById('effect-overlay');
    const statusText = document.querySelector('.status-text');

    // Cyberpunk Omikuji Results
    const omikujiResults = [
        { text: 'DAI-KICHI', jp: '大吉', type: 'god', weight: 10 },    // SSR
        { text: 'KICHI', jp: '吉', type: 'normal', weight: 30 },
        { text: 'CHU-KICHI', jp: '中吉', type: 'normal', weight: 30 },
        { text: 'SUE-KICHI', jp: '末吉', type: 'normal', weight: 20 },
        { text: 'MEGA-KYO', jp: '大凶', type: 'danger', weight: 10 }   // Critical Fail
    ];

    drawBtn.addEventListener('click', () => {
        // Reset effects
        resetEffects();

        // Computing Effect (Random text loop)
        let count = 0;
        const maxCount = 10;
        statusText.textContent = "HACKING DESTINY...";

        const interval = setInterval(() => {
            const tempResult = omikujiResults[Math.floor(Math.random() * omikujiResults.length)];
            resultArea.innerHTML = `<span class="result-text" style="font-size: 2rem; opacity: 0.7;">${tempResult.text}</span>`;
            count++;

            if (count >= maxCount) {
                clearInterval(interval);
                finalizeResult();
            }
        }, 50); // Fast switching
    });

    function finalizeResult() {
        const result = getWeightedResult();

        // Show Final Result
        resultArea.innerHTML = '';
        const resultSpan = document.createElement('span');
        resultSpan.textContent = result.text;
        resultSpan.className = 'result-text';

        const subSpan = document.createElement('div');
        subSpan.textContent = `[ ${result.jp} ]`;
        subSpan.style.fontSize = '1rem';
        subSpan.style.marginTop = '10px';
        subSpan.style.color = '#aaa';

        resultArea.appendChild(resultSpan);
        resultArea.appendChild(subSpan);

        statusText.textContent = "ACCESS GRANTED: FATE DOWNLOADED";

        // Apply Special Effects based on type
        applyEffects(result.type);
    }

    function getWeightedResult() {
        // Simple weighted random logic
        const totalWeight = omikujiResults.reduce((acc, item) => acc + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of omikujiResults) {
            if (random < item.weight) {
                return item;
            }
            random -= item.weight;
        }
        return omikujiResults[0];
    }

    function applyEffects(type) {
        if (type === 'god') {
            // 大吉: God Mode
            container.classList.add('mode-god');
            effectOverlay.classList.add('flash-god');
            drawBtn.style.color = 'gold';
            drawBtn.style.borderColor = 'gold';
        } else if (type === 'danger') {
            // 大凶: Danger Mode
            container.classList.add('mode-glitch');
            effectOverlay.classList.add('flash-danger');
            statusText.textContent = "WARNING: VIRUS DETECTED";
            statusText.style.color = "red";
        }
    }

    function resetEffects() {
        container.classList.remove('mode-god', 'mode-glitch');
        effectOverlay.classList.remove('flash-god', 'flash-danger');
        drawBtn.style.color = ''; // reset to css default
        drawBtn.style.borderColor = '';
        statusText.style.color = '';
    }
});

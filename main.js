class LottoBall extends HTMLElement {
    constructor() {
        super();
        const template = document.getElementById('lotto-ball-template').content;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.cloneNode(true));

        this.number = this.getAttribute('number');
        const ball = shadowRoot.querySelector('.lotto-ball');
        ball.textContent = this.number;

        const color = this.getColorForNumber(this.number);
        ball.style.backgroundColor = color;
    }

    getColorForNumber(number) {
        const colors = ['#fbc400', '#ff7f50', '#6495ed', '#9acd32', '#e4717a'];
        return colors[Math.floor((number - 1) / 10)];
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoDisplay = document.querySelector('.lotto-display');
const historyList = document.getElementById('history-list');

const history = [];

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function updateHistory() {
    historyList.innerHTML = '';
    history.forEach(numbers => {
        const listItem = document.createElement('li');
        numbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            listItem.appendChild(lottoBall);
        });
        historyList.appendChild(listItem);
    });
}

generateBtn.addEventListener('click', () => {
    const newNumbers = generateNumbers();

    lottoDisplay.innerHTML = '';
    newNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoDisplay.appendChild(lottoBall);
    });

    history.unshift(newNumbers);
    if (history.length > 5) {
        history.pop();
    }

    updateHistory();
});

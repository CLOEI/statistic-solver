const columnForm = document.querySelector('.column-input');
const calculate = document.querySelector('header > button');
const srInfo = document.querySelector('.sr');
const sdInfo = document.querySelector('.sd');
const xperInfo = document.querySelector('.xper');
const fiTotalInfo = document.querySelector('.fitotal');
const fixiTotalInfo = document.querySelector('.fixitotal');
const fiabsximinxperInfo = document.querySelector('.fiabsximinxper');
const fiximinxperpow2Info = document.querySelector('.fiximinxperpow2');


columnForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target[0];
    addInput(Number(input.value));
    e.target.remove();
})

calculate.addEventListener('click', (e) => {
    const scoreList = document.getElementsByClassName('score-input');
    let scoreObj = [];
    Array.from(scoreList, (elem) => {
        const splitString = elem.value.split('-');
        scoreObj.push([splitString[0], splitString[1]]);
    })
    e.target.style.opacity = 0;
    calculateAll(scoreObj);
})

function calculateAll(scoreObj) {
    const func = [...document.querySelectorAll('.function > input')];

    // calculate xi & xi.fi
    scoreObj.forEach((val) => {
        calcxi(val[0], val[1]);
    })

    // calculate xi.fi
    const xi = [...document.querySelectorAll('.xi > p')];

    xi.forEach((val, i) => {
        calcfixi(func[i].value, val.textContent);
    })

    // Total xi.fi & fi
    const xifi = [...document.querySelectorAll('.xifi > p')];

    const fiTotal = func.reduce((pre, curr, i) => pre + Number(curr.value), 0);
    const xifiTotal = xifi.reduce((pre, curr) => pre + Number(curr.textContent), 0);

    fiTotalInfo.innerHTML = `<i>f</i><sub>i</sub> total : ${fiTotal}`;
    fixiTotalInfo.innerHTML = `<i>f</i><sub>i</sub> . <i>x</i><sub>i</sub> total : ${xifiTotal}`;

    // calculate xper
    const xper = (xifiTotal / fiTotal).toFixed(3);
    xperInfo.innerHTML = `xper : ${xper}`

    // calculate xi-xper
    xi.forEach((val) => {
        calcximinxper(val.textContent, xper);
    })

    // calculate |xi-xper|
    const ximinxper = [...document.querySelectorAll('.xi-xper > p')];

    ximinxper.forEach((val) => {
        calcabsximinxper(val.textContent);
    })

    // calculate fi|xi-xper|
    const absximinxper = [...document.querySelectorAll('.absxi-xper > p')];

    absximinxper.forEach((val, i) => {
        console.log(func[i].value, val.textContent);
        calcfiabsximinxper(func[i].value, val.textContent);
    })

    // calculate total fi|xi-xper|
    const fiabsximinxper = [...document.querySelectorAll('.fiabsxi-xper > p')];
    const fiabsximinxperTotal = fiabsximinxper.reduce((pre, curr) => pre + Number(curr.textContent), 0).toFixed(3);

    fiabsximinxperInfo.innerHTML = `<i>f</i><sub>i</sub> | x<sub>i</sub> - xper | total : ${fiabsximinxperTotal}`;

    // calculate SR
    calcSR(fiabsximinxperTotal, fiTotal);

    // calculate ( xi - xper )^2
    ximinxper.forEach((val) => {
        calcximinxperpow2((val.textContent));
    })

    // calculate fi ( xi - xper )^2
    const xixperpw2 = document.querySelectorAll('.xi-xperpw2 > p');

    xixperpw2.forEach((val, i) => {
        calcfiximinxperpow2(func[i].value, val.textContent);
    })

    // calculate total fi ( xi - xper )^2
    const fixixperpw2 = [...document.querySelectorAll('.fixi-xperpw2 > p')];
    const fixixperpw2Total = fixixperpw2.reduce((pre, curr) => pre + Number(curr.textContent), 0);

    fiximinxperpow2Info.innerHTML = `<i>f</i><sub>i</sub> ( x<sub>i</sub> - xper )<sup>2</sup> total : ${fixixperpw2Total}`;

    // calculate SD
    calculateSD(fixixperpw2Total, fiTotal);

}

function addInput(n) {
    const scoreTable = document.querySelector('.score');
    const funcTable = document.querySelector('.function');

    for (let x = 0; x < n; x++) {
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.classList.add('score-input');
        scoreTable.append(newInput);
    }
    for (let x = 0; x < n; x++) {
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'number');
        newInput.classList.add('function-input');
        funcTable.append(newInput);
    }
}

function calcxi(Bb, Ba) {
    const xiTable = document.querySelector('.xi');
    const xi = 1 / 2 * (Number(Bb) + Number(Ba));
    const newP = document.createElement('p');
    newP.textContent = xi;

    xiTable.append(newP);
}

function calcfixi(fi, xi) {
    const xifiTable = document.querySelector('.xifi');
    const newP = document.createElement('p');
    newP.textContent = Number(fi) * Number(xi);

    xifiTable.append(newP);
}

function calcximinxper(xi, xper) {
    const ximinxper = document.querySelector('.xi-xper');
    const newP = document.createElement('p');
    newP.textContent = (Number(xi) - Number(xper)).toFixed(3);

    ximinxper.append(newP);
}

function calcabsximinxper(ximinxper) {
    const absximinxper = document.querySelector('.absxi-xper');
    const newP = document.createElement('p');
    newP.textContent = Math.abs(Number(ximinxper));

    absximinxper.append(newP);
}

function calcfiabsximinxper(fi, absximinxperval) {
    const fiabsximinxper = document.querySelector('.fiabsxi-xper');
    const newP = document.createElement('p');
    newP.textContent = (Number(fi) * Number(absximinxperval)).toFixed(3);

    fiabsximinxper.append(newP);
}

function calcSR(fiabsximinxperTotal, fiTotal) {
    srInfo.innerHTML = `SR : ${(Number(fiabsximinxperTotal) / Number(fiTotal)).toFixed(3)}`;
}

function calcximinxperpow2(ximinxper) {
    const xixperpw2 = document.querySelector('.xi-xperpw2');
    const newP = document.createElement('p');
    newP.textContent = Math.pow(Number(ximinxper), 2).toFixed(2);

    xixperpw2.append(newP);
}

function calcfiximinxperpow2(fi, ximinxperpow2) {
    const fixixperpw2 = document.querySelector('.fixi-xperpw2');
    const newP = document.createElement('p');
    newP.textContent = (Number(fi) * Number(ximinxperpow2)).toFixed(2);

    fixixperpw2.append(newP);
}

function calculateSD(fiximinxperpow2, fitotal) {
    const SD = Math.pow(Number(fiximinxperpow2) / Number(fitotal), 1 / 2);
    sdInfo.innerHTML = `SD : ${SD}`;
}
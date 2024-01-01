const seedColorHex = document.getElementById('color-picker');
const btn = document.querySelector('.btn');

const colorsPicked = document.getElementById('colors');
const colorSchemeDiv = document.querySelector('.color-scheme');

let colorArray = [];

btn.addEventListener('click', () => {
    resetPage();
    callApi();
});

function callApi() {
    const seedColor = seedColorHex.value.toString().slice(1);
    const dropDownColors = colorsPicked.value.toLowerCase();

    fetch(
        `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${dropDownColors}&count=5`
    )
        .then((res) => res.json())
        .then((data) => {
            colorArray = data.colors;

            for (let i = 0; i < colorArray.length; i++) {
                const colorDivWrapper = document.createElement('div');
                colorDivWrapper.className = 'color-div-wrapper';

                const displayColorDiv = document.createElement('div');
                displayColorDiv.style.backgroundColor = colorArray[i].hex.value;
                displayColorDiv.className = 'color-display';

                const displayColorText = document.createElement('p');
                displayColorText.textContent = colorArray[i].hex.value;
                displayColorText.className = 'display-color-text';

                colorDivWrapper.appendChild(displayColorDiv);
                colorDivWrapper.appendChild(displayColorText);

                colorSchemeDiv.appendChild(colorDivWrapper);
            }
        });
}

function resetPage() {
    const colorDivWrappers = document.querySelectorAll('.color-div-wrapper');

    for (const divWrapper of colorDivWrappers) {
        divWrapper.remove();
    }
}

callApi();

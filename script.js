const theGridSize = document.forms.gridSize;

const color = document.getElementById('color');

const tileMode = document.getElementById('modeDisplay');

const displayHeight = document.getElementById('gridHeightDisplay');
const displayWidth = document.getElementById('gridWidthDisplay');

const userHeight = document.getElementById('inputHeight');
const userWidth = document.getElementById('inputWidth');

const grid = document.getElementById('table');

let gridTileModeTD = 'paint';

theGridSize.submitGrid.onclick = function makeGrid(e) {

    e.preventDefault();
    
    let mouseIsDown = false;

    const rows = userHeight.value;
    const columns = userWidth.value;

    while (grid.hasChildNodes()) {

        grid.removeChild(grid.lastChild); // delete any previous table rows

    }

    let tableRows = '';

    let acumula = 1;

    while (acumula <= rows) {

        tableRows += '<tr>';

        for (let i = 1; i <= columns; i++) {

            tableRows += '<td></td>';

        }

        tableRows += '</tr>';

        acumula += 1;

    }

    grid.insertAdjacentHTML('afterbegin', tableRows);

    grid.addEventListener("click", function (e) {

        e.preventDefault();

        paintOrEraseTiles(e.target);

    });

    grid.addEventListener('mousedown', function (e) {

        e.preventDefault();

        mouseIsDown = e.which === 1 ? true : false;

    });

    document.addEventListener('mouseup', function (e) {

        e.preventDefault();

        mouseIsDown = false;

    });

    grid.addEventListener('mouseover', function (e) {

        e.preventDefault();

        if (mouseIsDown) {

            paintOrEraseTiles(e.target);

        }

    });

};

function paintOrEraseTiles(targetCell) {

    if (targetCell.nodeName === 'TD') {

        targetCell.style.backgroundColor = gridTileModeTD === 'paint' ? color.value : 'transparent';

    } else {

        console.log("Nice try: " + targetCell.nodeName + " talk to the hand!");

    }

}


theGridSize.height.oninput = function () {

    displayHeight.innerHTML = theGridSize.height.value;

};

theGridSize.width.oninput = function () {

    displayWidth.innerHTML = theGridSize.width.value;

};

color.oninput = function () {

    gridTileModeTD = 'paint';

    tileMode.innerHTML = gridTileModeTD;

};

document.getElementById('clearGrid').addEventListener('click', function () {

    let tiles = grid.getElementsByTagName('td');

    for (let i = 0; i <= tiles.length; i++) {

        tiles[i].style.backgroundColor = 'transparent';

    }

});

document.getElementById('mode').addEventListener('click', function (e) {

    gridTileModeTD = e.target.className.indexOf('paint') >= 0 ? 'paint' : 'erase';

    tileMode.innerHTML = gridTileModeTD;

});
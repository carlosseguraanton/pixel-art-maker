
const theGridSize = document.forms.gridSize;

const color = document.getElementById('color');

const tileMode = document.getElementById('modeDisplay');

const displayHeight = document.getElementById('gridHeightDisplay');
const displayWidth = document.getElementById('gridWidthDisplay');

const userHeight = document.getElementById('inputHeight');
const userWidth = document.getElementById('inputWidth');

const table = document.getElementById('table');

let gridTileModeTableData_TD = 'paint';

theGridSize.submitGrid.onclick = function makeGrid(e) {

    e.preventDefault();

    let mouseIsDown = false;

    const rows = userHeight.value;
    const columns = userWidth.value;

    // delete any previous table rows
    while (table.hasChildNodes()) {

        table.removeChild(table.lastChild);

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

    table.insertAdjacentHTML('afterbegin', tableRows);

    table.addEventListener("click", function (e) {

        e.preventDefault();

        paintOrEraseTiles(e.target);

    });

    table.addEventListener('mousedown', function (e) {

        e.preventDefault();

        mouseIsDown = e.which === 1 ? true : false;

    });

    document.addEventListener('mouseup', function (e) {

        e.preventDefault();

        mouseIsDown = false;

    });

    table.addEventListener('mouseover', function (e) {

        e.preventDefault();

        if (mouseIsDown) {

            paintOrEraseTiles(e.target);

        }

    });

};

function paintOrEraseTiles(targetCell) {

    if (targetCell.nodeName === 'TD') {

        targetCell.style.backgroundColor = gridTileModeTableData_TD === 'paint' ? color.value : 'transparent';

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

    gridTileModeTableData_TD = 'paint';

    tileMode.innerHTML = gridTileModeTableData_TD;

};

document.getElementById('clearGrid').addEventListener('click', function () {

    let tiles = table.getElementsByTagName('td');

    for (let i = 0; i <= tiles.length; i++) {

        tiles[i].style.backgroundColor = 'transparent';

    }

});

document.getElementById('mode').addEventListener('click', function (e) {

    gridTileModeTableData_TD = e.target.className.indexOf('paint') >= 0 ? 'paint' : 'erase';

    tileMode.innerHTML = gridTileModeTableData_TD;

});



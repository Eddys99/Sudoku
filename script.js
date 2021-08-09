var selectedCell;
var selectedBtn;
var cellsToComplete = 56;

window.onload = function createGame() {
    for (var i = 1; i <= 9; ++i) {
        var createLine = document.createElement('tr');
        var btn = document.createElement('button');
        createLine.setAttribute("id", i);
        btn.setAttribute("class", "btn btn-primary");
        btn.setAttribute("id", 0 + "" + i);
        btn.setAttribute("onclick", "selectBtn(this.id)");
        document.getElementById("numbers").appendChild(btn);
        btn.innerHTML = i;
        document.getElementById("grid").appendChild(createLine);
        for (var j = 1; j <= 9; ++j) {
            var createCol = document.createElement('td');
            createCol.setAttribute("id", i + "" + j);
            createCol.setAttribute("onclick", "selectCell(this.id)");
            if (j == 3 || j == 6) {
                createCol.setAttribute("class", "rightThickBorder");
            }
            if (i == 4 || i == 7) {
                createCol.setAttribute("class", "upperThickBorder")
            }
            if ((i == 4 || i == 7) && (j == 3 || j == 6)) {
                createCol.setAttribute("class", "bothWaysThickBorder")
            }
            createLine.appendChild(createCol);
            createCol.innerHTML = 0;
            createCol.style.fontSize = "0px";
        }
    }
    generateNumbers();
}

function generateNumbers() {
    for (var i = 1; i <= 25; ++i) {
        var line = Math.floor(Math.random() * 9) + 1;
        var column = Math.floor(Math.random() * 9) + 1;
        var number = Math.floor(Math.random() * 9) + 1;
        var cell = document.getElementById(line + "" + column);
        if ((cell.innerHTML >= 1 && cell.innerHTML <= 9) || checkNumberGenerated(line, column, number) == 0) {
            --i;
        } else {
            cell.removeAttribute("onclick");
            cell.innerHTML = number;
            cell.style.fontSize = "20px";
        }
    }
}

function checkNumberGenerated(line, column, number) {
    for (var i = 1; i <= 9; ++i) {
        var checkColumn = document.getElementById(i + "" + column);
        if (checkColumn.innerHTML == number) {
            return 0;
        }
    }
    for (var i = 1; i <= 9; ++i) {
        var checkColumn = document.getElementById(line + "" + i);
        if (checkColumn.innerHTML == number) {
            return 0;
        }
    }
    line = identifyLineAndColumn(line);
    column = identifyLineAndColumn(column);
    for (var i = line; i <= line + 2; ++i) {
        for (var j = column; j <= column + 2; ++j) {
            cell = document.getElementById(i + "" + j);
            if (cell.innerHTML == number) {
                return 0;
            }
        }
    }
    return 1;
}

function identifyLineAndColumn(value) {
    if (value >= 1 && value <= 3) {
        return value = 1;
    } else if (value >= 4 && value <= 6) {
        return value = 4;

    }
    return value = 7;
}

function selectBtn(btnId) {
    selectedBtn = document.getElementById(btnId).innerHTML;
}

function selectCell(cellId) {
    selectedCell = document.getElementById(cellId);
    if (selectedBtn >= 1) {
        addValueToCell();
    }
}

function addValueToCell() {
    if (selectedCell.innerHTML == 0) {
        --cellsToComplete;
        selectedCell.style.fontSize = "20px";
    }
    selectedCell.innerHTML = selectedBtn;
    checkNumber();
    if (cellsToComplete == 0) {
        check_if_win_or_lose();
    }
}

function checkNumber() {
    var line = selectedCell.id / 10, column = selectedCell.id % 10;
    line = Math.floor(line);
    for (var i = 1; i <= 9; ++i) {
        var checkColumn = document.getElementById(i + "" + column);
        var checkLine = document.getElementById(line + "" + i);
        if (checkColumn.innerHTML == selectedBtn && i != line) {
            return selectedCell.style.backgroundColor = "red";
        }
        if (checkLine.innerHTML == selectedBtn && i != column) {
            return selectedCell.style.backgroundColor = "red";
        }
    }
    var startLine = identifyLineAndColumn(line), startColumn = identifyLineAndColumn(column);
    for (var i = startLine; i <= startLine + 2; ++i) {
        for (var j = startColumn; j <= startColumn + 2; ++j) {
            cell = document.getElementById(i + "" + j);
            if (cell.innerHTML == selectedBtn && (i != line && j != column)) {
                return selectedCell.style.backgroundColor = "red";
            }
        }
    }
    selectedCell.style.backgroundColor = "white";
}

function check_if_win_or_lose() {
    for (var i = 1; i <= 9; ++i) {
        for (var j = 1; j <= 9; ++j) {
            var cell = document.getElementById(i + "" + j);
            if (cell.style.backgroundColor == "red") {
                return document.getElementById("message").innerHTML = "<h3> Lose. </h3>";
            }
        }
    }
    return document.getElementById("message").innerHTML = "<h3> Win ! </h3>";
}
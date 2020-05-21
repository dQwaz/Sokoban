var WALL = "WALL";
var FLOOR = "FLOOR";
var TARGET = "TARGET";
var player = "PLAYER";
var BOX = "BOX"
var gPlayerPos = {
    i: 2,
    j: 2
};
var gBoard = buildBoard();








function buildBoard() {
    //Vytvorenie poľa
    var board = new Array(10);

    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(10);
    }
    //Dat floor všade a wall po krajoch
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {

            var cell = {
                type: FLOOR,
                gameElement: null
            };

            //ak na kraji
            if (i == 0 || i == board.length - 1 || j == 0 || j == board[0].length - 1) {
                cell.type = WALL;
            } else {

            }
            board[i][j] = cell;
        }
    }

    board[8][6] = {
        type: TARGET,
        gameElement: null
    };
    board[7][6] = {
        type: TARGET,
        gameElement: null
    };
    board[6][6] = {
        type: TARGET,
        gameElement: null
    };
    board[8][5] = cell;
    board[7][5] = cell;
    board[6][5] = cell;
    board[8][7] = cell;
    board[7][7] = cell;
    board[6][7] = cell;
    board[3][2] = cell;
    board[4][2] = cell;
    board[4][3] = cell;
    board[5][3] = cell;
    board[5][4] = cell;
    board[2][1] = cell;
    board[1][2] = cell;
    board[1][1] = cell;
    board[1][2] = cell;
    board[1][3] = cell;
    board[1][8] = cell;
    board[6][8] = cell;

    board[gPlayerPos.i][gPlayerPos.j].gameElement = player;
    board[2][3].gameElement = BOX;
    board[3][4].gameElement = BOX;
    board[4][5].gameElement = BOX;










    console.log(board);
    return board;
}

function printBoard() {

    var tblBoard = document.getElementById('tblBoard');
    var strHTML = '';

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += "<tr>";

        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            var cellClass;

            if (currCell.type == FLOOR) {
                cellClass = "floor";
            } else if (currCell.type == WALL) {
                cellClass = "wall";
            } else if (currCell.type == TARGET) {
                cellClass = "target";
            }



            strHTML += "<td class='cell " + cellClass + "'   onclick='handleClick(" + i + "," + j + ")' >";

            if (currCell.gameElement == player) {
                strHTML += "<img src='~/img/sokoban_player.gif'>";
            } else if (currCell.gameElement == BOX) {
                strHTML += "<img src='~/img/sokoban_box.gif'>";
            }




            strHTML += "</td>";

        }
        strHTML += "</tr>";
    }

    tblBoard.innerHTML = strHTML;




}

function handleClick(i, j) {


    var iDiff = i - gPlayerPos.i;
    var jDiff = j - gPlayerPos.j;
    var iAbsDiff = Math.abs(i - gPlayerPos.i);
    var jAbsDiff = Math.abs(j - gPlayerPos.j);




    //pohyb ak je bunka 1/4 povolenych
    if ((iAbsDiff == 1 && jAbsDiff == 0) || (jAbsDiff == 1 && iAbsDiff == 0)) {

        if (gBoard[i][j].type != WALL) {





            //console.log("hybem sa");

            var canMove = true;

            if (gBoard[i][j].gameElement == BOX) {
                if (gBoard[i + iDiff][j + jDiff].type != WALL && gBoard[i + iDiff][j + jDiff].gameElement == null) {

                    //pohyb krabice
                    gBoard[i][j].gameElement = null;
                    gBoard[i + iDiff][j + jDiff].gameElement = BOX;

                } else {
                    //nemožem pohnuť, lebo je stena
                    canMove = false;
                }
            }


            if (canMove) {

                gBoard[gPlayerPos.i][gPlayerPos.j].gameElement = null;
                gPlayerPos.i = i;
                gPlayerPos.j = j;
                gBoard[gPlayerPos.i][gPlayerPos.j].gameElement = player;


                var spnStepsCount = document.getElementById('spnStepsCount');
                spnStepsCount.innerHTML++;

                printBoard();

                checkVictory();

            }
        }

    }






}

function checkVictory() {
    var isVictory = true;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];

            if (currCell.type == TARGET && currCell.gameElement != BOX) isVictory = false;
        }

    }
    //if (isVictory) alert("Vyhral si");
    if (isVictory) window.location = "/levels/level2.html";


}



function handleKey(event) {
    // console.log(event);
    var i = gPlayerPos.i;
    var j = gPlayerPos.j;
    switch (event.keyCode) {
        case 37:
            handleClick(i, j - 1);
            break;
        case 38:
            handleClick(i - 1, j);
            break;
        case 39:
            handleClick(i, j + 1);
            break;
        case 40:
            handleClick(i + 1, j);
            break;
    }
}
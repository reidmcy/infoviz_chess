function onChange (oldPos, newPos) {
  document.getElementById("fen_input").value = Chessboard.objToFen(newPos);
}

var board = Chessboard(
                    'board', {
                    position : 'start',
                    draggable : true,
                    sparePieces  : true,
                    dropOffBoard : 'trash',
                    onChange : onChange,
                });

$('#resetBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)
$('#flipBtn').on('click', board.flip)

document.getElementById("startBtn").onclick = function () {
    location.href = "/root/" + Chessboard.objToFen(board.position());
};

document.getElementById("fen_input").value = Chessboard.objToFen(board.position());

function update_board(new_fen) {
    board = Chessboard(
                        'board', {
                        position : new_fen,
                        draggable : true,
                        sparePieces  : true,
                        dropOffBoard : 'trash',
                        onChange : onChange,
                    })
}

document.dropdown_form.tricky_lines_dropdown.onChange = function (d) {
    conosole.log(d);
    update_board(d.options[d.options.selectedIndex].value);
}

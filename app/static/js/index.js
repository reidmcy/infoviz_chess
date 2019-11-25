var board = Chessboard(
                    'board', {
                    position : 'start',
                    draggable : true,
                    sparePieces  : true,
                    dropOffBoard : 'trash',
                });

$('#resetBtn').on('click', board.start)
$('#clearBtn').on('click', board.clear)
$('#flipBtn').on('click', board.flip)

document.getElementById("startBtn").onclick = function () {
    console.log(Chessboard.objToFen(board.position()));
        location.href = "/root/" + Chessboard.objToFen(board.position());
    };

        let currentPlayer = 'X';
        let board = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;

        function makeMove(cell, index) {
            if (board[index] === '' && gameActive) {
                board[index] = currentPlayer;
                cell.innerText = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function checkWinner() {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            for (let condition of winningConditions) {
                const [a, b, c] = condition;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    alert(`¡El jugador ${board[a]} ha ganado!`);
                    gameActive = false;
                    return;
                }
            }

            if (!board.includes('')) {
                alert('¡Es un empate!');
                gameActive = false;
            }
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            gameActive = true;
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.innerText = '');
        }
        document.addEventListener('DOMContentLoaded',()=>{
            const paraancho=document.querySelectorAll('.cell');
            paraancho.forEach(casilla => {
                const ancho=casilla.offsetWidth;
                casilla.style.height=ancho+"px";
                casilla.style.fontSize=ancho/1.5+"px"
                const elementoAnterior = casilla.previousElementSibling;
                const elementoSiguiente = casilla.nextElementSibling;
                const padre=casilla.parentNode;

                !elementoAnterior ? casilla.classList.add('border-end'):'';
                !elementoSiguiente ? casilla.classList.add('border-start'):'';
                padre.id==='linea1' ? casilla.classList.add('border-bottom'):'';
                padre.id==='linea2' ? casilla.classList.add('border-bottom'):'';
            });
        })
        
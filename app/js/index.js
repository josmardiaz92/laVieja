class LaVieja {
    constructor() {
        this.currentPlayer = 'X';
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.juegoActivo = true;
        this.cells = document.querySelectorAll('.cell');
        this.iniciar();
    }

    iniciar() {
        document.addEventListener('DOMContentLoaded', () => {
            this.cells.forEach((cell) => {
                const ancho = cell.offsetWidth;
                cell.style.height = ancho + "px";
                cell.style.fontSize = ancho / 1.5 + "px";
                this.dibujarBordes(cell);
            });
        });
    }

    dibujarBordes(cell) {
        const elementoAnterior = cell.previousElementSibling;
        const elementoSiguiente = cell.nextElementSibling;
        const padre = cell.parentNode;

        !elementoAnterior ? cell.style.borderRight = '2px solid #1919a6' : '';
        !elementoSiguiente ? cell.style.borderLeft = '2px solid #1919a6' : '';
        padre.id==='linea1' || padre.id==='linea2' ? cell.style.borderBottom = '2px solid #1919a6':'';
    }

    tomarMovimiento(cell, index) {
        if (this.tablero[index] === '' && this.juegoActivo) {
            this.tablero[index] = this.currentPlayer;
            this.currentPlayer==='X' ? cell.innerHTML=`<img src="img/x.png" alt="X" class="img-fluid p-4">`: cell.innerHTML=`<img src="img/o.png" alt="X" class="img-fluid p-4">`;
            let ficha = cell.querySelector('img');
            //ficha.innerText = this.currentPlayer;
            ficha.classList.add('puff-in-center');
            this.verificarGanador();
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    verificarGanador() {
        const consicionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condicion of consicionesGanadoras) {
            const [a, b, c] = condicion;
            if (this.tablero[a] && this.tablero[a] === this.tablero[b] && this.tablero[a] === this.tablero[c]) {
                this.cells.forEach(celda=>{
                    if(celda.id==a || celda.id==b || celda.id==c){
                        celda.classList.add('colorGanador')
                    }else{
                    }
                })
                alert(`¡El jugador ${this.tablero[a]} ha ganado!`);
                this.juegoActivo = false;
                return;
            }
        }

        if (!this.tablero.includes('')) {
            alert('¡Es un empate!');
            this.juegoActivo = false;
        }
    }

    restaurarJuego() {
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.juegoActivo = true;
        this.cells.forEach(cell => {
            cell.innerText = '<span></span>';
            cell.classList.remove('colorGanador');
        });
    }
}

const juego = new LaVieja();
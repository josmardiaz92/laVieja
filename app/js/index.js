class LaVieja {
    constructor() {
        this.jugadorActual = 'X';
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.juegoActivo = true;
        this.cells = document.querySelectorAll('.cell');
        this.menu=document.getElementById('contenedorMenu');
        this.contenedorTablero=document.getElementById('contenedorTablero');
        this.titulo=document.getElementById('titulo');
        this.instrucciones=`
            ¡Bienvenido al clásico juego de la vieja! También conocido como tres en línea o tic-tac-toe, el objetivo es sencillo: ¡ser el primero en alinear tres fichas! Coloca tu ficha en un espacio vacío y ¡a ganar!
        `;
        this.btnMenu=document.getElementById('btnMenu');
        this.jugadores=[
            {nombre:'Jugador 1',simbolo:'X'},
            {nombre:'Jugador 2',simbolo:'O'},
        ];

        this.dibujarMenu();
    }

    dibujarMenu(){
            this.quitarJuego();

            this.titulo.classList.add('agrandar');
            setTimeout(() => {
                this.titulo.classList.remove('col-4', 'agrandar');
                this.titulo.classList.add('col-8');
            }, 500);

            this.btnMenu.classList.add('d-none');

            this.menu.innerHTML=`
            <div class="row d-flex flex-column align-items-center mt-5">
                <div class="col-6" onclick="juego.iniciarJuego()">
                    <img src="img/nuevoJuego.png" alt="Nuevo Juego" class="img-fluid">
                </div>
                <div class="col-6" onclick="juego.mostrarInstrucciones()">
                    <img src="img/Instrucciones.png" alt="Nuevo Juego" class="img-fluid">
                </div>
            </div>
            `
    }

    quitarMenu(){
        this.menu.innerHTML="";
        this.titulo.classList.add('reducir');
        setTimeout(() => {
            this.titulo.classList.remove('col-8', 'reducir');
            this.titulo.classList.add('col-4');
        }, 500);
    }

    mostrarInstrucciones(){
        this.menu.innerHTML=`
        <div class="row d-flex justify-content-center">
            <div class="col-8 text-center">
                <h3>
                    ¡Bienvenido al clásico juego de la vieja! También conocido como tres en línea o tic-tac-toe, el objetivo es sencillo: ¡ser el primero en alinear tres fichas! Coloca tu ficha en un espacio vacío y ¡a ganar!"
                </h3>
                <i class="fa-solid fa-arrow-left fa-2xl mt-5" style="color: #ffff00;" onclick="juego.dibujarMenu()"></i>
            </div>               
        </div>
        `
    }

    iniciarJuego(){
        this.quitarMenu();
        this.restaurarJuego();
        this.contenedorTablero.classList.remove('d-none');
        this.btnMenu.classList.remove('d-none');

        this.jugadores.forEach((jugador,index)=>{
            jugador.nombre=prompt(`Introdusca el nombre del jugador ${index+1}`);
            if(jugador.nombre===''){
                jugador.nombre=`Jugador ${index+1}`;
            }
        })

        this.cells.forEach((cell) => {
            const ancho = cell.offsetWidth;
            cell.style.height = ancho + "px";
            cell.style.fontSize = ancho / 1.5 + "px";
            this.dibujarBordes(cell);
        });
    }

    quitarJuego(){
        this.contenedorTablero.classList.add('d-none');
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
            this.tablero[index] = this.jugadorActual;
            this.jugadorActual==='X' ? cell.innerHTML=`<img src="img/x.png" alt="X" class="img-fluid p-4">`: cell.innerHTML=`<img src="img/o.png" alt="X" class="img-fluid p-4">`;
            let ficha = cell.querySelector('img');
            //ficha.innerText = this.jugadorActual;
            ficha.classList.add('puff-in-center');
            this.verificarGanador();
            this.jugadorActual = this.jugadorActual === 'X' ? 'O' : 'X';
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
                this.mostrarGanador(this.tablero[a]);
                this.juegoActivo = false;
                return;
            }
        }

        if (!this.tablero.includes('')) {
            this.mostrarGanador("empate");
            this.juegoActivo = false;
        }
    }

    restaurarJuego() {
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.jugadorActual = 'X';
        this.juegoActivo = true;
        this.cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('colorGanador');
        });
    }

    mostrarGanador(ganador){
        const modal=document.getElementById('mostrarGanador');
        const instModal=new bootstrap.Modal(modal);
        const resultado=modal.querySelector('.modal-body');
        if(ganador==="empate"){
            resultado.innerHTML=`
                <div class="col">
                    <img src="img/empate.png" alt="GANADOR" class="img-fluid">
                </div>
                <div class="col">
                    <h3>¿ Revancha ?</h3>
                </div>
            `;
        }else{
            ganador==='X' ? ganador=this.jugadores[0].nombre : ganador=this.jugadores[1].nombre;
            resultado.innerHTML=`
                <div class="col">
                    <img src="img/ganador.png" alt="GANADOR" class="img-fluid">
                </div>
                <div class="col">
                    <h3>${ganador}</h3>
                </div>
            `;
        }

        setTimeout(() => {
            instModal.show();
        }, 1000);
    }
}

const juego = new LaVieja();
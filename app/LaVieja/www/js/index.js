class LaVieja {
    constructor() {
        this.jugadorActual = 'X';
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.juegoActivo = true;
        this.cells=[];
        this.contenedor=document.getElementById('body');
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
            this.titulo.classList.add('agrandar');
            setTimeout(() => {
                this.titulo.classList.remove('col-10', 'agrandar');
                this.titulo.classList.add('col-12');
            }, 500);

            this.btnMenu.classList.add('d-none');

            this.contenedor.innerHTML=`
            <div class="row d-flex flex-column align-items-center mt-5" id="contenedorMenu">
                <div class="col-8 mt-5" onclick="juego.dibujarTablero()">
                    <img src="img/nuevoJuego.png" alt="Nuevo Juego" class="img-fluid">
                </div>
                <div class="col-8" onclick="juego.mostrarInstrucciones()">
                    <img src="img/Instrucciones.png" alt="Nuevo Juego" class="img-fluid">
                </div>
            </div>
            `
    }

    quitarMenu(){
        this.titulo.classList.add('reducir');
        setTimeout(() => {
            this.titulo.classList.remove('col-12', 'reducir');
            this.titulo.classList.add('col-10');
        }, 500);
    }

    mostrarInstrucciones(){
        this.contenedor.innerHTML=`
        <div class="row d-flex justify-content-center" id="menuInstrucciones">
            <div class="col text-center mt-5">
                <h3>
                    ¡Bienvenido al clásico juego de la vieja! También conocido como tres en línea o tic-tac-toe, el objetivo es sencillo: ¡ser el primero en alinear tres fichas! Coloca tu ficha en un espacio vacío y ¡a ganar!"
                </h3>
                <i class="fa-solid fa-arrow-left fa-2xl mt-5" style="color: #ffff00;" onclick="juego.dibujarMenu()"></i>
            </div>               
        </div>
        `
    }

    dibujarTablero(){
        console.log('a')
        this.contenedor.innerHTML=`
            <div class="" id="contenedorTablero">
                <div class="row d-flex justify-content-center" id="linea1">
                    <div class="col-3 border-5 cell" id="0" onclick="juego.tomarMovimiento(this, 0)"></div>
                    <div class="col-3 border-5 cell" id="1" onclick="juego.tomarMovimiento(this, 1)"></div>
                    <div class="col-3 border-5 cell" id="2" onclick="juego.tomarMovimiento(this, 2)"></div>
                </div>
                <div class="row d-flex justify-content-center" id="linea2">
                    <div class="col-3 border-5 cell" id="3" onclick="juego.tomarMovimiento(this, 3)"></div>
                    <div class="col-3 border-5 cell" id="4" onclick="juego.tomarMovimiento(this, 4)"></div>
                    <div class="col-3 border-5 cell" id="5" onclick="juego.tomarMovimiento(this, 5)"></div>
                </div>
                <div class="row d-flex justify-content-center" id="linea3">
                    <div class="col-3 border-5 cell" id="6" onclick="juego.tomarMovimiento(this, 6)"></div>
                    <div class="col-3 border-5 cell" id="7" onclick="juego.tomarMovimiento(this, 7)"></div>
                    <div class="col-3 border-5 cell" id="8" onclick="juego.tomarMovimiento(this, 8)"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            this.cells= document.querySelectorAll('.cell')
            this.iniciarJuego();
        }, 500);
    }
    
    dibujarBordes(cell) {
        const elementoAnterior = cell.previousElementSibling;
        const elementoSiguiente = cell.nextElementSibling;
        const padre = cell.parentNode;

        !elementoAnterior ? cell.style.borderRight = '2px solid #1919a6' : '';
        !elementoSiguiente ? cell.style.borderLeft = '2px solid #1919a6' : '';
        padre.id==='linea1' || padre.id==='linea2' ? cell.style.borderBottom = '2px solid #1919a6':'';
    }

    iniciarJuego(){
        this.quitarMenu();
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

    tomarMovimiento(cell, index) {
        if (this.tablero[index] === '' && this.juegoActivo) {
            this.tablero[index] = this.jugadorActual;
            this.jugadorActual==='X' ? cell.innerHTML=`<img src="img/x.png" alt="X" class="img-fluid">`: cell.innerHTML=`<img src="img/o.png" alt="O" class="img-fluid">`;
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
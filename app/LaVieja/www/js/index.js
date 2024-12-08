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
        this.jugadores=[];
        this.dificultadCPU='';
        this.condicionesGanadoras = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.dibujarMenu();
        this.jugadas=[
            {jugador:'X',movimientos:[]},
            {jugador:'O',movimientos:[]}
        ]
    }

    dibujarMenu(){
        this.jugadores=[
            {nombre:'Jugador 1',simbolo:'X'},
            {nombre:'Jugador 2',simbolo:'O'},
        ];
        this.titulo.classList.add('agrandar');
        setTimeout(() => {
            this.titulo.classList.remove('col-10', 'agrandar');
            this.titulo.classList.add('col-12');
        }, 500);

        this.btnMenu.classList.add('d-none');

        this.contenedor.innerHTML=`
        <div class="row d-flex flex-column align-items-center mt-5" id="contenedorMenu">
            <div class="col-5 mt-5" onclick="juego.dibujarTablero()">
                <img src="img/1-vs-1.png" alt="1-vs-1" class="img-fluid">
            </div>
            <div class="col-6" onclick="juego.mostrarDificultades()">
                <img src="img/1-vs-CPU.png" alt="1-vs-CPU" class="img-fluid">
            </div>
            <div class="col-9 mt-5" onclick="juego.mostrarInstrucciones()">
                <img src="img/Instrucciones.png" alt="Instrucciones" class="img-fluid">
            </div>
        </div>
        `;
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
                <img src="img/atras.png" alt="Instrucciones" class="img-fluid w-25 mt-5" onclick="juego.dibujarMenu()">
            </div>               
        </div>
        `
    }

    dibujarTablero(){
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
        this.restaurarJuego();
        this.btnMenu.classList.remove('d-none');

        this.pedirNombre()

        /* this.jugadores.forEach((jugador,index)=>{
            if(jugador.nombre!=='CPU'){
                jugador.nombre=prompt(`Introdusca el nombre del jugador ${index+1}`);
            }
            if(jugador.nombre===''){
                jugador.nombre=`Jugador ${index+1}`;
            }
        }) */

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
            if(this.jugadorActual==='X'){
                cell.innerHTML=`<img src="img/x.png" alt="X" class="img-fluid">`;
                this.jugadas[0].movimientos.push(index);
            }else{
                cell.innerHTML=`<img src="img/o.png" alt="O" class="img-fluid">`;
                this.jugadas[1].movimientos.push(index);
            }

            let ficha = cell.querySelector('img');
            ficha.classList.add('puff-in-center');

            this.verificarGanador();
            this.jugadorActual = this.jugadorActual === 'X' ? 'O' : 'X';

            if(this.jugadores[1].nombre==='CPU' && this.dificultadCPU==='dificil'){
                this.eliminarJugada()
            }

            if(this.jugadorActual==='O' && this.jugadores[1].nombre==='CPU'){
                this.movimientoCPU();
            }

        }
    }

    verificarGanador() {
        for (let condicion of this.condicionesGanadoras) {
            const [a, b, c] = condicion;
            if (this.tablero[a] && this.tablero[a] === this.tablero[b] && this.tablero[a] === this.tablero[c]) {
                this.cells.forEach(celda=>{
                    if(celda.id==a || celda.id==b || celda.id==c){
                        celda.classList.add('colorGanador')
                    }else{
                    }
                })
                this.mostrarAdvertencia(this.tablero[a]);
                this.juegoActivo = false;
                return;
            }
        }

        if (!this.tablero.includes('')) {
            this.mostrarAdvertencia("empate");
            this.juegoActivo = false;
        }
    }

    restaurarJuego() {
        this.jugadas.forEach(jugada=>{jugada.movimientos=[]})
        this.tablero = ['', '', '', '', '', '', '', '', ''];
        this.jugadorActual = 'X';
        this.juegoActivo = true;
        this.cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('colorGanador');
        });
    }

    mostrarAdvertencia(anuncio){
        const modal=document.getElementById('anuncios');
        const instModal=new bootstrap.Modal(modal);
        const resultado=modal.querySelector('.modal-body');

        switch (anuncio) {
            case "empate":
                resultado.innerHTML=`
                    <div class="col">
                        <img src="img/empate.png" alt="GANADOR" class="img-fluid">
                    </div>
                    <div class="col">
                        <h3>¿ Revancha ?</h3>
                    </div>
                `;
            break;
            case "advertencia":
                this.verAdvertencia();
                resultado.innerHTML=`
                    <div class="col">
                        <img src="img/advertencia.png" alt="ADVERTENCIA" class="img-fluid">
                    </div>
                    <div class="col">
                        <h3 class="text-center">¿Preparado para esto?</h3>
                        <p>solo puedes tener 3 fichas activas en juego<p>
                    </div>
                `;
            break
            default:
                anuncio==='X' ? anuncio=this.jugadores[0].nombre : anuncio=this.jugadores[1].nombre;
                resultado.innerHTML=`
                    <div class="col">
                        <img src="img/ganador.png" alt="GANADOR" class="img-fluid">
                    </div>
                    <div class="col">
                        <h3>${anuncio}</h3>
                    </div>
                `;
            break;
        }

        setTimeout(() => {
            instModal.show();
        }, 500);
    }

    mostrarDificultades(){
        this.contenedor.innerHTML = `
            <div class="row d-flex flex-column align-items-center mt-5 ms-0
            " id="contenedorDificultades">
                <div class="col-6 mt-3" onclick="juego.iniciarJuegoCPU('facil')">
                    <img src="img/facil.png" alt="facil" class="img-fluid">
                </div>
                <div class="col-7 mt-3" onclick="juego.iniciarJuegoCPU('media')">
                    <img src="img/medio.png" alt="medio" class="img-fluid">
                </div>
                <div class="ms-3 col-9 mt-3" onclick="juego.mostrarAdvertencia('advertencia')">
                    <img src="img/dificil.png" alt="dificil" class="img-fluid">
                </div>
                <div class="col-8 mt-5 d-flex justify-content-center">
                    <img src="img/atras.png" alt="Instrucciones" class="img-fluid w-25 mt-5" onclick="juego.dibujarMenu()">
                </div>
            </div>
        `;
    }

    iniciarJuegoCPU(dificultad) {
        setTimeout(() => {
            this.verAdvertencia();
        }, 500);
        this.dificultadCPU = dificultad;
        this.jugadores[1] = { nombre: 'CPU', simbolo: 'O' };
        this.dibujarTablero();
    }
    
    movimientoCPU() {
        setTimeout(() => {
            let movimiento;
            switch (this.dificultadCPU) {
                case 'facil':
                    let opciones = this.tablero.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
                    movimiento = opciones[Math.floor(Math.random() * opciones.length)];
                break;
                case 'media':
                    movimiento=this.movimientoCPUMedia();
                break;
                case 'dificil':
                    movimiento=this.movimientoCPUMedia();
                break
                default:
                    break;
            }
            this.tomarMovimiento(this.cells[movimiento], movimiento);
        }, 300);
    }
    
    movimientoCPUMedia(){
        for (let simbolo of ['O', 'X']){
            for (let combo of this.condicionesGanadoras) {
                let [a, b, c] = combo;
                let tableroCombo = [this.tablero[a], this.tablero[b], this.tablero[c]];
                let vacios = tableroCombo.filter(val => val === '');
    
                if (vacios.length === 1 && tableroCombo.filter(val => val === simbolo).length === 2) {
                    let indiceVacio = combo[tableroCombo.indexOf('')];
                    return indiceVacio;
                }
            }
        }
        let opciones = this.tablero.map((val, idx) => val === '' ? idx : null).filter(v => v !== null);
        return opciones[Math.floor(Math.random() * opciones.length)];
    }
    
    evaluarTablero(tablero) {
        for (let combo of this.condicionesGanadoras) {
            const [a, b, c] = combo;
            if (tablero[a] !== '' && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return (tablero[a] === 'O') ? 10 : -10;
            }
        }
        return 0;
    }

    eliminarJugada(){
        if(this.juegoActivo){
            this.jugadas.forEach(jugada=>{
                if(jugada.movimientos.length>=4){
                    const jugadaEliminar=jugada.movimientos.shift();
                    this.tablero[jugadaEliminar]='';
                    document.getElementById(`${jugadaEliminar}`).innerHTML='';
                }
            })
        }
    }

    verAdvertencia(){
        const modal=document.getElementById('anuncios');
        modal.classList.contains('advertencia') ? modal.classList.remove('advertencia') : modal.classList.add('advertencia');
        const botones=modal.querySelectorAll('button');
        botones.forEach(boton=>{
            boton.classList.contains('d-none') ? boton.classList.remove('d-none') : boton.classList.add('d-none');
        })
    }
    pedirNombre(){
        const modalNombres=document.getElementById('nombres');
        const instModalNombres=new bootstrap.Modal(modalNombres);
        modalNombres.querySelector('.modal-content').innerHTML=`
            <div class="modal-body d-flex flex-column align-items-center">
                <div class="col">
                    <img src="img/pedirNombre.png" alt="ADVERTENCIA" class="img-fluid">
                </div>
                <div class="col">
                    <input type="text" class="form-control nombreJugador" id="nombreJugador1" placeholder="Nombre del jugador 1">
                    ${this.jugadores[1].nombre==='CPU' ? '' : `<input type="text" class="form-control nombreJugador" id="nombreJugador2" placeholder="Nombre del jugador 2">`}
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="guardarNombre">Guardar</button>
            </div>
        `;
        instModalNombres.show();
        document.getElementById('guardarNombre').onclick=()=>{
            this.jugadores.forEach((jugador,index)=>{
                if(jugador.nombre!=='CPU'){
                    const nombre=document.getElementById(`nombreJugador${index+1}`).value.trim();
                    if(nombre.length>0){
                        jugador.nombre=nombre;
                    }
                }
            })
        }

    }

}

const juego = new LaVieja();

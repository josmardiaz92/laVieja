#include <iostream>
#include <iomanip>
#include <limits>
#include <cstdlib>
using namespace std;

char tablero[3][3] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};
char jugadorActual = 'X';
bool ganador = false;
bool empate = false;
string mensajeVolver="\nPresiona Enter para volver al menú principal.\n";

// Función para limpiar la pantalla (puede variar según el sistema operativo)
void limpiarPantalla() {
#ifdef _WIN32
    system("cls");
#else
    system("clear");
#endif
}

// Función para mostrar el tablero
void mostrarTablero() {
    limpiarPantalla();
    int espacios = (3 * 15 - 3) / 2;
    
    cout << setw(espacios) << "" << "-------------" << endl;
    for (int i = 0; i < 3; i++) {
        cout <<setw(espacios)<< "" << "| ";
        for (int j = 0; j < 3; j++) {
            cout << tablero[i][j] << " | ";
        }
        cout << endl;
        cout <<setw(espacios)<< "" << "-------------" << endl;
    }
}

// Función para tomar la entrada del usuario
void tomarEntradaJugador() {
    int posicion;
    cout << "Jugador " << jugadorActual << ", ingresa una posicion (1-9): ";
    cin >> posicion;

    // Convertir la posición a coordenadas del tablero
    int fila = (posicion - 1) / 3;
    int columna = (posicion - 1) % 3;

    // Verificar si la posición está vacía
    if (tablero[fila][columna] >= '1' && tablero[fila][columna] <= '9') {
        tablero[fila][columna] = jugadorActual;
    } else {
        cout << "Posición ya ocupada. Intenta de nuevo." << endl;
        tomarEntradaJugador();
    }
}

// Función para verificar si hay un ganador
bool verificarGanador() {
    // Verificar filas, columnas y diagonales
    for (int i = 0; i < 3; i++) {
        if ((tablero[i][0] == tablero[i][1] && tablero[i][1] == tablero[i][2]) ||
            (tablero[0][i] == tablero[1][i] && tablero[1][i] == tablero[2][i])) {
            ganador = true;
            return ganador;
        }
    }
    if ((tablero[0][0] == tablero[1][1] && tablero[1][1] == tablero[2][2]) ||
        (tablero[0][2] == tablero[1][1] && tablero[1][1] == tablero[2][0])) {
        ganador = true;
        return ganador;
    }
    return ganador;
}

// Función para verificar si hay un empate
bool verificarEmpate() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (tablero[i][j] >= '1' && tablero[i][j] <= '9') {
                return false; // Hay casillas vacías, no hay empate
            }
        }
    }
    empate = true;
    return true;
}

void instrucciones(){
    limpiarPantalla();
    cout<<"\t\tInstrucciones del juego\n";

    cout<<"\n1. Selecciona con que ficha quieres jugar (X o O)."<<endl;
    cout<<"2. Selecciona en tu teclado el nùmero de la casilla en donde quieres colocar tu ficha."<<endl;
	cout<<"3. Ve colocando tus fichas por turno intentado bloquear a tu oponente."<<endl;
	cout<<"4. Cuando logres colocar tres fichas en fila habras ganado la partida."<<endl;
	cout<< "\nPresiona Enter para volver al menú principal."<<endl;

    cin.ignore(); // Para limpiar el buffer de entrada
    cin.get(); // Esperar a que el usuario presione Enter

}

void creditos(){
    limpiarPantalla();
    cout <<"\t\t\tCreditos:\n";

    cout<<"\nDesarrollado por:";
    cout<<"\n\t Nombre"<<endl;
    cout<<"\n\t Nombre"<<endl;
    cout<<"\n\t Nombre"<<endl;
    cout<<"\n\t Nombre"<<endl;
    cout<<"\n\t Nombre"<<endl;
    
    cout<<"\n\t\tGracias por jugar!\n";
    
    cout<<mensajeVolver;

    cin.ignore(); // Para limpiar el buffer de entrada
    cin.get(); // Esperar a que el usuario presione Enter

}

void jugar(){
    char jugarDeNuevo;
    do {
        ganador = false;
        empate = false;
        // Reiniciar el tablero para una nueva partida
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                tablero[i][j] = (char)('1' + i * 3 + j);
            }
        }

        mostrarTablero();

        while (!ganador && !empate) {
            tomarEntradaJugador();
            mostrarTablero();
            ganador = verificarGanador();
            if (!ganador) {
                empate = verificarEmpate();
            }

            // Cambiar de jugador
            jugadorActual = (jugadorActual == 'X') ? 'O' : 'X';
        }

        if (ganador) {
            // Mostrar al ganador con el símbolo contrario
            char ganadorSimbolo = (jugadorActual == 'X') ? 'O' : 'X';
            cout << "¡Jugador " << ganadorSimbolo << " ha ganado!" << endl;
        } else if (empate) {
            cout << "¡Empate!" << endl;
        }

        cout << "¿Quieres jugar otra partida? (s/n): ";
        cin >> jugarDeNuevo;
    } while (jugarDeNuevo == 's' || jugarDeNuevo == 'S');    
}

void pantallaPrincipal(){
    int opcion=0;

    do
    {
        limpiarPantalla();
        cout <<"\t\t\tLa Vieja\n";
        cout<<"\n\t 1. Iniciar Juego"<<endl;
        cout<<"\n\t 2. Instrucciones"<<endl;
        cout<<"\n\t 3. Creditos"<<endl;
        cout<<"\n\t 4. Salir"<<endl;
        cout<<"\n\n Seleccione una opción: ";
        cin>>opcion;

        if(cin.fail() || opcion<=0 || opcion>4){
            cout << "Opción inválida, por favor elija una opción del 1 al 4.";
            cin.clear(); // Restablece el estado del `cin`
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Limpia el buffer de entrada
            cout << "\nPresiona Enter para continuar...";
            cin.get(); // Espera que el usuario presione Enter
            continue; // Vuelve al inicio del bucle sin limpiar la pantalla
        }
        switch (opcion)
        {
            case 1:
                jugar();
                break;
            case 2:
                instrucciones();
                break;
            case 3:
                creditos();
                break;
            case 4:
                cout << "Saliendo del juego. ¡Hasta luego!" << endl;
                return;
                break;
            default:
                cout << "Opción no válida. Intenta de nuevo." << endl;
                break;
        }

    } while (true);
}

int main() {
    system("chcp 65001");
    pantallaPrincipal();
    return 0;
}
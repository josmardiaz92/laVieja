#include <iostream>

using namespace std;

char tablero[3][3] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};
char jugadorActual = 'X';
bool ganador = false;
bool empate = false;

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
    cout << "-------------" << endl;
    for (int i = 0; i < 3; i++) {
        cout << "| ";
        for (int j = 0; j < 3; j++) {
            cout << tablero[i][j] << " | ";
        }
        cout << endl;
        cout << "-------------" << endl;
    }
}

// Función para tomar la entrada del usuario
void tomarEntradaJugador() {
    int posicion;
    cout << "Jugador " << jugadorActual << ", ingresa una posición (1-9): ";
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

int main() {
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

    return 0;
}
#include <iostream>
#include <iomanip>
#include <limits>
#include <cstdlib>
using namespace std;

char tablero[3][3] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};
char jugadorActual = 'X';
bool ganador = false;
bool empate = false;
string mensajeVolver="Presiona Enter para volver al menú principal.";
int espacios = 15;

void verificarEntrada(int opcion,int min, int max){
            if(cin.fail() || opcion<min || opcion>max){
            cout << "Opción inválida, por favor elija una opcion entre "<<min<<" y "<<max<<"."<<endl;
            cin.clear(); // Restablece el estado del `cin`
            cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Limpia el buffer de entrada
            cout << "Presiona Enter para continuar...";
            cin.get(); // Espera que el usuario presione Enter
        }
}

// Función para mostrar el tablero
void mostrarTablero() {
    system("cls");

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
    do
    {
        cout << "Jugador " << jugadorActual << ", ingresa una posicion (1-9): ";
        cin >> posicion;
        verificarEntrada(posicion,1,9);
    } while (posicion<1 || posicion>9);


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
    system("cls");
    cout<<setw(espacios*1.5)<< "" << "Instrucciones del juego"<<endl<<endl;

    cout<<setw(espacios/3)<< "" <<"1. Selecciona con que ficha quieres jugar (X o O)."<<endl;
    cout<<setw(espacios/3)<< "" <<"2. Selecciona en tu teclado el nùmero de la casilla en donde quieres colocar tu ficha."<<endl;
	cout<<setw(espacios/3)<< "" <<"3. Ve colocando tus fichas por turno intentado bloquear a tu oponente."<<endl;
	cout<<setw(espacios/3)<< "" <<"4. Cuando logres colocar tres fichas en fila habras ganado la partida."<<endl<<endl;
	cout<<setw(espacios/3)<< "" <<mensajeVolver<<endl;

    cin.ignore(); // Para limpiar el buffer de entrada
    cin.get(); // Esperar a que el usuario presione Enter

}

void creditos(){
    system("cls");
    cout <<setw(espacios*1.5)<< "" <<"Creditos:"<<endl<<endl;

    cout<<setw(espacios*1.5-3)<< "" <<"Desarrollado por"<<endl<<endl;
    cout<<setw(espacios)<< "" <<"- Caicedo Jhosneyder"<<endl;
    cout<<setw(espacios)<< "" <<"- Diaz Josmar"<<endl;
    cout<<setw(espacios)<< "" <<"- Monsalve Adrián"<<endl;
    cout<<setw(espacios)<< "" <<"- Nuñez Rossana"<<endl;
    cout<<setw(espacios)<< "" <<"- Serrano María"<<endl<<endl;
    
    cout<<setw(espacios*1.5-5)<< "" <<"¡Gracias por jugar!"<<endl;
    
    cout<<mensajeVolver<<endl;

    cin.ignore(); // Para limpiar el buffer de entrada
    cin.get(); // Esperar a que el usuario presione Enter

}

void jugar(){
    char jugarDeNuevo='s';
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
        system("cls");
        cout << setw(espacios*1.5)<< "" <<"La Vieja"<<endl<<endl;
        cout<<setw(espacios)<< "" <<"1. Iniciar Juego"<<endl;
        cout<<setw(espacios)<< "" <<"2. Instrucciones"<<endl;
        cout<<setw(espacios)<< "" <<"3. Creditos"<<endl;
        cout<<setw(espacios)<< "" <<"4. Salir"<<endl<<endl<<endl;
        cout<<"Seleccione una opción: ";
        cin>>opcion;
        
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
                verificarEntrada(opcion,1,4);
                break;
        }

    } while (opcion!=4);
}

int main() {
    system("chcp 65001");
    pantallaPrincipal();
    return 0;
}
#include <iostream>
#include <iomanip>
#include <limits>
#include <cstdlib>
using namespace std;

char tablero[3][3] = {{'1', '2', '3'}, {'4', '5', '6'}, {'7', '8', '9'}};
char jugadorActual = 'X';
bool ganador = false;
bool empate = false;
bool salir=false;
string mensajeVolver="Presiona Enter para volver al menú principal.";
int espacios = 93;

void verificarEntrada(int opcion,int min, int max){
            if(cin.fail() || opcion<min || opcion>max){
            cout<<endl;
            cout <<setw(espacios-24)<< "" << "Opción inválida, por favor elija una opcion entre "<<min<<" y "<<max<<"."<<endl;
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout<<setw(espacios-11)<< ""  << "Presiona Enter para continuar...";
            cin.get();
        }
}

void mostrarTablero() {
    system("cls");

    cout << setw(espacios-2) << "" << "-------------" << endl;
    for (int i = 0; i < 3; i++) {
        cout <<setw(espacios-2)<< "" << "| ";
        for (int j = 0; j < 3; j++) {
            cout << tablero[i][j] << " | ";
        }
        cout << endl;
        cout <<setw(espacios-2)<< "" << "-------------" << endl;
    }
}

void tomarEntradaJugador() {
    int posicion;
    do
    {
        cout<<endl;
        cout <<setw(espacios-16)<< "" << "Jugador " << jugadorActual << ", ingresa una posicion (1-9): ";
        cin >> posicion;
        verificarEntrada(posicion,1,10);
    } while (posicion<1 || posicion>10);
    
    if(posicion==10){
        salir=true;
    }else{
        
        int fila = (posicion - 1) / 3;
        int columna = (posicion - 1) % 3;

    
        if (tablero[fila][columna] >= '1' && tablero[fila][columna] <= '9') {
            tablero[fila][columna] = jugadorActual;
        } else {
            cout<<setw(espacios-15)<< ""  << "Posición ya ocupada. Intenta de nuevo." << endl;
            tomarEntradaJugador();
        }
    }
}

bool verificarGanador() {

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

bool verificarEmpate() {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (tablero[i][j] >= '1' && tablero[i][j] <= '9') {
                return false;
            }
        }
    }
    empate = true;
    return true;
}

void instrucciones(){
    system("cls");
    cout<<setw(espacios-6)<< "" << "Instrucciones del juego"<<endl<<endl;

    cout<<setw(espacios-19)<< "" <<"1. Selecciona con que ficha quieres jugar (X o O)."<<endl;
    cout<<setw(espacios-37)<< "" <<"2. Selecciona en tu teclado el nùmero de la casilla en donde quieres colocar tu ficha."<<endl;
	cout<<setw(espacios-29)<< "" <<"3. Ve colocando tus fichas por turno intentado bloquear a tu oponente."<<endl;
	cout<<setw(espacios-29)<< "" <<"4. Cuando logres colocar tres fichas en fila habras ganado la partida."<<endl;
	cout<<setw(espacios-24)<< "" <<"5. Si deseas salir de una partida, introduce 10 para salir."<<endl<<endl;
    
	cout<<setw(espacios-17)<< "" <<mensajeVolver<<endl;

    cin.ignore();
    cin.get();

}

void creditos(){
    system("cls");
    cout <<setw(espacios)<< "" <<"Creditos:"<<endl<<endl;

    cout<<setw(espacios-3)<< "" <<"Desarrollado por"<<endl<<endl;
    cout<<setw(espacios-4)<< "" <<"Caicedo Jhosneyder"<<endl;
    cout<<setw(espacios-1)<< "" <<"Diaz Josmar"<<endl;
    cout<<setw(espacios-3)<< "" <<"Monsalve Adrián"<<endl;
    cout<<setw(espacios-2)<< "" <<"Nuñez Rossana"<<endl;
    cout<<setw(espacios-2)<< "" <<"Serrano María"<<endl<<endl;
    
    cout<<setw(espacios-5)<< "" <<"¡Gracias por jugar!"<<endl<<endl;
    
    cout<<setw(espacios-18)<< "" <<mensajeVolver<<endl;

    cin.ignore();
    cin.get();

}

void jugar(){
    char jugarDeNuevo='s';
    do {
        ganador = false;
        empate = false;
        salir=false;
    
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                tablero[i][j] = (char)('1' + i * 3 + j);
            }
        }

        mostrarTablero();

        while (!ganador && !empate &&!salir) {
            tomarEntradaJugador();
            mostrarTablero();
            ganador = verificarGanador();
            if (!ganador) {
                empate = verificarEmpate();
            }

        
            jugadorActual = (jugadorActual == 'X') ? 'O' : 'X';
        }

        if (ganador) {
        
            char ganadorSimbolo = (jugadorActual == 'X') ? 'O' : 'X';
            cout<<setw(espacios-6)<< ""  << "¡Jugador " << ganadorSimbolo << " ha ganado!" << endl;
        } else if (empate) {
            cout <<setw(espacios)<< "" << "¡Empate!" << endl;
            cout <<setw(espacios-11)<< "" << "Presiona Enter para continuar...";
            cin.ignore();
            cin.get();
        }

        cout <<setw(espacios-14)<< "" << "¿Quieres jugar otra partida? (s/n): ";
        cin >> jugarDeNuevo;
    } while (jugarDeNuevo == 's' || jugarDeNuevo == 'S');    
}

void pantallaPrincipal(){
    int opcion=0;

    do
    {
        system("cls");
        cout << setw(espacios)<< "" <<"La Vieja"<<endl<<endl;
        cout<<setw(espacios-4)<< "" <<"1. Iniciar Juego"<<endl;
        cout<<setw(espacios-4)<< "" <<"2. Instrucciones"<<endl;
        cout<<setw(espacios-2)<< "" <<"3. Creditos"<<endl<<endl;
        cout<<setw(espacios-7)<< "" <<"Seleccione una opción: ";
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
                cout<<endl;
                cout<<setw(espacios-12)<< ""  << "Saliendo del juego. ¡Hasta luego!" << endl;
                cin.ignore();
                cin.get();
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
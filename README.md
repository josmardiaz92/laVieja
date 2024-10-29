# laVieja

## VisualStudio Code con C++
1. Descargar e instalar Visual Studio Code
2. instalar las extensiones:
    1. C/C++
    2. Code Runner
3. instalar un compilador, yo estoy usando MinGW y lo configure asi:
    1. En la ventana de selección de paquetes, me aseguré de marcar los siguientes:
        - Base: Incluye los archivos base necesarios para el sistema.
        - mingw32-base: Proporciona herramientas básicas de línea de comandos.
        - mingw32-gcc-g++: Incluye los compiladores GCC y G++ para C y C++, respectivamente.
    2. Configuración de la Variable de Entorno PATH:
        - Busca "Editar las variables de entorno del sistema" en el menú de inicio.
        - Haz clic en "Variables de entorno".
        - En la sección "Variables del sistema", busca la variable "Path" y haz clic en "Editar".
        - Haz clic en "Nuevo" y pega la ruta completa a la carpeta bin de MinGW (por ejemplo, C:\MinGW\bin).
        - Haz clic en "Aceptar" para guardar los cambios.
    3. Verificar la Instalación:
        - Abre un nuevo símbolo del sistema y escribe gcc --version. Si la instalación se ha realizado correctamente, deberías ver la versión del compilador GCC.
4. crear un proyecto en vsCode.
5. en el archivo main.cpp, escribamos un programa simple para probar la instalación:
    ~~~
    #include <iostream>
    int main() {
        std::cout << "Hola, mundo!" << std::endl;
        return 0;
    }
    ~~~

5. en la carpeta .vscode, modificamos el archivo tasks.json (si no eciste ninguno de los dos, los creamos):
    ~~~
    {
        "version": "2.0.0",
        "tasks": [
            {
                "label": "Compilar con g++",
                "type": "shell",
                "command": "C:\\MinGW\\bin\\g++.exe", // Ajusta la ruta a g++ si es necesario
                "args": ["-g", "-I", "C:\\MinGW\\include", "${file}", "-o", "${fileDirname}/${fileBasenameNoExtension}"],
                "options": {
                    "cwd": "${workspaceFolder}"
                },
                "problemMatcher": ["$gcc"]
            }
        ]
    }
    ~~~

6. damos click derecho sobre el archivo que queremos correr y le damos run code.

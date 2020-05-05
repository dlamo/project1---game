# Fire killer!

## Descripción
El juego se va a basar en el juego del protagonista de la película Rompe Ralph versionado a un juego tipo arcade en el que un bombero tendrá que apagar fuegos que van apareciendo en un edificio.

## Reglas del juego  
* El jugador se mueve de izquierda a derecha y dispara automáticamente para arriba con la barra de espacio.
* El jugador tiene un máximo de 3 vidas.
* Si el jugador pierde todas las vidas, el juego termina.
* Existen 2 tipos de fuego: azul y rojo.
* El jugador tendrá 2 tipos de productos para apagar cada tipo de fuego.

## MVP - User stories
* Yo como jugador quiero poder iniciar el juego
* Yo como jugador quiero poder indicar un apodo para mi partida
* Yo como jugador quiero que aparezca el edificio dibujado
* Yo como jugador quiero que aparezca mi personaje
* Yo como jugador quiero que aparezca fuego en el edificio
* Yo como jugador quiero que el bombero se pueda mover a izquierda y derecha
* Yo como jugador quiero que el bombero pueda disparar agua
* Yo como jugador quiero ganar puntos cuando apague el fuego
* Yo como jugador quiero que el fuego se pueda apagar al dispararle agua
* Yo como jugador quiero poder ganar la partida
* Yo como jugador quiero que sea posible que se pierda la partida

<!-- Definición inicial de la estructura -->
* Canvas => imagen de fondo (edificio)
* Canvas => imagen de jugador (bombero)
* Fuegos => objetos con las siguiente propiedades:
    * x,y  define la posición
    * intensidad: valor que definirá el tamaño del fuego
    * height, height: define el tamaño del fuego (valor base * intensidad)
* Bombero => objeto con las siguiente propiedades:
    * x,y define la posicion
    * speed => velocidad de movimiento
    * potencia => indicará cuanta intensidad reducirá por cada disparo
    * responderá a las flechas izq y der 

## Backlog
* Yo como jugador quiero que aparezca fuego durante el juego 
* Yo como jugador quiero que hayan varios niveles de dificultad
* Yo como jugador quiero ganar puntos si acabo rápido el juego
* Yo como jugador quiero que el fuego aumente o se expanda si no se apaga
* Yo como jugador quiero que aparezcan proyectiles de los fuegos y resten vida al jugador
* Yo como jugador quiero que mi personaje pueda recibir algún boost para aumentar la potencia
* Yo como jugador quiero que haya diferentes tipos de fuego y de disparo
* Yo como jugador quiero que haya una tabla de máximas puntuaciones
* Yo como jugador quiero que se haga una cuenta atrás antes de iniciar el juego

## Links
​
### Git
Repositorio:
https://github.com/dlamo/project1-fire-killer
[GitHub](http://github.com) 
​
Deploy:
https://dlamo.github.io/project1-fire-killer/
[GitHub](http://github.com)
​
### Slides
​
### Kanban
https://trello.com/b/4DNsgafj/project-game
[Trello](https://trello.com/)
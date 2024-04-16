# CC5905 Trabajo Dirigido: Desarrollo de frontend web para proyectos de CC3002

El propósito de este proyecto es crear una _Single Page Application_ que funcione como una
vista para los proyectos del curso CC3002 Metodologías de Diseño y Programación.

## TODO:

- [ ] Aprender React:

  - [ ] [Tutorial oficial](https://reactjs.org/tutorial/tutorial.html)

- [ ] Aprender TypeScript:

  - [ ] [Tutorial oficial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

- [ ] Aprender Scala Cask

- [ ] Aprender cómo servir una página web que devuelve un JSON

## Requisitos del proyecto

- [ ] Deben existir entidades principales:

  - [ ] Unidades:
    - [ ] Personajes
    - [ ] Enemigos
  - [ ] Paneles

  Las unidades deberán recibir sus atributos en base a una solicitud de inicialización del
  videojuego. Esto se deberá realizar con un GET request al backend donde se encuentra el
  proyecto del estudiante.

  Primeramente, una unidad contará con las siguientes propiedades:

  - [ ] Puntos de vida
  - [ ] Puntos de defensa
  - [ ] Puntos de ataque

  Un panel contará con las siguientes propiedades, siendo posibles nulos por defecto:

  - [ ] Un listado de unidades en ese panel o la única unidad posible en ese panel
  - [ ] Un efecto activable al entrar al panel
  - [ ] Un efecto constante por estar en el panel
  - [ ] Uno o más, hasta cuatro paneles siguientes (norte, sur, este, oeste)

Adicionalmente, en caso de posibilidad, podrían existir las siguientes entidades:

- [ ] Consumibles (pociones, cartas, alimentos, lanzables, etc)
- [ ] Equipables (armas, armaduras, accesorios, etc)

La aplicación debe contar con una interfaz que considere los siguientes aspectos:

- [ ] Información textual sobre el estado de las unidades
- [ ] Visualización de los personajes y paneles en el centro de la aplicación
- [ ] Alertas emergentes cuando una acción a ejecutar no sea posible de realizar, ya sea
      por una excepción del estudiante o por el sistema.
- [ ] Menú de selección para las acciones a realizar por el usuario en el videojuego

De momento, la interfaz de la aplicación no contará con:

- Menú principal para realizar configuraciones. El sistema tomará decisiones por defecto
  y seguramente preestablecidas teniendo en mente un proyecto estudiantil concreto.

La aplicación debe contar con una manera de modelar un sistema de turnos:

- [ ] Deberá utilizar la información proporcionada por el proyecto del estudiante de su
      estado del videojuego para manejar los turnos. **Momentáneamente**, con fines de prueba,
      se trabajará con un sistema de turnos preestablecido. En caso de que el sistema flexible
      según cada estudiante no pudiera ser implementado, los proyectos deberán dar
      explícitamente los requisitos que se deben cumplir en el estado de turnos para poder
      funcionar en la aplicación.

La aplicación debe interactuar con el proyecto del estudiante particular en los siguientes
aspectos:

- [ ] Llamar a métodos de las entidades creadas por él
- [ ] Modificar valores de las entidades o de los parámetros del proyecto
- [ ]

# RED MOON

**Videojuego de terror enfocado en el desafío y la supervivencia**

![Fondo](https://alexantonio29.github.io/Proyectos-Alexis-Antonio/static/media/p7.56b16d7a0659fdbfe60d.PNG)

[![YouTube Video Views](https://img.shields.io/youtube/views/HoOLjEp4zqk)](https://www.youtube.com/watch?v=HoOLjEp4zqk)
![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange)
![Licencia](https://img.shields.io/badge/licencia-en%20proceso-lightgrey)
![Plataforma](https://img.shields.io/badge/plataforma-web-blue)

---

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Problemática a Resolver](#problemática-a-resolver)
3. [Público Objetivo](#público-objetivo)
4. [Contexto](#contexto)
5. [Objetivo General](#objetivo-general)
6. [Prólogo](#prólogo)
7. [Tecnologías Utilizadas](#tecnologías-utilizadas)
8. [Estructura del Proyecto](#estructura-del-proyecto)
9. [Instalación y Configuración](#instalación-y-configuración)
10. [Metodología de Trabajo](#metodología-de-trabajo)
11. [Capturas del Juego](#capturas-del-juego)
12. [Roadmap](#roadmap)
13. [Colaboradores](#colaboradores)
14. [Estado del Proyecto](#estado-del-proyecto)
15. [Licencia](#licencia)
16. [Agradecimientos](#agradecimientos)

---

## Descripción General

**Red Moon** es un videojuego de terror y supervivencia desarrollado por estudiantes apasionados por la industria. El título combina un **gameplay desafiante** con una **narrativa intensa** y una **ambientación cuidada**, buscando sumergir al jugador en un mundo misterioso donde el miedo a lo desconocido es el motor principal de la experiencia.

El proyecto nace como una propuesta académica, pero con la visión de convertirse en un título completo, pulido y respaldado por una comunidad activa de jugadores y desarrolladores.

---

## Problemática a Resolver

En el mundo de los videojuegos existen múltiples enfoques que se deben abordar al momento de diseñar una experiencia. Más allá de entretener, un buen título debe establecer mecánicas que conecten con el jugador y lo incentiven a continuar.

Nuestro objetivo principal es **entretener mediante un gameplay desafiante**, acompañado de una **narrativa que motive al usuario a seguir investigando** el misterioso mundo que hemos construido. Buscamos que el jugador no solo juegue, sino que **quiera descubrir qué se oculta detrás de la Luna Roja**.

---

## Público Objetivo

El juego está dirigido a **personas mayores de 18 años**, ya que establece una conexión con jugadores veteranos que no solo buscan entretenimiento, sino también:

- Un **desafío real** que ponga a prueba sus habilidades.
- Una **narrativa profunda** y una **ambientación inmersiva**.
- Una experiencia centrada en el **miedo a lo desconocido** y temas controversiales.

---

## Contexto

En un principio, este proyecto se desarrolla en un **ambiente institucional**. Sin embargo, nuestra visión va más allá: a mediano y largo plazo queremos construir un videojuego mucho más pulido, tomando en cuenta las opiniones del público y de expertos en la industria, formando una **comunidad que genere interés** en la elaboración de este título.

---

## Objetivo General

Plasmar en el usuario un videojuego de calidad, elaborado por estudiantes apasionados por la industria, mediante:

- Un **gameplay desafiante**.
- Una **narrativa intensa**.
- Una **ambientación cuidada** que refuerce la inmersión.

---

## Prólogo

> Acompaña al **caballero anónimo**, quien tiene el objetivo de descubrir cómo eliminar la maldición de la **Luna Roja** para salvar a su familia de un trágico destino.
>
> Te enfrentarás a **monstruos inimaginables** y **criaturas fuera de la comprensión humana**, y descubrirás los misterios que la oscuridad oculta.

---

## Tecnologías Utilizadas

| Categoría | Tecnologías |
|-----------|-------------|
| Lenguajes | HTML, JavaScript |
| Frameworks y librerías | Node.js, Phaser |
| Base de datos | MongoDB |
| Herramientas adicionales | VS Code, Git, GitHub |

---

## Estructura del Proyecto

El desarrollo en equipo plantea distintos retos para la creación del videojuego. Establecer un **gameplay preciso y divertido** es prioridad para cumplir con el objetivo del proyecto: **entretener**.

En esta primera etapa nos enfocamos en crear un **estilo visual llamativo** y, posteriormente, en establecer las **mecánicas básicas del jugador**.

### Mecánicas implementadas

- Movimiento fluido del jugador con sus sprites.
- Ataque básico del jugador.
- Deslizamiento del jugador para mayor fluidez en el gameplay.
- IA básica del enemigo.
- Ataque cargado del jugador.
- Curación del jugador.

### Sistema visual

- Sistema de assets con estilo visual agradable a la vista.
- Sprites con animaciones de 5 a 8 frames entre acciones.
- Sistema de luces para mayor impacto visual.

### Carpetas del repositorio

| Carpeta | Descripción |
|---------|-------------|
| [`Src`](https://github.com/AlexAntonio29/red-moon/tree/main/src) | Contiene el código del proyecto, con el algoritmo subdividido en subcarpetas. |
| [`Sounds`](https://github.com/AlexAntonio29/red-moon/tree/main/sounds) | Sonidos utilizados en la elaboración del juego, organizados según los objetos que los emplean. |
| [`Node_modules`](https://github.com/AlexAntonio29/red-moon/tree/main/node_modules) | Archivos importantes del motor Phaser. |
| [`Diagramas`](https://github.com/AlexAntonio29/red-moon/tree/main/diagramas) | Diagramas utilizados durante la elaboración del proyecto. |
| [`Assets`](https://github.com/AlexAntonio29/red-moon/tree/main/assets) | Sprites y archivos JSON (usados para construir los mapas). Las imágenes PNG sin fondo se emplean para el contenido visual y la iluminación. |
| [`DOCUMENTACIÓN`](https://github.com/AlexAntonio29/red-moon/tree/main/DOCUMENTACION%20REDMOON) | Documentación del proyecto. |

---

## Instalación y Configuración

El proceso de uso del proyecto es sencillo, pero requiere ciertos pasos para su correcto funcionamiento.

### Requisitos previos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/es) (para utilizar el framework Phaser)
- [Visual Studio Code](https://code.visualstudio.com/)
- Extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Pasos

1. Instalar **Git**.
2. Instalar **Node.js** para poder utilizar el framework Phaser.
3. En una terminal Bash, ejecutar:

   ```bash
   git clone https://github.com/AlexAntonio29/red-moon.git
   ```

4. Abrir **Visual Studio Code** e instalar la extensión **Live Server**.
5. Ejecutar **Live Server** presionando el botón correspondiente en la parte inferior de VS Code.
6. Jugar.

---

## Metodología de Trabajo

La metodología empleada se basa en **Kanban**, ya que funciona de manera dinámica y permite que cada colaborador establezca una tarea específica con su fecha de entrega. Esto hace más productivo el proceso de elaboración y mantiene una organización adecuada.

### Flujo de trabajo

| Columna | Descripción |
|---------|-------------|
| Backlog | Tareas pendientes por asignar. |
| Por hacer | Tareas asignadas y listas para comenzar. |
| En progreso | Tareas en desarrollo activo. |
| En revisión | Tareas terminadas pendientes de validación. |
| Hecho | Tareas completadas y verificadas. |

---

## Capturas del Juego

### Pantalla principal

![Pantalla principal](https://alexantonio29.github.io/Proyectos-Alexis-Antonio/static/media/p7.56b16d7a0659fdbfe60d.PNG)

### Gameplay

> *Espacio reservado para capturas del gameplay en desarrollo.*

![Gameplay](https://via.placeholder.com/800x450/1a1a1a/ffffff?text=Captura+de+Gameplay)

### Ambientación y sistema de luces

> *Espacio reservado para capturas del sistema de iluminación.*

![Ambientación](https://via.placeholder.com/800x450/2b0a0a/ffffff?text=Sistema+de+Luces)

### Enemigos y criaturas

> *Espacio reservado para capturas de los enemigos.*

![Enemigos](https://via.placeholder.com/800x450/3d0a0a/ffffff?text=Enemigos)

---

## Roadmap

| Fase | Descripción | Estado |
|------|-------------|--------|
| Fase 1 | Diseño visual y mecánicas básicas del jugador | Completado |
| Fase 2 | IA de enemigos y sistema de combate | En progreso |
| Fase 3 | Narrativa, mapas y ambientación | Pendiente |
| Fase 4 | Optimización, pruebas y pulido | Pendiente |
| Fase 5 | Lanzamiento y comunidad | Pendiente |

---

## Colaboradores

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Alexis Zosimo Antonio Angel | Programador principal y artista visual | [@AlexAntonio29](https://github.com/AlexAntonio29?tab=repositories) |
| Ian Michelle Padron Gutierrez | Diseñador y programador | [@NECCHET](https://github.com/NECCHET) |
| Brandon Sneyider Cuellar Martinez | Artista de sonido y programador | [@Brandon6008](https://github.com/Brandon6008) |

---

## Estado del Proyecto

Actualmente el proyecto se encuentra en **estado de desarrollo**. La elaboración de un gameplay y una narrativa más eficientes es clave para lograr una mayor inmersión por parte del jugador.

### Métricas actuales

- Mecánicas básicas del jugador: **implementadas**
- IA de enemigos: **en desarrollo**
- Sistema de mapas: **en desarrollo**
- Documentación: **en progreso**

---

## Licencia

El proceso de licencias está **en trámite**, ya que no solo radica en el proyecto como tal, sino también en el uso de los assets, el código y la música.

Esta última posee la **Musical Composition License** en [Spotify](https://open.spotify.com/intl-es/artist/46sU9LEceJXRadCvxhd1ms).

---

## Agradecimientos

Agradecemos a nuestros amigos y familiares, quienes nos han apoyado en este recorrido hacia lo desconocido, así como a los docentes que siempre nos brindan retroalimentación sobre el desarrollo del proyecto.

---

<div align="center">

**RED MOON** — *Un viaje hacia lo desconocido.*

Hecho con dedicación por estudiantes apasionados por la industria.

</div>





 







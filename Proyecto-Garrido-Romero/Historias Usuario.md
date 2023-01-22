# Proyecto Web Avanzadas
## Tema: Sistema de gestion de problemas de la ciudadanía para el municipio (SGProblemasMunicipio)
| Numero | Caracteristica                         | Descripcion                                                                                                                                                 | Prio  |    Esf | 
|:-------|:---------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----:|-------:|
| 1      | Atender problemas reportados           | Como administrador deseo atender los problemas reportados por los ciudadanos para tratar de resolverlos oportunamente.                                      | Alta  | Medium | 
| 2      | Reportar problemas                     | Como ciudadano deseo reportar problemas que encuentro en mi ciudad para que el municipio se entere de los problemas y se traten en el menor tiempo posible. | Medio |  Small |
| 3      | Organizar problemas                    | Como administrador deseo conocer el estado de los problemas, por resolución, zona geográfica, tipo de problemas para priorizar las necesidades ciudadanas.  | Media |  Small |
| 4      | Dar seguimiento a problemas reportados | Como ciudadano deseo dar seguimiento a los problemas reportados que he realizado para saber el avance de resolución.                                        | Media | Medium |
| 5      | Publicar noticias                      | Como administrador deseo publicar noticias para mantener informados a los ciudadanos de la comunidad.                                                       | Baja  |  Small |

## Criterios de aceptación
| Numero de historia | Caracteristica                         | Criterios de aceptacion                                                                                                                                                                                                                                                                            |
|:------------------:|:---------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|         1          | Atender problemas reportados           | 1.  El problema reportado llegará al administrador en forma ticket.<br> 2. El administrador redirigira el problema a una entidad competente. <br> 3. El problema sera categorizado por prioridad. <br> 4. El problema contara con un ciclo de vida (pendiente,en proceso,finalizado) .             | 
|         2          | Reportar problemas                     | 1. El usuario podrá enviar la ubicación del problema.<br>2. El usuario podra enviar una breve descripcion del problema de nomas 280 caracteres.<br>3. El usuario podra decidir si su identidad es publica.<br>4. El usuario elegira el tipo de problema que tiene (incendio,crimen,electrico,etc). | 
|         3          | Organizar problemas                    | 1. El administrador recibirá una fila de problemas.<br> 2. La prioridad en la fila se dara segun la recurrencia del problema y segun el tipo de problema.<br>3. El administrador podra modificar la fila de acuerdo a su criterio.                                                                 |
|         4          | Dar seguimiento a problemas reportados | 1.El usuario podrá ver el estado en el que se encuentra su problema.<br>2.El usuario podrá ver la linea de tiempo del problema.                                                                                                                                                                    |
|         5          | Publicar noticias                      | 1. El usuario podra visualizar la notica de la solucion del problema tan pronto se cambie el estado del mismo del mismo.<br>2. El administrador podra colocar un comentario de 180 caracteres.<br>3. La noticia contara con, la fecha el lugar y el usuario que lo publico.                        |

## Base de datos
Link lucidchart:<br>

![](Recursos/baseDatos.png ) 
## Prototipo
Link Figma:
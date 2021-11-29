# GenomaWork Challenge

Este proyecto fue iniciado con [Create React App](https://github.com/facebook/create-react-app).

## Scripts Disponibles

En la carpeta del proyecto puedes correr: 

### `npm start`

Corre la aplicación en modo desarrollo
abre el [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

## Specs cumplidos
# Login
- Para la vista utilicé componentes de AntD la cual contiene contiene 2 inputs, un botón de login y varios iconos.

`Email:` valida que el correo ingresado efectivamente contenga los caracteres necesarios para la validación. Para la misma se utilizó la libreria `validator`.
`Contraseña:` valida que la contraseña contenga al menos 6 caracteres. 
Es importante destacar que el `botón` solo se activa cuando los 2 campos están correctos y no hay errores en los imputs.

# Tabla
- Para la vista de la tabla utilicé componentes de AntD, los cuales son Modales, Notificaciones, Botones, Iconos y Tablas.

`Modales:` Los utilicé tanto para `editar` como para `agregar` restaurantes a la tabla.
`Notificaciones:` Fueron utilizadas para que el usuario tenga un feedback sobre la acción que realizó. Tanto sea agregar un restaurant, como editarlo o borrarlo. Todos los metodos contienen su propia notificación de `success` o de `error` según si la acción fue realizada correctamente o no.
`Tablas:` Contiene columnas que se pueden `filtrar` y ordenar en orden `descendente` o `ascendente` según conveniencia. 

## Detalles a comentar

`Persistencia:` fue un detalle que decidí agregar desde el minuto uno cuando vi que había un login. La logré guardando el token en el `localStorage` y preguntando en un `useEffect` en el componente app si existia el token en el localStorage. En caso de existir seguiamos camino a la tabla y en caso contrario nos encontramos con el login. 

`Instancia Axios:` decidí crear una instancia axios ya que vi que tenía que realizar varios pedidos a la api. La instancia axios ya presetea los header con el `Authorization: "Token ..."` y el token que saca del localStorage, entonces no es necesario pasarselos en cada pedido que realizamos.

`PUT en vez de Patch:` Utilicé el método `PUT`, ya que con el método `PATCH` me estaba dando un error de `cors` y no podía saber si era un error mio en la request o un error de la api. Lo probé con postman y pude hacer el `PATCH` con sus respectivos headers y body, pero a la hora de hacerlo desde el front obtenia un error.

`Login responsive:` decidí crear un diseño responsive para el login cuando lo ven desde un teléfono. Quise hacer responsive la tabla pero no logré hacerlo y que quedé bien.

Y por último utilicé `React Context` para menejar algunos states y para los styles utilicé `Scss modules`.

Tengo un pequeño bug a la hora del deslogueo, la mayoría de las veces automaticamente al desloguearte te lleva al login y hay otras veces que efectivamente se desloguea pero se queda en la pantalla tables. 

# Espero que les guste. Quedo atento a su feedback! Que tengan excelente semana.


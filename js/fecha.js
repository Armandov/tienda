 // se puede en una lina código nativo  document.write (Date()); porsupuesto lo muestra en ingles 
var mes = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var semana = new Array ("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var fecha=new Date();
document.write("Hoy es "+ semana[fecha.getDay()] + ", " + fecha.getDate() + " de " + mes[fecha.getMonth()] + " de " + fecha.getFullYear() + " Y la hora es: " +fecha.getHours()+ ":" + fecha.getMinutes() + ":" + fecha.getSeconds());


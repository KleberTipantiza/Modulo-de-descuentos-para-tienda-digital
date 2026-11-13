function calcularDescuento(precio, porcentaje, esVip) {
 var descuento = precio * porcentaje / 100;
 if (esVip == true) descuento = descuento + 10;
 if (porcentaje > 100) console.log("Descuento inválido");
 var total = precio - descuento;
 return total;
}
module.exports = { calcularDescuento };
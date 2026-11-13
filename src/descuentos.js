function calcularDescuento(precio, porcentaje, esVip) {
  let descuento = precio * porcentaje / 100;
  if (esVip === true) {
    // RF-02: el adicional de 10 no esta confirmado por el negocio (S-02 a S-04)
    descuento = descuento + 10;
  }
  if (porcentaje > 100) {
    // RF-04: reaccion ante entradas invalidas pendiente (S-07, S-09)
    console.log("Descuento inválido");
  }
  const total = precio - descuento;
  return total;
}

module.exports = { calcularDescuento };
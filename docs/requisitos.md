# Requisitos del modulo de descuentos

**Proyecto:** Módulo de descuentos para tienda digital
**Actividad:** Evaluación estática
**Autor:** Kleber Tipantiza
**Versión:** 1.0 (borrador)

---

## 1. Proposito

Este documento audita los requisitos originales del modulo de descuentos **antes de ejecutar el software**, identifica sus problemas de calidad (claridad, consistencia, completitud y verificabilidad) y propone requisitos funcionales verificables (RF-01 a RF-04). Los valores que dependen de decisiones del negocio se marcan entre corchetes y se listan como **supuestos pendientes de confirmacion**.

---

## 2. Requisitos originales

| ID | Texto original |
|---|---|
| R-01 | El descuento debe calcularse rápidamente. |
| R-02 | Los clientes importantes obtendrán un descuento especial. |
| R-03 | El descuento no puede superar el precio, excepto en promociones. |
| R-04 | Se debe mostrar el resultado correcto. |

---

## 3. Problemas detectados

| ID | Problema | Criterio de calidad afectado |
|---|---|---|
| R-01 | "Rápidamente" es un término vago: no hay umbral de tiempo, condiciones de carga ni forma de medirlo. | Claridad, verificabilidad |
| R-02 | "Importantes" y "especial" no están definidos: no se sabe quién califica, cuánto se descuenta, si es porcentaje o monto fijo, ni si se acumula con otros descuentos. | Claridad, completitud |
| R-03 | "Promociones" no está definido ni se indica cómo se identifica una. No se establece qué ocurre con el total cuando el descuento supera el precio. Faltan condiciones de borde. | Completitud, consistencia |
| R-04 | "Correcto" es circular: no existe regla de cálculo, redondeo, formato ni tratamiento de entradas inválidas. | Verificabilidad, completitud |

---

## 4. Requisitos propuestos (verificables)

### RF-01: Tiempo de respuesta (deriva de R-01)

La función `calcularDescuento` devolverá su resultado en **≤ [X] ms** para el 95 % de las invocaciones con entradas válidas, medido en el entorno de referencia acordado.

- **Criterio de aceptación:** una prueba de rendimiento con [N] invocaciones sobre entradas válidas muestra que el percentil 95 del tiempo de respuesta es ≤ [X] ms.

### RF-02: Descuento para clientes VIP (deriva de R-02)

Cuando el cliente cumpla el criterio de cliente VIP **[criterio por definir]**, el sistema aplicará un descuento adicional de **[valor y tipo por definir]**, calculado sobre el precio original.

- **Criterio de aceptación:** dado un cliente VIP y un cliente no VIP con el mismo precio y porcentaje, el total del VIP es menor exactamente en el adicional definido.

### RF-03: Limite del descuento (deriva de R-03)

El descuento total aplicado no excederá el precio del producto. Si el cálculo lo supera, se limitará al precio y el total será **0**. Esta restricción no se aplicará a compras identificadas como **[promoción: definición y mecanismo por definir]**.

- **Criterio de aceptación:** con precio = 100 y un descuento calculado de 120, el total es 0 (compra sin promoción). El comportamiento en promoción se verificará según la regla confirmada por el negocio.

### RF-04: Resultado del calculo (deriva de R-04)

Para entradas válidas (`precio` numérico ≥ 0 y `porcentaje` entre 0 y 100), la función devolverá `total = precio − descuento` con **[2]** decimales. Para entradas inválidas, devolverá **[error o mensaje definido]** y no producirá un total.

- **Criterio de aceptación:** con precio = 50 y porcentaje = 20 (sin VIP), el total es 40.00. Con precio negativo o porcentaje fuera de rango, se produce el error definido.

---

## 5. Supuestos de negocio pendientes de confirmación

| # | Supuesto / pregunta abierta | Afecta a |
|---|---|---|
| S-01 | ¿Cuál es el umbral de tiempo aceptable [X] y el entorno de medición? | RF-01 |
| S-02 | ¿Qué define a un cliente VIP (membresía, compras acumuladas, otro criterio)? | RF-02 |
| S-03 | El descuento adicional VIP, ¿es de 10 % o de 10 unidades monetarias? (el código actual suma 10 fijos) | RF-02 |
| S-04 | ¿El descuento VIP se acumula con el descuento por porcentaje? | RF-02 |
| S-05 | ¿Qué es una "promoción" y cómo se identifica en el sistema? | RF-03 |
| S-06 | En una promoción, ¿el total puede ser negativo o se limita a 0? | RF-03 |
| S-07 | ¿El porcentaje válido está entre 0 y 100? | RF-03, RF-04 |
| S-08 | ¿Cuál es la regla de redondeo, la moneda y el formato de visualización? | RF-04 |
| S-09 | ¿Cómo debe reaccionar el módulo ante entradas inválidas (excepción, mensaje, valor nulo)? | RF-04 |
| S-10 | "Mostrar" el resultado, ¿se refiere a la interfaz o solo al valor retornado? | RF-04 |

---

## 6. Matriz de trazabilidad

| ID | Problema | Impacto | Propuesta | Artefacto | Estado |
|---|---|---|---|---|---|
| R-01 | Término vago "rápidamente", sin métrica | No se puede diseñar una prueba de rendimiento reproducible | RF-01 con umbral medible | `docs/requisitos.md`, futura prueba de rendimiento | Propuesto, pendiente de confirmar umbral (S-01) |
| R-02 | "Importantes" y "especial" sin definir | Regla inventada en el código (`+10`); riesgo de cobros incorrectos | RF-02 con criterio VIP y monto/tipo explícitos | `docs/requisitos.md`, `src/descuentos.js` | Propuesto, pendiente de confirmar regla VIP (S-02 a S-04) |
| R-03 | Excepción "promociones" indefinida; el código no limita el descuento | Totales negativos; pérdidas económicas | RF-03 con tope y excepción definida | `docs/requisitos.md`, `src/descuentos.js` | Propuesto, pendiente de definir promoción (S-05 a S-07) |
| R-04 | "Correcto" no es verificable | No hay criterio de prueba ni definición de resultado válido | RF-04 con fórmula, redondeo y manejo de entradas inválidas | `docs/requisitos.md`, futuros casos de prueba | Propuesto, pendiente de confirmar redondeo y errores (S-08 a S-10) |

---

## 7. Historial de cambios

| Version | Cambio |
|---|---|
| 1.0 | Auditoria inicial de R-01 a R-04 y propuesta de RF-01 a RF-04. |

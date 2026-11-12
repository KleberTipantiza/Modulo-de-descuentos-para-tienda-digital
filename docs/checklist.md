# Lista de chequeo de revisión

**Proyecto:** Módulo de descuentos para tienda digital
**Artefactos a revisar:** `docs/requisitos.md` y `src/descuentos.js`
**Objetivo:** detectar ambiguedades, omisiones, contradicciones y posibles defectos **sin ejecutar el software**.
**Participantes:** autor, revisor y registrador (ver inspección por pares).
**Criterio de entrada:** artefactos versionados y accesibles en el repositorio.
**Criterio de salida:** hallazgos registrados con severidad, evidencia, accion y estado.

> Instrucciones: marcar **Si** o **No** en cada item y registrar la evidencia (seccion, linea o ID del requisito). Cada **No** genera un hallazgo.

---

## A. Revision de requisitos y documentacion

| # | Item de revision | Criterio | Si | No | Observacion / evidencia |
|---|---|---|---|---|---|
| 1 | Cada requisito tiene un identificador unico y una fuente definida. | Trazabilidad | ☐ | ☐ | |
| 2 | Los terminos ambiguos ("rapidamente", "importantes", "especial", "correcto") fueron eliminados o definidos. | Claridad | ☐ | ☐ | |
| 3 | Cada requisito tiene un criterio de aceptacion medible o comprobable. | Verificabilidad | ☐ | ☐ | |
| 4 | Los valores de borde estan definidos (precio = 0, porcentaje = 0, porcentaje = 100, porcentaje > 100, valores negativos). | Completitud | ☐ | ☐ | |
| 5 | Se define el comportamiento ante entradas invalidas (tipo incorrecto, `null`, `undefined`, `NaN`). | Completitud | ☐ | ☐ | |
| 6 | El criterio de cliente VIP esta definido y es unico en todos los documentos. | Claridad, consistencia | ☐ | ☐ | |
| 7 | Esta definido qué es una promocion y como se identifica. | Completitud | ☐ | ☐ | |
| 8 | No existen contradicciones entre requisitos (por ejemplo, entre el tope de R-03 y el descuento adicional VIP de R-02). | Consistencia | ☐ | ☐ | |
| 9 | Estan especificados el redondeo, la moneda y el formato del resultado. | Completitud | ☐ | ☐ | |
| 10 | Existe trazabilidad entre cada requisito, el codigo y las pruebas previstas. | Trazabilidad | ☐ | ☐ | |

---

## B. Revision del codigo fuente

| # | Item de revision | Criterio | Si | No | Observacion / evidencia |
|---|---|---|---|---|---|
| 11 | El codigo implementa lo que dice cada RF (sin reglas inventadas ni valores fijos sin justificar). | Conformidad con requisitos | ☐ | ☐ | |
| 12 | Se validan los parametros de entrada antes de calcular. | Robustez | ☐ | ☐ | |
| 13 | Se usan comparaciones estrictas (`===`) y declaraciones modernas (`const`/`let`). | Convenciones | ☐ | ☐ | |
| 14 | Los caminos de error terminan de forma controlada (no solo se registra un mensaje y se continua). | Robustez | ☐ | ☐ | |
| 15 | Los nombres, estructuras de control y estilo cumplen las reglas acordadas por el equipo. | Mantenibilidad | ☐ | ☐ | |
| 16 | No hay variables sin uso, codigo muerto ni salidas de depuracion (`console.log`) en la logica de negocio. | Mantenibilidad | ☐ | ☐ | |

---

## Resultado de la revision

| Dato | Valor |
|---|---|
| Fecha | |
| Revisor | |
| Total de items con **No** | |
| Hallazgos generados (IDs) | |
| Decisión | ☐ Aprobado  ☐ Aprobado con correcciones  ☐ Requiere nueva revision |

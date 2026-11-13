# Inspección por pares: módulo de descuentos

| Dato | Valor |
|---|---|
| Artefacto inspeccionado | `src/descuentos.js` (versión inicial, commit `66a1e50`) |
| Documentos de referencia | `docs/requisitos.md` v1.0, `docs/checklist.md` (sección B), `evidencias/lint-inicial.txt` |
| Fecha | 11/13/2026 |
| Objetivo | Detectar defectos y ambigüedades **sin ejecutar pruebas funcionales** y decidir qué se corrige ahora y qué queda pendiente de confirmación. |
| Criterio de entrada | Código versionado en el repositorio y análisis inicial de ESLint guardado. |
| Criterio de salida | Hallazgos registrados con severidad, evidencia, acción y estado; `evidencias/lint-final.txt` guardado. |

---

## 1. Roles

| Rol | Responsabilidad | Persona |
|---|---|---|
| Autor | Aporta contexto del código y aplica las correcciones aprobadas. | Kleber Tipantiza |
| Revisor | Analiza el código y los requisitos con la lista de chequeo y reporta hallazgos. | Dannes Haro |
| Registrador | Consolida los hallazgos sin duplicados y conserva la evidencia. | Kleber Tipantiza |

> Principio de trabajo: se revisa el producto, no a la persona que lo creó.

---

## 2. Proceso seguido

1. **Preparación:** alcance (`src/descuentos.js`, 7 líneas), versión del artefacto, criterios (checklist sección B y RF-01 a RF-04) y material de apoyo.
2. **Revisión individual:** lectura del código línea por línea, sin ejecutarlo, más la salida de ESLint.
3. **Consolidación:** unificación de los hallazgos de ESLint y de la revisión humana, sin duplicados.
4. **Rework y seguimiento:** corrección de las reglas confirmadas, nuevo análisis con ESLint y registro del estado de cada hallazgo.

---

## 3. Resultado del checklist (sección B)

| # | Ítem | Resultado | Hallazgos |
|---|---|---|---|
| 11 | El código implementa lo que dice cada RF, sin reglas inventadas. | No | H-04, H-05 |
| 12 | Se validan los parámetros de entrada. | No | H-07 |
| 13 | Comparaciones estrictas y `const`/`let`. | No | H-01, H-02 |
| 14 | Los caminos de error terminan de forma controlada. | No | H-06 |
| 15 | Estructuras de control y estilo cumplen las reglas del equipo. | No | H-03 |
| 16 | Sin variables sin uso, código muerto ni `console.log` en la lógica. | No | H-06 |

---

## 4. Tabla de hallazgos

| ID | Origen | Evidencia | Descripción objetiva | Severidad | Acción | Estado |
|---|---|---|---|---|---|---|
| H-01 | ESLint (`no-var`) | `lint-inicial.txt` 2:2 y 5:2 | `var` en `descuento` y `total`: alcance de función y elevación (*hoisting*). | Baja | `let` para `descuento` (se reasigna) y `const` para `total`. | Corregido (commit `9dedd00`) |
| H-02 | ESLint (`eqeqeq`) | `lint-inicial.txt` 3:12 | `esVip == true` usa comparación con conversión de tipo. | Media | Cambiar a `esVip === true`. Implica que `esVip` debe ser booleano estricto. | Corregido (commit `9dedd00`); tipo de `esVip` por confirmar |
| H-03 | ESLint (`curly`) | `lint-inicial.txt` 3:21 y 4:24 | Dos `if` sin llaves. | Baja | Agregar llaves en ambos. | Corregido (commit `9dedd00`) |
| H-04 | Revisión humana | `descuentos.js` línea 3 | Se suma un 10 fijo al descuento VIP sin fuente ni definición (¿10 % o 10 unidades monetarias?). Contradice la falta de definición de RF-02. | Alta | No modificar. Confirmar S-02, S-03 y S-04 con el negocio y dejar un comentario `TODO`. | Abierto, pendiente de confirmación |
| H-05 | Revisión humana | `descuentos.js` línea 5 | No hay tope: el descuento puede superar el precio y el total ser negativo (precio 5, porcentaje 100, VIP: total = −10). Incumple R-03 / RF-03. | Alta | Definir qué es una promoción y qué pasa con el total (S-05, S-06) antes de implementar el tope. | Abierto, pendiente de confirmación |
| H-06 | Revisión humana | `descuentos.js` línea 4 | Si `porcentaje > 100` solo se escribe en consola y el cálculo continúa; la lógica de negocio mezcla salida por consola. ESLint no lo señala porque `no-console` no está en las reglas recomendadas. | Alta | Definir la reacción ante entradas inválidas (S-07, S-09); en la segunda iteración, error controlado. | Abierto, pendiente de confirmación |
| H-07 | Revisión humana | `descuentos.js` líneas 1 y 2 | No se validan las entradas: precio o porcentaje negativos, `NaN`, `null`, `undefined` o cadenas producen resultados sin sentido. | Media | Agregar validación según RF-04 cuando se confirmen S-07 y S-09. | Abierto, pendiente de confirmación |
| H-08 | Revisión humana | `descuentos.js` líneas 2 y 5 | Sin redondeo ni formato: la aritmética de punto flotante puede devolver muchos decimales (RF-04). | Media | Definir regla de redondeo y moneda (S-08). | Abierto, pendiente de confirmación |
| H-09 | Revisión humana | `descuentos.js` completo | Sin documentación de parámetros (¿porcentaje de 0 a 100 o de 0 a 1?), sin referencia a RF-xx y sin pruebas asociadas: no hay trazabilidad código–requisito. | Baja | Agregar JSDoc, referencias a RF y casos de prueba por RF en la segunda iteración. | Abierto, segunda iteración |

**Resumen:** 9 hallazgos. 3 provienen de ESLint (5 ocurrencias) y 6 de la revisión humana. 3 están corregidos y 6 permanecen abiertos.

---

## 5. ESLint frente a revisión humana

- **ESLint** detectó únicamente problemas de convenciones y mantenibilidad (`no-var`, `eqeqeq`, `curly`). No detectó ningún problema relacionado con los requisitos de negocio.
- **La revisión humana** encontró los defectos de mayor severidad (H-04 a H-06): reglas inventadas, ausencia de tope y manejo inadecuado de errores. Para ver estos defectos hace falta contexto de los requisitos, algo que la herramienta no tiene.

---

## 6. Correcciones aplicadas

Se corrigieron **solo** los hallazgos confirmados (H-01, H-02 y H-03), que son reglas de estilo acordadas para el equipo y no cambian reglas de negocio. Los hallazgos H-04 a H-09 dependen de supuestos pendientes de confirmación y **no se modificaron**, para no introducir comportamiento no acordado. El análisis posterior está en `evidencias/lint-final.txt`.

---

## 7. Decisiones preventivas

- Mantener el script `npm run lint` como control previo a cada cambio.
- No implementar reglas de negocio hasta que se confirmen los supuestos S-01 a S-10.
- Evaluar agregar `no-console` al conjunto de reglas para la segunda iteración.
- Derivar casos de prueba de los criterios de aceptación de RF-01 a RF-04.
- Mantener la revisión mediante pull request antes de integrar cambios en `main`.

---

## 8. Cierre

| Dato | Valor |
|---|---|
| Decisión | Aprobado con correcciones |
| Hallazgos abiertos | H-04, H-05, H-06, H-07, H-08, H-09 |
| Fecha de cierre | 11/13/2026 |

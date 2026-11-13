# Módulo de descuentos para tienda digital

Auditoría estática de un módulo JavaScript: revisión de requisitos, inspección por pares y detección temprana de defectos con ESLint, sin ejecutar pruebas funcionales.

**Actividad:** Auditoría estática de un módulo JavaScript: requisitos, inspección por pares y detección temprana de defectos
**Autor:** Kleber Tipantiza

---

## Estructura del repositorio

```
.
├── src/
│   └── descuentos.js          # Módulo auditado (función calcularDescuento)
├── docs/
│   ├── requisitos.md          # Análisis de R-01 a R-04, RF-01 a RF-04 y matriz de trazabilidad
│   ├── checklist.md           # Lista de chequeo de revisión (16 ítems)
│   └── inspeccion.md          # Acta de inspección por pares y tabla de hallazgos
├── evidencias/
│   ├── lint-inicial.txt       # Análisis de ESLint antes de las correcciones
│   └── lint-final.txt         # Análisis de ESLint después de las correcciones
├── eslint.config.mjs          # Configuración de ESLint
├── package.json
├── .gitignore
└── README.md
```

---

## Requisitos previos

- Node.js (versión LTS) y npm.

## Instalación y uso

```bash
npm install
npm run lint
```

`npm run lint` ejecuta ESLint sobre `src/`. Para guardar el resultado en un archivo legible:

```bash
npm run lint -- --no-color --output-file evidencias/lint-final.txt
```

Si no hay hallazgos, ESLint termina sin mostrar errores y el archivo queda vacío.

---

## Reglas de ESLint y justificación

| Regla | Justificación |
|---|---|
| `no-var` | `var` tiene alcance de función y elevación (*hoisting*), lo que permite usar o redeclarar variables sin aviso. `let` y `const` tienen alcance de bloque y hacen explícito qué valores cambian. |
| `eqeqeq` | `==` fuerza conversiones de tipo y produce resultados engañosos. `===` hace la comparación predecible en reglas de negocio como el descuento VIP. |
| `no-unused-vars` | Las variables sin uso suelen indicar código muerto o lógica incompleta. Eliminarlas reduce ruido y facilita la revisión humana. En el código inicial no generó hallazgos; se mantiene como control preventivo. |
| `curly` | Exigir llaves evita que se rompa la lógica al agregar líneas a un `if` y mejora la legibilidad. |

---

## Resumen de resultados

| Etapa | Resultado |
|---|---|
| Análisis inicial | 5 errores: 2 de `no-var`, 1 de `eqeqeq` y 2 de `curly` |
| Análisis final | 0 errores, 0 advertencias |
| Inspección por pares | 9 hallazgos: 3 de ESLint y 6 de revisión humana |
| Estado de hallazgos | 3 corregidos; 6 abiertos, pendientes de confirmación del negocio |

Los hallazgos abiertos (H-04 a H-09) dependen de supuestos de negocio que aún no están confirmados (ver `docs/requisitos.md`, sección 5), por lo que no se modificó ese comportamiento.

---

## Flujo de trabajo

- La rama `main` conserva la versión inicial auditada.
- Las correcciones se realizan en la rama `correcciones-eslint` y se integran mediante pull request, con revisión de un par.
- Los mensajes de commit describen el cambio realizado.

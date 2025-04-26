# Funcionalidad: Solicitudes de Vacaciones

## Modelo de Datos

### Tabla SolicitudVacaciones

Se requiere crear una tabla con la siguiente estructura:

- `Id` - INT IDENTITY(1,1) PRIMARY KEY
- `Estado` - VARCHAR(32) DEFAULT 'Pendiente' CHECK (Estado IN ('Pendiente', 'Aprobado', 'Rechazado'))
- `DNIEmpleado` - VARCHAR(64) UNIQUE
- `CantidadDias` - INT
- `FechaSolicitud` - DATETIME DEFAULT GETDATE()

## Procedimientos Almacenados

### sp_crear_solicitudes_vacaciones

**Parámetros de entrada:**
- `@inValorDocumentoIdentidad VARCHAR(64)` - DNI del empleado
- `@inCantDias INT` - Cantidad de días solicitados
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Códigos de resultado:**
- `0` - Operación exitosa
- `50004` - Valor de documento de identidad no válido
- `50008` - Empleado no existe en el sistema o error de base de datos
### *Devolver como detail  desde la tabla Error la descripcion de los errores en el recordset*

**Comportamiento:**
- Validar que el documento de identidad sea válido
- Verificar que el empleado exista en el sistema
- Crear una nueva solicitud de vacaciones en estado 'Pendiente'
- No devuelve recordset, solo el código de resultado

### sp_listar_solicitudes_vacaciones

**Parámetros de entrada:**
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Resultado:**
- Devuelve un recordset con todas las solicitudes pendientes con la estructura:
  ```
  [
    {
      IdSolicitud: 1,
      Estado: "Pendiente",
      EmpleadoNombre: "Jose",
      EmpleadoDNI: "1254452",
      CantDias: 5
    },
    ...
  ]
  ```
- Código de resultado 0 si la operación es exitosa

### sp_tramitar_solicitudes_vacaciones

**Parámetros de entrada:**
- `@inIdUsuario INT` - ID del usuario que tramita la solicitud
- `@inPostInIP VARCHAR(64)` - Dirección IP desde donde se tramita
- `@inIdSolicitud INT` - ID de la solicitud a tramitar
- `@inNuevoEstado VARCHAR(32)` - Nuevo estado ('Aprobado' o 'Rechazado')
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Comportamiento:**
1. Validar que el usuario sea ID 4 (Franco)
2. Si el estado es 'Rechazado', simplemente actualizar la solicitud
3. Si el estado es 'Aprobado':
   - Extraer la cantidad de días y DNI del empleado de la solicitud
   - Utilizar tipo de movimiento ID 4 (disfrute de vacaciones)
   - Llamar a `sp_insertar_movimiento` con los parámetros correspondientes
   - Manejar el código de resultado de `sp_insertar_movimiento`
   - Si es exitoso, actualizar la solicitud como 'Aprobada'
4. No devuelve recordset, solo el código de resultado
**Códigos de resultado:**
- `0` - Operación exitosa
- `50015` - Usuario desde tener los permisos para el tramite
### *Devolver como detail  desde la tabla Error la descripcion de los errores en el recordset*
**Referencia del SP llamado:**
```
sp_insertar_movimiento
(
    @inValorDocumentoIdentidad VARCHAR(16),
    @inIdTipoMovimiento INT,
    @inMonto FLOAT,
    @inPostByUserId INT,
    @inPostInIP VARCHAR(64),
    @outResultCode INT OUTPUT
)
```

# Funcionalidad: Solicitudes de Vacaciones

## Modelo de Datos

### Tabla SolicitudVacaciones

Se requiere crear una tabla con la siguiente estructura:

- `Id` - INT IDENTITY(1,1) PRIMARY KEY
- `Estado` - VARCHAR(20) DEFAULT 'Pendiente' CHECK (Estado IN ('Pendiente', 'Aprobado', 'Rechazado'))
- `DNIEmpleado` - VARCHAR(64) UNIQUE
- `CantidadDias` - INT
- `FechaSolicitud` - DATETIME DEFAULT GETDATE()

## Procedimientos Almacenados

### sp_crear_solicitudes_vacaciones

**Parámetros de entrada:**
- `@inValorDocumentoIdentidad VARCHAR(64)` - DNI del empleado
- `@inCantDias INT` - Cantidad de días solicitados
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Códigos de resultado:**
- `0` - Operación exitosa
- `50008` - Valor de documento de identidad no válido
- `50010` - Empleado no existe en el sistema

**Comportamiento:**
- Validar que el documento de identidad sea válido
- Verificar que el empleado exista en el sistema
- Crear una nueva solicitud de vacaciones en estado 'Pendiente'
- No devuelve recordset, solo el código de resultado

### sp_listar_solicitudes_vacaciones

**Parámetros de entrada:**
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Resultado:**
- Devuelve un recordset con todas las solicitudes pendientes con la estructura:
  ```
  [
    {
      IdSolicitud: 1,
      Estado: "Pendiente",
      EmpleadoNombre: "Jose",
      EmpleadoDNI: "1254452",
      CantDias: 5
    },
    ...
  ]
  ```
- Código de resultado 0 si la operación es exitosa

### sp_tramitar_solicitudes_vacaciones

**Parámetros de entrada:**
- `@inIdUsuario INT` - ID del usuario que tramita la solicitud
- `@inPostInIP VARCHAR(64)` - Dirección IP desde donde se tramita
- `@inIdSolicitud INT` - ID de la solicitud a tramitar
- `@inNuevoEstado VARCHAR(20)` - Nuevo estado ('Aprobado' o 'Rechazado')
- `@outResultCode INT OUTPUT` - Código de resultado de la operación

**Comportamiento:**
1. Validar que el usuario sea ID 4 (Franco)
2. Si el estado es 'Rechazado', simplemente actualizar la solicitud
3. Si el estado es 'Aprobado':
   - Extraer la cantidad de días y DNI del empleado de la solicitud
   - Utilizar tipo de movimiento ID 4 (disfrute de vacaciones)
   - Llamar a `sp_insertar_movimiento` con los parámetros correspondientes
   - Manejar el código de resultado de `sp_insertar_movimiento`
   - Si es exitoso, actualizar la solicitud como 'Aprobada'
4. No devuelve recordset, solo el código de resultado

**Referencia del SP llamado:**
```
sp_insertar_movimiento
(
    @inValorDocumentoIdentidad VARCHAR(16),
    @inIdTipoMovimiento INT,
    @inMonto FLOAT,
    @inPostByUserId INT,
    @inPostInIP VARCHAR(64),
    @outResultCode INT OUTPUT
)
```

## API Routes

### Crear solicitud de vacaciones
```
POST /api/v2/vacation_request
```

**Descripción**: Crea una nueva solicitud de vacaciones.

**Body**:
```json
{
  "ValorDocumentoIdentidad": "string",
  "CantidadDias": "number"
}
```

**Respuesta exitosa** (201 Created):
```json
{
  "success": true,
  "data": {
    "message": "Solicitud de vacaciones creada exitosamente"
  }
}
```

**Respuesta fallida** (400 Bad Request):
```json
{
  "success": false,
  "error": {
    "code": 50008,
    "detail": "Valor de documento de identidad no válido"
  }
}
```

### Listar solicitudes de vacaciones
```
GET /api/v2/vacation_request
```

**Descripción**: Obtiene la lista de solicitudes de vacaciones pendientes.

**Respuesta exitosa** (200 OK):
```json
{
  "success": true,
  "data": {
    "total": 2,
    "solicitudes": [
      {
        "IdSolicitud": 1,
        "Estado": "Pendiente",
        "EmpleadoNombre": "Jose",
        "EmpleadoDNI": "1254452",
        "CantDias": 5
      },
      {
        "IdSolicitud": 2,
        "Estado": "Pendiente",
        "EmpleadoNombre": "Maria",
        "EmpleadoDNI": "3265897",
        "CantDias": 3
      }
    ]
  }
}
```

### Tramitar solicitud de vacaciones
```
PATCH /api/v2/vacation_request/:idSolicitud
```

**Descripción**: Procesa una solicitud de vacaciones (aprueba o rechaza).

**Parámetros**:
- `idSolicitud`: ID de la solicitud a tramitar

**Body**:
```json
{
  "IdUsuario": "number",
  "NuevoEstado": "string" // "Aprobado" o "Rechazado"
}
```

**Respuesta exitosa** (200 OK):
```json
{
  "success": true,
  "data": {
    "message": "Solicitud de vacaciones procesada exitosamente"
  }
}
```

**Respuesta fallida** (403 Forbidden):
```json
{
  "success": false,
  "error": {
    "code": 50014,
    "detail": "Usuario no autorizado para tramitar solicitudes"
  }
}
```

**Respuesta fallida** (500 Server error):
```json
{
  "success": false,
  "error": {
    "code": 50011,
    "detail": "Monto del movimiento rechazado pues si se aplicar el saldo seria negativo."
  }
}
```

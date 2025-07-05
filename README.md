
````markdown
````
# 🧪 API Backend - NestJS + Prisma

API REST desarrollada con **NestJS**, **Prisma ORM** y **MySQL**, como parte de una prueba técnica. Permite crear usuarios, asociarles mensajes y consultar dicha información mediante endpoints documentados con Swagger.

---

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [Swagger](https://swagger.io/tools/swagger-ui/) - Documentación de API
- `class-validator` para validaciones en los DTOs

---

## 📁 Requisitos previos

- Node.js v18 o superior
- MySQL (local o remoto)
- npm o yarn

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nest_prueba"
````

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

2. Instala las dependencias:

```bash
npm install
```

3. Genera las migraciones y crea las tablas:

```bash
npx prisma migrate dev --name init
```

4. (Opcional) Verifica visualmente el modelo de datos:

```bash
npx prisma studio
```

---

## 🏃 Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run start:dev
```

La API estará disponible por defecto en: [http://localhost:3000](http://localhost:3000)

---

## 📄 Documentación Swagger

Swagger UI está disponible en:

📚 [http://localhost:3000/docs](http://localhost:3000/docs)

La configuración se encuentra en `main.ts`:

```ts
const config = new DocumentBuilder()
  .setTitle('📨 API - Users & Messages')
  .setDescription(
    `API para gestionar usuarios y mensajes asociados.

    Endpoints disponibles:
    - Crear usuario
    - Crear mensaje
    - Listar mensajes por usuario`
  )
  .setVersion('1.0')
  .addTag('Users')
  .addTag('Messages')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document); // Ruta: /docs
```

---

## 📮 Endpoints disponibles

| Método | Endpoint              | Descripción                         |
| ------ | --------------------- | ----------------------------------- |
| POST   | `/users`              | Crear un nuevo usuario              |
| POST   | `/messages`           | Crear un mensaje asociado a usuario |
| GET    | `/users/:id/messages` | Listar mensajes de un usuario       |

---

## ✅ Validaciones

### Usuario (`POST /users`)

* `name`: requerido (`@IsNotEmpty`)
* `email`: debe ser válido (`@IsEmail`)

### Mensaje (`POST /messages`)

* `content`: requerido (`@IsNotEmpty`)
* `userId`: debe ser un string UUID (`@IsString()`)

---

## 🗂 Estructura del proyecto

```txt
src/
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── dto/
├── messages/
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   ├── messages.module.ts
│   └── dto/
├── prisma/
│   ├── prisma.service.ts
│   └── prisma.module.ts
└── main.ts
```

---

## 🧪 Pruebas rápidas (Postman/cURL)

### Crear un usuario

```http
POST /users
Content-Type: application/json

{
  "name": "Juan",
  "email": "juan@mail.com"
}
```

### Crear un mensaje

```http
POST /messages
Content-Type: application/json

{
  "content": "Hola mundo",
  "userId": "21e08b9f-78ec-4017-8957-d0d0d5b95de9"
}
```

### Listar mensajes de un usuario

```http
GET /users/21e08b9f-78ec-4017-8957-d0d0d5b95de9/messages
```

---

## 🛠 Uso básico de Prisma

### Generar cliente (tras modificar `schema.prisma`)

```bash
npx prisma generate
```

### Migrar esquema a la base de datos

```bash
npx prisma migrate dev --name nombre
```

### Visualizar base de datos (GUI)

```bash
npx prisma studio
```

---

## 🌱 Archivo `.env.example`

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nest_prueba"
```

---

## 🧾 Licencia

Este proyecto fue desarrollado con fines educativos y técnicos. Puedes adaptarlo y reutilizarlo según tus necesidades.

---

## ✍️ Autor

Desarrollado por [Elver Tunubala](https://github.com/ElverTunubala) como parte de una prueba técnica.

```


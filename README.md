# senda-app

SENDA — visitas a domicilio (Nivel 2). Angular + Nest + Prisma + Neon + JWT.

```bash
cp apps/api/.env.example apps/api/.env
# DATABASE_URL
npm install --prefix apps/api && npm install --prefix apps/web
npm --prefix apps/api run prisma:migrate
npm --prefix apps/api run prisma:seed
npm run api
npm run web
```

Staff demo: `coord@senda.care` / `password123`
Neon: `morning-term-01133240`

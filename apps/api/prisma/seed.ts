import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
async function main() {
  await prisma.visitRequest.deleteMany();
  await prisma.user.deleteMany();
  const hash = await bcrypt.hash('password123', 10);
  const coord = await prisma.user.create({
    data: { email: 'coord@senda.care', passwordHash: hash, name: 'Nuria Coordinación', role: 'COORD' },
  });
  await prisma.user.create({
    data: { email: 'iker@senda.care', passwordHash: hash, name: 'Iker Acompañante', role: 'STAFF' },
  });
  await prisma.visitRequest.create({
    data: {
      beneficiaryName: 'Luis Herrera',
      beneficiaryAge: 82,
      address: 'Calle Olmo 14, 2ºA',
      city: 'Barrio Este',
      contactName: 'Marta Herrera',
      contactPhone: '612345678',
      contactEmail: 'marta@example.com',
      preferredSlot: 'MORNING',
      visitType: 'COMPANY',
      notes: 'Prefiere conversación y un paseo corto si hace buen tiempo.',
      status: 'NEW',
    },
  });
  await prisma.visitRequest.create({
    data: {
      beneficiaryName: 'Carmen Ruiz',
      beneficiaryAge: 78,
      address: 'Av. del Parque 3',
      city: 'Barrio Norte',
      contactName: 'Pedro Ruiz',
      contactPhone: '600111222',
      preferredSlot: 'AFTERNOON',
      visitType: 'ERRAND',
      notes: 'Acompañar a farmacia y compra ligera.',
      status: 'CONFIRMED',
      assignedToId: coord.id,
    },
  });
  console.log('SENDA seed OK');
}
main().finally(() => prisma.$disconnect());

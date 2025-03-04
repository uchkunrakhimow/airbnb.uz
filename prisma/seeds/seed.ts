import hashPassword from '@helpers/bcryptPasswd';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hashPassword('@admin');
  const userPassword = await hashPassword('@user');

  await prisma.user.upsert({
    where: { email: 'admin@airbnb.com' },
    update: {},
    create: {
      name: 'Test Admin',
      email: 'admin@airbnb.com',
      phoneNumber: '950099945',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@airbnb.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'user@airbnb.com',
      phoneNumber: '950099946',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Seed data added successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });

import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  const passwordHash = await hash('123456', 1)

  await prisma.user.deleteMany()
  await prisma.user.createMany({
    data: [
      {
        id: "user-001",
        name: "John Doe",
        email: "john-doe@acme.com",
        passwordHash,
        avatarUrl: faker.image.avatar(),
      },
      {
        id: "user-002",
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash,
        avatarUrl: faker.image.avatar(),
      },
      {
        id: "user-003",
        name: faker.person.fullName(),
        email: faker.internet.email(),
        passwordHash,
        avatarUrl: null,
      }
    ]
  });

  await prisma.holiday.deleteMany()
  await prisma.holiday.createMany({
    data: [
      {
        id: "holiday-001",
        date: new Date("2023-11-15"),
        type: "NATIONAL",
        description: "Feriado nacional",
        isRecurring: true
      },
      {
        id: "holiday-002",
        date: new Date("2023-07-09"),
        type: "STATE",
        isRecurring: true
      }
    ]
  })

  await prisma.court.deleteMany()
  await prisma.court.createMany({
    data: [
      {
        id: "court-001",
        name: "Tribunal de Justiça de São Paulo",
        type: "STATE_JUSTICE",
        address: "Praça da Sé, s/n",
        city: "São Paulo",
        state: "SP",
        isActive: true,
      },
      {
        id: "court-002",
        name: "Tribunal Regional Federal da 3ª Região",
        type: "FEDERAL_REGION",
        city: "São Paulo",
        state: "SP",
        isActive: true,
      }
    ]
  })

  await prisma.deadline.deleteMany()
  await prisma.deadline.createMany({
    data: [
      {
        id: "deadline-001",
        name: "Apelação Cível",
        startDate: new Date(),
        dueDateInDay: faker.number.int({
          min: 1,
          max: 15
        }),
        userId: "user-001",
        courtId: 'court-001'
      },
      {
        id: "deadline-002",
        name: "Recurso Administrativo",
        startDate: new Date(),
        dueDateInDay: faker.number.int({
          min: 1,
          max: 15
        }),
        userId: "user-002",
        courtId: 'court-002'
      },
      {
        id: "deadline-003",
        name: "Recurso Administrativo",
        startDate: new Date(),
        dueDateInDay: faker.number.int({
          min: 1,
          max: 15
        }),
        userId: "user-001",
        courtId: 'court-002'
      }
    ]
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
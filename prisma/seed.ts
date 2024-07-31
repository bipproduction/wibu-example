import prisma from "@/lib/db/prisma";

const listUserRole = [
  {
    id: "1",
    name: "admin",
  },
  {
    id: "2",
    name: "user",
  },
];

(async () => {
  for (let i of listUserRole) {
    await prisma.userRole.upsert({
      where: {
        id: i.id,
      },
      create: i,
      update: i,
    });
  }
})()
  .then(() => {
    console.log("done");
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

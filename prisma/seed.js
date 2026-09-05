const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const { TEAM_MEMBERS, DEAL_HISTORY } = require("./seedData");

async function main() {
  for (const member of TEAM_MEMBERS) {
    const record = await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {},
      create: member,
    });

    const deals = DEAL_HISTORY[member.slug];
    if (deals && deals.length) {
      const existing = await prisma.dealRecord.count({ where: { teamMemberId: record.id } });
      if (existing === 0) {
        await prisma.dealRecord.createMany({
          data: deals.map((deal, i) => ({ ...deal, teamMemberId: record.id, order: i })),
        });
      }
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.log(
      "Skipped admin user creation: set ADMIN_EMAIL and ADMIN_PASSWORD env vars before seeding to create the first admin login."
    );
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash, role: "ADMIN" },
  });
  console.log(`Admin user ready: ${adminEmail}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

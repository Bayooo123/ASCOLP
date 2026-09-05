const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

// Carried over from the existing static our-people.html so the new team page
// and homepage slideshow aren't empty on first deploy. Edit freely from the
// admin panel afterwards — this only runs if a TeamMember with the same slug
// doesn't already exist.
const TEAM_MEMBERS = [
  {
    slug: "abiola-sanni",
    name: "Prof. Abiola Sanni (SAN) PhD.",
    title: "Managing Partner",
    photoUrl: "/assets/images/team/prof-abiola-sanni.jpg",
    isPartner: true,
    featuredHome: true,
    homeOrder: 1,
    displayOrder: 1,
  },
  {
    slug: "kolawole-abdusalam",
    name: "Kolawole G. Abdusalam",
    credentials: "Esq. LL.B., B.L.",
    title: "Practice Head",
    photoUrl: "/assets/images/team/KOLAWOLE- ABDULSALAM-p.jpg",
    featuredHome: true,
    homeOrder: 2,
    displayOrder: 2,
  },
  {
    slug: "iniobong-umoh",
    name: "Iniobong Inieke Umoh (MRS)",
    credentials: "LL.B., B.L.",
    title: "Senior Associate",
    photoUrl: "/assets/images/team/iniobong-umoh.jpg",
    featuredHome: true,
    homeOrder: 3,
    displayOrder: 3,
  },
  {
    slug: "friday-ndubuisi",
    name: "Prof. Friday Ndubuisi",
    credentials: "B.A., M.PHIL., PhD., LL.B., LL.M, B.L.",
    title: "Consultant",
    photoUrl: "/assets/images/team/Friday Ndubuisi-p.jpg",
    featuredHome: true,
    homeOrder: 4,
    displayOrder: 4,
  },
  {
    slug: "ogbinaka-josephine",
    name: "Ogbinaka Josephine Aruoriwoghene",
    credentials: "LL.B., B.L.",
    title: "Associate",
    photoUrl: "/assets/images/team/josephine.jpg",
    featuredHome: true,
    homeOrder: 5,
    displayOrder: 5,
  },
  {
    slug: "omowumi-adeoye",
    name: "Omowumi Gloria Adeoye",
    credentials: "BS.C., LL.B., B.L",
    title: "Consultant",
    photoUrl: "/assets/images/team/Omowumi-p.png",
    featuredHome: true,
    homeOrder: 6,
    displayOrder: 6,
  },
  {
    slug: "bafewa-sanni",
    name: "Bafewa Sanni",
    credentials: "LL.B., B.L",
    title: "Associate",
    photoUrl: "/assets/images/team/Bafewa Sanni-p.png",
    featuredHome: true,
    homeOrder: 7,
    displayOrder: 7,
  },
  {
    slug: "ayanfeoluwa-sanni",
    name: "Ayanfeoluwa Sanni",
    credentials: "LL.B., B.L., LL.M.",
    title: "Associate",
    photoUrl: "/assets/images/team/Ayanfe-Sanni-p.png",
    displayOrder: 8,
  },
  {
    slug: "emmanuel-abaniwo",
    name: "Emmanuel Sokowonci Abaniwo",
    credentials: "LL.B., B.L.",
    title: "Associate",
    photoUrl: "/assets/images/team/emanuel.jpg",
    displayOrder: 9,
  },
  {
    slug: "adeoye-adeola",
    name: "Adeoye Adeola Osemudiame",
    credentials: "LL.B., BL",
    title: "Associate",
    photoUrl: "/assets/images/team/adeoye.jpg",
    displayOrder: 10,
  },
  {
    slug: "maureen-omaegbu",
    name: "Maureen C. R. Omaegbu",
    credentials: "Esq, LL.B., B.L, ACARB",
    title: "Associate",
    photoUrl: "/assets/images/team/maureen.jpg",
    displayOrder: 11,
  },
  {
    slug: "babarinde-iyanuoluwa",
    name: "Babarinde Iyanuoluwa Peculiar",
    credentials: "LL.B., AICMC",
    title: "Associate",
    photoUrl: "/assets/images/team/babarinde-iyanu.jpg",
    displayOrder: 12,
  },
  {
    slug: "oyedele-aishat",
    name: "Oyedele Aishat Oyewumi",
    credentials: "LL.B., ACARB",
    title: "Associate",
    photoUrl: "/assets/images/team/aishat.jpg",
    displayOrder: 13,
  },
  {
    slug: "ofodirinwa-chinonye",
    name: "Ofodirinwa Harieta Chinonye",
    title: "Practice Manager",
    photoUrl: "/assets/images/team/chinoye.jpg",
    displayOrder: 14,
  },
  {
    slug: "popoola-ayodeji",
    name: "Popoola Ayodeji Jeremiah",
    title: "Head, IT Department",
    photoUrl: "/assets/images/team/popoola.jpg",
    displayOrder: 15,
  },
];

async function main() {
  for (const member of TEAM_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { slug: member.slug },
      update: {},
      create: member,
    });
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

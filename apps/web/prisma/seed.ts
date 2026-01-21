import { prisma } from "@/lib/prisma";

const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

function randomStatus(): (typeof statuses)[number] {
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomTitle(index: number) {
  const titles = [
    "Login issue",
    "Payment failed",
    "Feature request",
    "UI bug",
    "Report generation error",
    "Crash on mobile",
    "Notification not sent",
    "Incorrect data display",
    "Slow performance",
    "Error in dashboard",
  ];
  return `${titles[index % titles.length]} #${index + 1}`;
}

function randomDescription(index: number) {
  const descs = [
    "User reports problem with the system.",
    "Steps to reproduce the bug are unclear.",
    "Request for a new feature by user.",
    "UI misalignment on mobile view.",
    "Payment was processed but not reflected.",
    "PDF report missing information.",
    "Application crashes unexpectedly.",
    "Notifications delayed or not sent.",
    "Incorrect calculations in dashboard.",
    "Page load takes too long.",
  ];
  return descs[index % descs.length];
}

async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.issueReport.create({
      data: {
        title: randomTitle(i),
        description: randomDescription(i),
        status: randomStatus(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

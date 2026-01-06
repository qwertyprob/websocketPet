import { prisma } from "../lib/prisma";

export default async function Home() {
  "use server";
  const reportInfo = await prisma.issueReport.findFirst({
    include: {
      attachments: true,
    },
  });

  return (
    <ul>
      <li>{reportInfo?.id}</li>
      <li>{reportInfo?.title}</li>
      <li>{reportInfo?.description}</li>
      <li>{reportInfo?.status}</li>
      <li>{reportInfo?.createdAt.toDateString()}</li>
      {reportInfo?.attachments.map((item) => (
        <ul key={item.id}>
          <li>
            File:{item.file_name}.{item.file_type}
          </li>
          <li>Path:{item.file_path}</li>
        </ul>
      ))}
    </ul>
  );
}

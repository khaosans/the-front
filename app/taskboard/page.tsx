import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function TaskboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Taskboard</h1>
      {/* Add your taskboard content here */}
    </div>
  );
}
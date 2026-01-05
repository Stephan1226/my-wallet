"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function addTransaction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as string;
  const type = (formData.get("type") as string) || "EXPENSE";

  if (!title || !amount || !category) {
    throw new Error("Missing required fields");
  }

  await prisma.transaction.create({
    data: {
      userId: session.user.id,
      title,
      amount,
      category,
      type,
      date: new Date(),
    },
  });

  revalidatePath("/");
}

export async function deleteTransaction(id: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Ensure user owns the transaction
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction || transaction.userId !== session.user.id) {
    throw new Error("Unauthorized or not found");
  }

  await prisma.transaction.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
}

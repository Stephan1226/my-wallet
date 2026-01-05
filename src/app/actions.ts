"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addTransaction(formData: FormData) {
  const title = formData.get("title") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const category = formData.get("category") as string;

  if (!title || !amount || !category) {
    throw new Error("Missing required fields");
  }

  await prisma.transaction.create({
    data: {
      title,
      amount,
      category,
      date: new Date(),
    },
  });

  revalidatePath("/");
}

export async function deleteTransaction(id: number) {
  await prisma.transaction.delete({
    where: { id },
  });

  revalidatePath("/");
}

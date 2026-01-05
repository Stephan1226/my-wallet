import { prisma } from "@/lib/prisma";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionItem } from "./components/TransactionItem";
import { DashboardStats } from "./components/DashboardStats";

async function getTransactions() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      date: "desc",
    },
  });
  return transactions;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const transactions = await getTransactions();
  const totalDebt = transactions.reduce((acc: number, t: { amount: number }) => acc + t.amount, 0);
  
  const now = new Date();
  const monthlyDebt = transactions
    .filter((t: { date: Date }) => 
      t.date.getMonth() === now.getMonth() && 
      t.date.getFullYear() === now.getFullYear()
    )
    .reduce((acc: number, t: { amount: number }) => acc + t.amount, 0);

  return (
    <main className="container">
      <header style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-1px" }}>
          Shadow <span style={{ color: "var(--color-primary)" }}>Wallet</span>
        </h1>
      </header>

      <DashboardStats totalDebt={totalDebt} monthlyDebt={monthlyDebt} />

      <TransactionForm />

      <section style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "1.25rem" }}>최근 내역</h2>
        {transactions.length === 0 ? (
          <p className="text-muted" style={{ textAlign: "center", padding: "40px" }}>
            아직 기록된 내역이 없습니다.
          </p>
        ) : (
          <div className="list">
            {transactions.map((t: { id: number; title: string; amount: number; category: string; date: Date }) => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

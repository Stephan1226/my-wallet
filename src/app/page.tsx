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
  
  const totalAssets = transactions
    .filter((t: { type: string; amount: number }) => t.type === "ASSET")
    .reduce((acc: number, t: { amount: number }) => acc + t.amount, 0);

  const totalDebt = transactions
    .filter((t: { type: string; amount: number }) => t.type === "EXPENSE")
    .reduce((acc: number, t: { amount: number }) => acc + t.amount, 0);

  const netMoney = totalAssets - totalDebt;

  return (
    <main className="container">
      <header style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-1px" }}>
          Shadow <span style={{ color: "var(--color-primary)" }}>Wallet</span>
        </h1>
      </header>

      <DashboardStats netMoney={netMoney} totalAssets={totalAssets} totalDebt={totalDebt} />

      <TransactionForm />

      <section style={{ marginTop: "40px" }}>
        <h2 style={{ marginBottom: "20px", fontSize: "1.25rem" }}>최근 내역</h2>
        {transactions.length === 0 ? (
          <p className="text-muted" style={{ textAlign: "center", padding: "40px" }}>
            아직 기록된 내역이 없습니다.
          </p>
        ) : (
          <div className="list">
            {transactions.map((t: { id: number; title: string; amount: number; category: string; type: string; date: Date }) => (
              <TransactionItem key={t.id} transaction={t} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

import { prisma } from "@/lib/prisma";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionItem } from "./components/TransactionItem";
import { DashboardStats } from "./components/DashboardStats";
import { auth, signOut } from "@/auth";
import { Button } from "./components/Button"; // Importing Button

async function getTransactions() {
  const session = await auth();
  if (!session?.user?.id) return [];
  
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      date: "desc",
    },
  });

  return transactions;
}

export default async function Home() {
  const session = await auth();
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
      <header style={{ marginBottom: "32px", textAlign: "center", position: 'relative' }}>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-1px" }}>
          Shadow <span style={{ color: "var(--color-primary)" }}>Wallet</span>
        </h1>
        {session?.user && (
          <form action={async () => {
            'use server';
            await signOut();
          }} style={{ position: 'absolute', right: 0, top: 0 }}>
             <button type="submit" style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }}>
               로그아웃
             </button>
          </form>
        )}
      </header>

      <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#888', textAlign: 'center' }}>
        환영합니다, {session?.user?.name || session?.user?.email}님
      </div>

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
              <TransactionItem key={t.id} transaction={{ ...t, date: t.date.toISOString() }} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

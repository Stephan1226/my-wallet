"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteTransaction } from "../actions";
import styles from "./TransactionItem.module.css";
import clsx from "clsx";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date;
}

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this record?")) {
      startTransition(async () => {
        await deleteTransaction(transaction.id);
      });
    }
  };

  return (
    <div className={clsx(styles.item, isPending && styles.pending)}>
      <div className={styles.icon}>
        {transaction.category[0]}
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{transaction.title}</div>
        <div className={styles.date}>{format(transaction.date, "MMM d, yyyy")}</div>
      </div>
      <div className={styles.amount}>
        -₩{transaction.amount.toLocaleString()}
      </div>
      <button 
        onClick={handleDelete} 
        disabled={isPending}
        className={styles.deleteBtn}
        aria-label="Delete transaction"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

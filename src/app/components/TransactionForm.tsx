"use client";

import { addTransaction } from "../actions";
import { Button } from "./Button";
import { Input } from "./Input";
import { Card } from "./Card";
import { useRef, useTransition } from "react";
import styles from "./TransactionForm.module.css";

export function TransactionForm() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  async function action(formData: FormData) {
    startTransition(async () => {
      await addTransaction(formData);
      formRef.current?.reset();
    });
  }

  return (
    <Card className={styles.container}>
      <h2 className={styles.title}>Add New Debt</h2>
      <form ref={formRef} action={action} className={styles.form}>
        <Input 
          name="title" 
          label="What is this for?" 
          placeholder="e.g. Dinner with friends" 
          required 
        />
        <div className={styles.row}>
          <Input 
            name="amount" 
            label="Amount (₩)" 
            type="number" 
            placeholder="0" 
            step="0.01" 
            required 
          />
          <div className={styles.selectWrapper}>
            <label className={styles.label}>Category</label>
            <select name="category" className={styles.select} required>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <Button type="submit" isLoading={isPending} className={styles.submitBtn}>
          Add to Shadow Wallet
        </Button>
      </form>
    </Card>
  );
}

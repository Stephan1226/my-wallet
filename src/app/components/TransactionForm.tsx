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
      <h2 className={styles.title}>지출 기록하기</h2>
      <form ref={formRef} action={action} className={styles.form}>
        <Input 
          name="title" 
          label="내용" 
          placeholder="예: 친구랑 저녁 약속" 
          required 
        />
        <div className={styles.row}>
          <Input 
            name="amount" 
            label="금액 (₩)" 
            type="number" 
            placeholder="0" 
            step="0.01" 
            required 
          />
          <div className={styles.selectWrapper}>
            <label className={styles.label}>카테고리</label>
            <select name="category" className={styles.select} required>
              <option value="Food">식비</option>
              <option value="Transport">교통</option>
              <option value="Shopping">쇼핑</option>
              <option value="Entertainment">문화/여가</option>
              <option value="Other">기타</option>
            </select>
          </div>
        </div>
        <Button type="submit" isLoading={isPending} className={styles.submitBtn}>
          그림자 지갑에 추가
        </Button>
      </form>
    </Card>
  );
}

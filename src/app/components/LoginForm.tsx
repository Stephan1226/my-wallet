'use client';
 
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/app/auth-actions';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import styles from './TransactionForm.module.css'; // Reusing styles

export default function LoginForm() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);
 
  return (
    <Card className={styles.container} style={{ maxWidth: '400px', margin: '40px auto' }}>
        <h2 className={styles.title} style={{ textAlign: 'center' }}>로그인</h2>
      <form action={dispatch} className={styles.form}>
        <Input label="이메일" name="email" type="email" placeholder="example@gmail.com" required />
        <Input label="비밀번호" name="password" type="password" placeholder="******" required />
        <div style={{ color: 'red', fontSize: '0.9rem' }} aria-live="polite" aria-atomic="true">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <LoginButton />
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
        계정이 없으신가요? <a href="/register" style={{ color: 'var(--color-primary)' }}>회원가입</a>
      </div>
    </Card>
  );
}
 
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className={styles.submitBtn} aria-disabled={pending}>
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  );
}

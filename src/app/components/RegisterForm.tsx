'use client';
 
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/app/auth-actions';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import styles from './TransactionForm.module.css'; // Reusing styles

export default function RegisterForm() {
  const [errorMessage, dispatch] = useActionState(register, undefined);
 
  return (
    <Card className={styles.container} style={{ maxWidth: '400px', margin: '40px auto' }}>
        <h2 className={styles.title} style={{ textAlign: 'center' }}>회원가입</h2>
      <form action={dispatch} className={styles.form}>
        <Input label="이름" name="name" type="text" placeholder="홍길동" required />
        <Input label="이메일" name="email" type="email" placeholder="example@gmail.com" required />
        <Input label="비밀번호" name="password" type="password" placeholder="6자 이상 입력" required />
        <div style={{ color: 'red', fontSize: '0.9rem' }} aria-live="polite" aria-atomic="true">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <RegisterButton />
      </form>
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
        이미 계정이 있으신가요? <a href="/login" style={{ color: 'var(--color-primary)' }}>로그인</a>
      </div>
    </Card>
  );
}
 
function RegisterButton() {
  const { pending } = useFormStatus();
  return (
    <Button className={styles.submitBtn} aria-disabled={pending}>
      {pending ? '가입 중...' : '회원가입'}
    </Button>
  );
}

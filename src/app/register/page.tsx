import RegisterForm from '@/app/components/RegisterForm';
 
export default function RegisterPage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <header style={{ marginBottom: "32px", textAlign: "center" }}>
        <h1 style={{ fontWeight: 800, fontSize: "2rem", letterSpacing: "-1px" }}>
          Shadow <span style={{ color: "var(--color-primary)" }}>Wallet</span>
        </h1>
      </header>
      <RegisterForm />
    </main>
  );
}

import styles from "./DashboardStats.module.css";
import { Card } from "./Card";

export function DashboardStats({ totalDebt, monthlyDebt }: { totalDebt: number, monthlyDebt: number }) {
  return (
    <div className={styles.grid}>
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>Total Shadow Debt</h3>
        <div className={styles.amount}>
          ₩{totalDebt.toLocaleString()}
        </div>
        <p className={styles.subtext}>Total tracked since beginning</p>
      </Card>
      
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>This Month</h3>
        <div className={styles.amount} style={{ color: "var(--color-secondary)" }}>
          ₩{monthlyDebt.toLocaleString()}
        </div>
        <p className={styles.subtext}>Added in {new Date().toLocaleString('default', { month: 'long' })}</p>
      </Card>
    </div>
  );
}

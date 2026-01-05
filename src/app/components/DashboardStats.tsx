import styles from "./DashboardStats.module.css";
import { Card } from "./Card";

export function DashboardStats({ netMoney, totalAssets, totalDebt }: { netMoney: number, totalAssets: number, totalDebt: number }) {
  return (
    <div className={styles.grid}>
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>총 순자산 (Net Money)</h3>
        <div className={styles.amount}>
          ₩{netMoney.toLocaleString()}
        </div>
        <p className={styles.subtext}>자산 - 그림자 부채</p>
      </Card>

      <Card className={styles.statsCard}>
        <h3 className={styles.label}>총 자산</h3>
        <div className={styles.amount} style={{ color: "var(--color-secondary)" }}>
          ₩{totalAssets.toLocaleString()}
        </div>
        <p className={styles.subtext}>보유 현금 및 자산</p>
      </Card>
      
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>총 그림자 부채</h3>
        <div className={styles.amount} style={{ color: "var(--color-danger)" }}>
          ₩{totalDebt.toLocaleString()}
        </div>
        <p className={styles.subtext}>지금까지 쓴 내 돈 아닌 돈</p>
      </Card>
    </div>
  );
}

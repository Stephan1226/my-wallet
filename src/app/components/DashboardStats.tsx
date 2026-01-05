import styles from "./DashboardStats.module.css";
import { Card } from "./Card";

export function DashboardStats({ totalDebt, monthlyDebt }: { totalDebt: number, monthlyDebt: number }) {
  return (
    <div className={styles.grid}>
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>총 그림자 부채</h3>
        <div className={styles.amount}>
          ₩{totalDebt.toLocaleString()}
        </div>
        <p className={styles.subtext}>지금까지 쓴 내 돈 아닌 돈</p>
      </Card>
      
      <Card className={styles.statsCard}>
        <h3 className={styles.label}>이번 달 지출</h3>
        <div className={styles.amount} style={{ color: "var(--color-secondary)" }}>
          ₩{monthlyDebt.toLocaleString()}
        </div>
        <p className={styles.subtext}>{new Date().getMonth() + 1}월 사용 금액</p>
      </Card>
    </div>
  );
}

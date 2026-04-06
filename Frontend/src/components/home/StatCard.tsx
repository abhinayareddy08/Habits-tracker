import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { styles } from "@/lib/styles"
import type { LucideIcon } from "lucide-react"

interface Props {
  label: string
  value: string | number
  sub: string
  icon: LucideIcon
  iconColor: string
  valueGradient: string
}

const StatCard = ({ label, value, sub, icon: Icon, iconColor, valueGradient }: Props) => {
  return (
    <Card className={styles.cardDark}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${styles.cardTitleWhite}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className={`${styles.statValue} ${valueGradient}`}>
            {value}
          </div>
          <p className={styles.pageSubtitle}>{sub}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard

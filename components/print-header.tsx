import { Logo } from "./logo"

interface PrintHeaderProps {
  title?: string
  subtitle?: string
}

export function PrintHeader({ title, subtitle }: PrintHeaderProps) {
  return (
    <div className="hidden print:block print-header">
      <div className="flex flex-col items-center gap-2">
        <Logo variant="transparent" size="md" className="print-logo" />
        {title && <h1 className="text-xl font-bold text-primary">{title}</h1>}
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  )
}

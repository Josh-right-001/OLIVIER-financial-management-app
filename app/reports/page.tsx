import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Download, TrendingUp, DollarSign, Package, Users } from "lucide-react"

export default async function ReportsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Rapports et Statistiques</h1>
          <p className="text-muted-foreground">Analysez vos données et générez des rapports détaillés</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Revenus totaux"
            value="0 $"
            icon={<DollarSign className="h-6 w-6 text-green-500" />}
            trend="+0%"
          />
          <StatCard
            title="Dépenses totales"
            value="0 $"
            icon={<TrendingUp className="h-6 w-6 text-red-500" />}
            trend="+0%"
          />
          <StatCard
            title="Articles en stock"
            value="0"
            icon={<Package className="h-6 w-6 text-blue-500" />}
            trend="0"
          />
          <StatCard title="Employés actifs" value="0" icon={<Users className="h-6 w-6 text-purple-500" />} trend="0" />
        </div>

        {/* Report Types */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Rapport Financier"
            description="Vue d'ensemble des revenus, dépenses et soldes"
            icon={<BarChart3 className="h-8 w-8 text-accent" />}
            action="Générer"
          />
          <ReportCard
            title="Rapport Inventaire"
            description="État des stocks et mouvements de marchandises"
            icon={<Package className="h-8 w-8 text-accent" />}
            action="Générer"
          />
          <ReportCard
            title="Rapport RH"
            description="Paie, présences et documents employés"
            icon={<Users className="h-8 w-8 text-accent" />}
            action="Générer"
          />
          <ReportCard
            title="Rapport Transactions"
            description="Historique détaillé de toutes les transactions"
            icon={<FileText className="h-8 w-8 text-accent" />}
            action="Générer"
          />
          <ReportCard
            title="Rapport Mensuel"
            description="Synthèse complète du mois en cours"
            icon={<TrendingUp className="h-8 w-8 text-accent" />}
            action="Générer"
          />
          <ReportCard
            title="Export Données"
            description="Exporter toutes vos données en CSV/Excel"
            icon={<Download className="h-8 w-8 text-accent" />}
            action="Exporter"
          />
        </div>

        {/* Coming Soon Notice */}
        <Card className="mt-8 bg-accent/10 border-accent">
          <CardContent className="pt-6">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">Fonctionnalité en développement</h3>
              <p className="text-muted-foreground">
                Les rapports détaillés et les graphiques seront disponibles prochainement. Vous pourrez générer des
                analyses complètes de vos données financières, d'inventaire et RH.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: string
  icon: React.ReactNode
  trend: string
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          {icon}
        </div>
        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  )
}

function ReportCard({
  title,
  description,
  icon,
  action,
}: {
  title: string
  description: string
  icon: React.ReactNode
  action: string
}) {
  return (
    <Card className="hover:border-accent/50 transition-colors">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-primary">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full bg-primary hover:bg-primary/90" disabled>
          {action}
        </Button>
      </CardContent>
    </Card>
  )
}

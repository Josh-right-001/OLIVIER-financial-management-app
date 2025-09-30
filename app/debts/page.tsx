import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, AlertCircle } from "lucide-react"
import Link from "next/link"
import { DebtsList } from "@/components/debts-list"

export default async function DebtsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch debts
  const { data: debts } = await supabase
    .from("debts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate stats
  const totalDebts = debts?.length || 0
  const totalAmount = debts?.reduce((sum, debt) => sum + Number(debt.montant_total), 0) || 0
  const totalPaid = debts?.reduce((sum, debt) => sum + Number(debt.avance), 0) || 0
  const totalRemaining = debts?.reduce((sum, debt) => sum + Number(debt.reste), 0) || 0

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gestion des dettes</h1>
            <p className="text-muted-foreground">Suivez vos créances et paiements</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/debts/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle dette
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/debts/import">
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Link>
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Total dettes
              </CardTitle>
              <CardDescription>Nombre de créances</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{totalDebts}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Montant total</CardTitle>
              <CardDescription>Somme des dettes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{totalAmount.toFixed(2)} $</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-success">Déjà payé</CardTitle>
              <CardDescription>Avances effectuées</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{totalPaid.toFixed(2)} $</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Reste à payer</CardTitle>
              <CardDescription>Solde restant</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalRemaining.toFixed(2)} $</p>
            </CardContent>
          </Card>
        </div>

        {/* Debts List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Liste des dettes</CardTitle>
            <CardDescription>{totalDebts} dette(s) enregistrée(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <DebtsList debts={debts || []} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, Search } from "lucide-react"
import Link from "next/link"
import { TransactionsList } from "@/components/transactions-list"

export default async function TransactionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })

  // Calculate totals
  const totals = {
    revenus: transactions?.filter((t) => t.type === "revenu").reduce((sum, t) => sum + Number(t.montant), 0) || 0,
    depenses: transactions?.filter((t) => t.type === "depense").reduce((sum, t) => sum + Number(t.montant), 0) || 0,
    dettes: transactions?.filter((t) => t.type === "dette").reduce((sum, t) => sum + Number(t.montant), 0) || 0,
  }

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Transactions</h1>
            <p className="text-muted-foreground">Gérez vos revenus, dépenses et dettes</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/transactions/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle transaction
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/transactions/import">
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-success">Revenus</CardTitle>
              <CardDescription>Total des entrées</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{totals.revenus.toFixed(2)} $</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Dépenses</CardTitle>
              <CardDescription>Total des sorties</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{totals.depenses.toFixed(2)} $</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Solde Net</CardTitle>
              <CardDescription>Revenus - Dépenses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{(totals.revenus - totals.depenses).toFixed(2)} $</p>
            </CardContent>
          </Card>
        </div>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-primary">Liste des transactions</CardTitle>
                <CardDescription>{transactions?.length || 0} transaction(s) enregistrée(s)</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="bg-transparent">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <TransactionsList transactions={transactions || []} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

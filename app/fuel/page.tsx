import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, Fuel, TrendingUp } from "lucide-react"
import Link from "next/link"
import { FuelLogsList } from "@/components/fuel-logs-list"

export default async function FuelPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch fuel logs
  const { data: fuelLogs } = await supabase
    .from("fuel_logs")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })

  // Calculate stats
  const totalLogs = fuelLogs?.length || 0
  const totalLitres = fuelLogs?.reduce((sum, log) => sum + Number(log.quantite_litres), 0) || 0
  const totalCost = fuelLogs?.reduce((sum, log) => sum + Number(log.cout_total), 0) || 0
  const avgPricePerLitre = totalLitres > 0 ? totalCost / totalLitres : 0

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gestion Mazout</h1>
            <p className="text-muted-foreground">Suivez votre consommation de carburant</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/fuel/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau relevé
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/fuel/import">
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
                <Fuel className="h-5 w-5" />
                Relevés
              </CardTitle>
              <CardDescription>Nombre d'enregistrements</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{totalLogs}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Total litres</CardTitle>
              <CardDescription>Consommation totale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalLitres.toFixed(2)} L</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Coût total</CardTitle>
              <CardDescription>Dépenses carburant</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">{totalCost.toFixed(2)} $</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-success flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Prix moyen
              </CardTitle>
              <CardDescription>Par litre</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{avgPricePerLitre.toFixed(2)} $</p>
            </CardContent>
          </Card>
        </div>

        {/* Fuel Logs List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Historique des relevés</CardTitle>
            <CardDescription>{totalLogs} relevé(s) enregistré(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <FuelLogsList logs={fuelLogs || []} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

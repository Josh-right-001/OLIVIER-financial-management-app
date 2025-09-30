import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, Package } from "lucide-react"
import Link from "next/link"
import { InventoryList } from "@/components/inventory-list"

export default async function InventoryPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch inventory items
  const { data: inventory } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", user.id)
    .order("date_entree", { ascending: false })

  // Calculate totals
  const totalItems = inventory?.length || 0
  const totalQuantity = inventory?.reduce((sum, item) => sum + Number(item.quantite), 0) || 0
  const totalValue = inventory?.reduce((sum, item) => sum + Number(item.valeur_totale), 0) || 0

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Inventaire</h1>
            <p className="text-muted-foreground">Gérez vos stocks et entrées de marchandises</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/inventory/new">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter article
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/inventory/import">
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
              <CardTitle className="text-accent flex items-center gap-2">
                <Package className="h-5 w-5" />
                Articles
              </CardTitle>
              <CardDescription>Nombre total de produits</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{totalItems}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Quantité totale</CardTitle>
              <CardDescription>Somme des quantités</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalQuantity.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-success">Valeur totale</CardTitle>
              <CardDescription>Valeur de l'inventaire</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{totalValue.toFixed(2)} $</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Liste des articles</CardTitle>
            <CardDescription>{totalItems} article(s) en stock</CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryList items={inventory || []} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

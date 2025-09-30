import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Download, Upload, Users, UserCheck } from "lucide-react"
import Link from "next/link"
import { EmployeesList } from "@/components/employees-list"

export default async function EmployeesPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch employees
  const { data: employees } = await supabase
    .from("employees")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Calculate stats
  const totalEmployees = employees?.length || 0
  const activeEmployees = employees?.filter((e) => e.statut === "actif").length || 0
  const totalPayroll =
    employees?.filter((e) => e.statut === "actif").reduce((sum, e) => sum + Number(e.salaire_mensuel || 0), 0) || 0

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Employés</h1>
            <p className="text-muted-foreground">Gérez votre personnel et la paie</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/employees/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouvel employé
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/employees/import">
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
                <Users className="h-5 w-5" />
                Total employés
              </CardTitle>
              <CardDescription>Nombre total d'employés</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-accent">{totalEmployees}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-success flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Employés actifs
              </CardTitle>
              <CardDescription>Personnel en activité</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-success">{activeEmployees}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Masse salariale</CardTitle>
              <CardDescription>Total mensuel</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{totalPayroll.toFixed(2)} $</p>
            </CardContent>
          </Card>
        </div>

        {/* Employees List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Liste des employés</CardTitle>
            <CardDescription>{totalEmployees} employé(s) enregistré(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <EmployeesList employees={employees || []} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

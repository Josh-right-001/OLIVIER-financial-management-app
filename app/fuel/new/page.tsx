import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FuelLogForm } from "@/components/fuel-log-form"

export default async function NewFuelLogPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-primary mb-2">Nouveau relevé de carburant</h1>
        <p className="text-muted-foreground mb-8">Enregistrez une nouvelle consommation de mazout</p>
        <FuelLogForm />
      </div>
    </DashboardLayout>
  )
}

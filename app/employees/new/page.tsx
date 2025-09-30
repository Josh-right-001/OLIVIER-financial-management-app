import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { EmployeeForm } from "@/components/employee-form"

export default async function NewEmployeePage() {
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
        <h1 className="text-3xl font-bold text-primary mb-2">Nouvel employé</h1>
        <p className="text-muted-foreground mb-8">Ajoutez un nouvel employé à votre équipe</p>
        <EmployeeForm />
      </div>
    </DashboardLayout>
  )
}

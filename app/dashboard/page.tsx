import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Users,
  Package,
  FileText,
  Fuel,
  AlertCircle,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user profile only if user exists
  const { data: profile } = user
    ? await supabase.from("profiles").select("*").eq("id", user.id).single()
    : { data: null }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/logo-transparent.png" alt="OLIVIER" className="h-12 w-12 object-contain rounded-full" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-primary">Tableau de bord</h1>
              <p className="text-sm text-muted-foreground">
                {user ? `Bienvenue, ${profile?.full_name || user.email}` : "Mode invité - Explorez l'application"}
              </p>
            </div>
          </div>
          {user ? (
            <form action="/auth/signout" method="post">
              <Button variant="outline" type="submit">
                Déconnexion
              </Button>
            </form>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/auth/login">Se connecter</Link>
              </Button>
              <Button asChild className="bg-primary">
                <Link href="/auth/sign-up">S'inscrire</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!user && (
          <Card className="mb-8 bg-accent/10 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary mb-2">Mode invité activé</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Vous explorez l'application en mode invité. Les données ne seront pas sauvegardées. Créez un compte
                    pour accéder à toutes les fonctionnalités et sauvegarder vos données.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="bg-primary">
                      <Link href="/auth/sign-up">Créer un compte</Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/auth/login">Se connecter</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Solde Total" value="0 $" change="+0%" trend="up" icon={<TrendingUp className="h-5 w-5" />} />
          <StatCard
            title="Transactions"
            value="0"
            change="Ce mois"
            trend="neutral"
            icon={<FileText className="h-5 w-5" />}
          />
          <StatCard title="Employés" value="0" change="Actifs" trend="neutral" icon={<Users className="h-5 w-5" />} />
          <StatCard
            title="Articles en stock"
            value="0"
            change="Produits"
            trend="neutral"
            icon={<Package className="h-5 w-5" />}
          />
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Actions rapides</CardTitle>
            <CardDescription>Accédez rapidement aux fonctionnalités principales</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickActionButton href="/transactions/new" icon={<Plus />} label="Nouvelle transaction" />
              <QuickActionButton href="/inventory/new" icon={<Package />} label="Ajouter article" />
              <QuickActionButton href="/employees/new" icon={<Users />} label="Nouvel employé" />
              <QuickActionButton href="/fuel/new" icon={<Fuel />} label="Enregistrer mazout" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Activité récente</CardTitle>
              <CardDescription>Dernières transactions et modifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EmptyState message="Aucune activité récente" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-accent" />
                Alertes et rappels
              </CardTitle>
              <CardDescription>Notifications importantes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <EmptyState message="Aucune alerte pour le moment" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <NavigationCard
            href="/transactions"
            title="Transactions"
            description="Gérer les revenus, dépenses et dettes"
            icon={<FileText className="h-8 w-8 text-accent" />}
          />
          <NavigationCard
            href="/inventory"
            title="Inventaire"
            description="Stocks et entrées de marchandises"
            icon={<Package className="h-8 w-8 text-accent" />}
          />
          <NavigationCard
            href="/employees"
            title="Ressources Humaines"
            description="Employés, paie et documents"
            icon={<Users className="h-8 w-8 text-accent" />}
          />
          <NavigationCard
            href="/fuel"
            title="Gestion Mazout"
            description="Suivi de la consommation de carburant"
            icon={<Fuel className="h-8 w-8 text-accent" />}
          />
          <NavigationCard
            href="/reports"
            title="Rapports"
            description="Statistiques et exports"
            icon={<TrendingUp className="h-8 w-8 text-accent" />}
          />
          <NavigationCard
            href="/settings"
            title="Paramètres"
            description="Configuration et préférences"
            icon={<AlertCircle className="h-8 w-8 text-accent" />}
          />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="text-accent">{icon}</div>
        </div>
        <div className="text-3xl font-bold text-primary mb-1">{value}</div>
        <div className="flex items-center gap-1 text-sm">
          {trend === "up" && <ArrowUpRight className="h-4 w-4 text-success" />}
          {trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500" />}
          <span
            className={trend === "up" ? "text-success" : trend === "down" ? "text-red-500" : "text-muted-foreground"}
          >
            {change}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Button
      asChild
      variant="outline"
      className="h-auto flex-col gap-2 py-4 hover:bg-accent/10 hover:border-accent bg-transparent"
    >
      <Link href={href}>
        <div className="text-accent">{icon}</div>
        <span className="text-xs text-center">{label}</span>
      </Link>
    </Button>
  )
}

function NavigationCard({
  href,
  title,
  description,
  icon,
}: {
  href: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Link href={href}>
      <Card className="h-full hover:border-accent/50 transition-colors cursor-pointer">
        <CardContent className="pt-6">
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <p className="text-sm">{message}</p>
    </div>
  )
}

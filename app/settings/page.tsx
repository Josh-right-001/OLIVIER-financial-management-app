import { createClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, User, Bell, Shield, Database, Palette } from "lucide-react"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase.from("profiles").select("*").eq("id", user.id).single()
    : { data: null }

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Paramètres</h1>
          <p className="text-muted-foreground">Gérez vos préférences et configurations</p>
        </div>

        <div className="grid gap-6 max-w-4xl">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Profil utilisateur</CardTitle>
              </div>
              <CardDescription>Informations personnelles et compte</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="full_name">Nom complet</Label>
                <Input id="full_name" value={profile?.full_name || ""} placeholder="Votre nom complet" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" type="tel" placeholder="+243 XXX XXX XXX" />
              </div>
              <Button className="bg-primary hover:bg-primary/90" disabled>
                Enregistrer les modifications
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Notifications</CardTitle>
              </div>
              <CardDescription>Gérez vos préférences de notification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">Recevoir des alertes par email</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Activer
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Alertes de stock</p>
                    <p className="text-sm text-muted-foreground">Notifications pour stock faible</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Activer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Sécurité</CardTitle>
              </div>
              <CardDescription>Paramètres de sécurité et mot de passe</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Activer l'authentification à deux facteurs
              </Button>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Apparence</CardTitle>
              </div>
              <CardDescription>Personnalisez l'interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary">Thème</p>
                    <p className="text-sm text-muted-foreground">Choisir entre clair et sombre</p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Clair
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                <CardTitle className="text-primary">Gestion des données</CardTitle>
              </div>
              <CardDescription>Sauvegarde et export de vos données</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent" disabled>
                Exporter toutes les données
              </Button>
              <Button variant="outline" className="w-full bg-transparent text-red-600 border-red-600" disabled>
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon Notice */}
          <Card className="bg-accent/10 border-accent">
            <CardContent className="pt-6">
              <div className="text-center">
                <Settings className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">Fonctionnalités en développement</h3>
                <p className="text-muted-foreground">
                  Les paramètres avancés seront bientôt disponibles. Vous pourrez personnaliser entièrement votre
                  expérience et gérer vos préférences en détail.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

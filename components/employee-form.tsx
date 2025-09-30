"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function EmployeeForm({ employee }: { employee?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    nom: employee?.nom || "",
    postnom: employee?.postnom || "",
    prenom: employee?.prenom || "",
    role: employee?.role || "",
    salaire_unitaire: employee?.salaire_unitaire || "",
    unite_salaire: employee?.unite_salaire || "mois",
    salaire_mensuel: employee?.salaire_mensuel || "",
    banque: employee?.banque || "",
    compte_bancaire: employee?.compte_bancaire || "",
    telephone: employee?.telephone || "",
    email: employee?.email || "",
    statut: employee?.statut || "actif",
    date_embauche: employee?.date_embauche || new Date().toISOString().split("T")[0],
    notes: employee?.notes || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Non authentifié")

      const { error } = await supabase.from("employees").insert({
        ...formData,
        user_id: user.id,
        salaire_unitaire: formData.salaire_unitaire ? Number.parseFloat(formData.salaire_unitaire) : null,
        salaire_mensuel: formData.salaire_mensuel ? Number.parseFloat(formData.salaire_mensuel) : null,
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Employé ajouté avec succès",
      })

      router.push("/employees")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informations personnelles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom *</Label>
                <Input
                  id="nom"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Nom de famille"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postnom">Postnom</Label>
                <Input
                  id="postnom"
                  value={formData.postnom}
                  onChange={(e) => setFormData({ ...formData, postnom: e.target.value })}
                  placeholder="Postnom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  placeholder="Prénom"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  placeholder="+243 XXX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemple.com"
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informations professionnelles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="role">Poste / Rôle *</Label>
                <Input
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Ex: Ouvrier, Chauffeur, Comptable"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                    <SelectItem value="conge">En congé</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date_embauche">Date d'embauche</Label>
                <Input
                  id="date_embauche"
                  type="date"
                  value={formData.date_embauche}
                  onChange={(e) => setFormData({ ...formData, date_embauche: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Salary Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Rémunération</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salaire_unitaire">Salaire unitaire</Label>
                <Input
                  id="salaire_unitaire"
                  type="number"
                  step="0.01"
                  value={formData.salaire_unitaire}
                  onChange={(e) => setFormData({ ...formData, salaire_unitaire: e.target.value })}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unite_salaire">Unité</Label>
                <Select
                  value={formData.unite_salaire}
                  onValueChange={(value) => setFormData({ ...formData, unite_salaire: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heure">Par heure</SelectItem>
                    <SelectItem value="jour">Par jour</SelectItem>
                    <SelectItem value="mois">Par mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaire_mensuel">Salaire mensuel</Label>
                <Input
                  id="salaire_mensuel"
                  type="number"
                  step="0.01"
                  value={formData.salaire_mensuel}
                  onChange={(e) => setFormData({ ...formData, salaire_mensuel: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Informations bancaires</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="banque">Banque</Label>
                <Input
                  id="banque"
                  value={formData.banque}
                  onChange={(e) => setFormData({ ...formData, banque: e.target.value })}
                  placeholder="Nom de la banque"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="compte_bancaire">Numéro de compte</Label>
                <Input
                  id="compte_bancaire"
                  value={formData.compte_bancaire}
                  onChange={(e) => setFormData({ ...formData, compte_bancaire: e.target.value })}
                  placeholder="Numéro de compte bancaire"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Informations supplémentaires..."
              rows={4}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {employee ? "Mettre à jour" : "Enregistrer"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()} className="bg-transparent">
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

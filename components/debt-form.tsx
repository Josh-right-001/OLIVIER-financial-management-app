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

export function DebtForm({ debt }: { debt?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    nom_creancier: debt?.nom_creancier || "",
    montant_total: debt?.montant_total || "",
    avance: debt?.avance || "0",
    motif: debt?.motif || "",
    echeance: debt?.echeance || "",
    statut: debt?.statut || "en_cours",
    notes: debt?.notes || "",
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

      const { error } = await supabase.from("debts").insert({
        ...formData,
        user_id: user.id,
        montant_total: Number.parseFloat(formData.montant_total),
        avance: Number.parseFloat(formData.avance),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Dette enregistrée avec succès",
      })

      router.push("/debts")
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

  const reste =
    formData.montant_total && formData.avance
      ? (Number.parseFloat(formData.montant_total) - Number.parseFloat(formData.avance)).toFixed(2)
      : "0.00"

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nom_creancier">Nom du créancier *</Label>
              <Input
                id="nom_creancier"
                required
                value={formData.nom_creancier}
                onChange={(e) => setFormData({ ...formData, nom_creancier: e.target.value })}
                placeholder="Nom de la personne ou entreprise"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="montant_total">Montant total *</Label>
              <Input
                id="montant_total"
                type="number"
                step="0.01"
                required
                value={formData.montant_total}
                onChange={(e) => setFormData({ ...formData, montant_total: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avance">Avance payée</Label>
              <Input
                id="avance"
                type="number"
                step="0.01"
                value={formData.avance}
                onChange={(e) => setFormData({ ...formData, avance: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="echeance">Date d'échéance</Label>
              <Input
                id="echeance"
                type="date"
                value={formData.echeance}
                onChange={(e) => setFormData({ ...formData, echeance: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="statut">Statut</Label>
              <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="paye">Payé</SelectItem>
                  <SelectItem value="en_retard">En retard</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Remaining Amount Preview */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Reste à payer:</span>
              <span className="text-2xl font-bold text-primary">{reste} $</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif</Label>
            <Input
              id="motif"
              value={formData.motif}
              onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
              placeholder="Raison de la dette"
            />
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
              {debt ? "Mettre à jour" : "Enregistrer"}
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

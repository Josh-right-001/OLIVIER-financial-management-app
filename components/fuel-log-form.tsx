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
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export function FuelLogForm({ log }: { log?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    date: log?.date || new Date().toISOString().split("T")[0],
    heure: log?.heure || "",
    quantite_litres: log?.quantite_litres || "",
    prix_par_litre: log?.prix_par_litre || "",
    vehicule: log?.vehicule || "",
    conducteur: log?.conducteur || "",
    notes: log?.notes || "",
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

      const { error } = await supabase.from("fuel_logs").insert({
        ...formData,
        user_id: user.id,
        quantite_litres: Number.parseFloat(formData.quantite_litres),
        prix_par_litre: Number.parseFloat(formData.prix_par_litre),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Relevé enregistré avec succès",
      })

      router.push("/fuel")
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

  const coutTotal =
    formData.quantite_litres && formData.prix_par_litre
      ? (Number.parseFloat(formData.quantite_litres) * Number.parseFloat(formData.prix_par_litre)).toFixed(2)
      : "0.00"

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heure">Heure</Label>
              <Input
                id="heure"
                type="time"
                value={formData.heure}
                onChange={(e) => setFormData({ ...formData, heure: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantite_litres">Quantité (litres) *</Label>
              <Input
                id="quantite_litres"
                type="number"
                step="0.01"
                required
                value={formData.quantite_litres}
                onChange={(e) => setFormData({ ...formData, quantite_litres: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prix_par_litre">Prix par litre *</Label>
              <Input
                id="prix_par_litre"
                type="number"
                step="0.01"
                required
                value={formData.prix_par_litre}
                onChange={(e) => setFormData({ ...formData, prix_par_litre: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicule">Véhicule</Label>
              <Input
                id="vehicule"
                value={formData.vehicule}
                onChange={(e) => setFormData({ ...formData, vehicule: e.target.value })}
                placeholder="Ex: Camion 1, Voiture de service"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="conducteur">Conducteur</Label>
              <Input
                id="conducteur"
                value={formData.conducteur}
                onChange={(e) => setFormData({ ...formData, conducteur: e.target.value })}
                placeholder="Nom du conducteur"
              />
            </div>
          </div>

          {/* Cost Preview */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Coût total calculé:</span>
              <span className="text-2xl font-bold text-accent">{coutTotal} $</span>
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
              {log ? "Mettre à jour" : "Enregistrer"}
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

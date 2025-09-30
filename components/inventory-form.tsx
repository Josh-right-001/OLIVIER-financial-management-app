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

export function InventoryForm({ item }: { item?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    produit: item?.produit || "",
    quantite: item?.quantite || "",
    unite: item?.unite || "unité",
    prix_unitaire: item?.prix_unitaire || "",
    fournisseur: item?.fournisseur || "",
    date_entree: item?.date_entree || new Date().toISOString().split("T")[0],
    notes: item?.notes || "",
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

      const { error } = await supabase.from("inventory").insert({
        ...formData,
        user_id: user.id,
        quantite: Number.parseFloat(formData.quantite),
        prix_unitaire: Number.parseFloat(formData.prix_unitaire),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Article ajouté avec succès",
      })

      router.push("/inventory")
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
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="produit">Nom du produit *</Label>
              <Input
                id="produit"
                required
                value={formData.produit}
                onChange={(e) => setFormData({ ...formData, produit: e.target.value })}
                placeholder="Ex: Ciment, Fer à béton"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fournisseur">Fournisseur</Label>
              <Input
                id="fournisseur"
                value={formData.fournisseur}
                onChange={(e) => setFormData({ ...formData, fournisseur: e.target.value })}
                placeholder="Nom du fournisseur"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantite">Quantité *</Label>
              <Input
                id="quantite"
                type="number"
                step="0.01"
                required
                value={formData.quantite}
                onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unite">Unité *</Label>
              <Input
                id="unite"
                required
                value={formData.unite}
                onChange={(e) => setFormData({ ...formData, unite: e.target.value })}
                placeholder="Ex: kg, pièce, litre"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prix_unitaire">Prix unitaire *</Label>
              <Input
                id="prix_unitaire"
                type="number"
                step="0.01"
                required
                value={formData.prix_unitaire}
                onChange={(e) => setFormData({ ...formData, prix_unitaire: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_entree">Date d'entrée *</Label>
              <Input
                id="date_entree"
                type="date"
                required
                value={formData.date_entree}
                onChange={(e) => setFormData({ ...formData, date_entree: e.target.value })}
              />
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
              {item ? "Mettre à jour" : "Enregistrer"}
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

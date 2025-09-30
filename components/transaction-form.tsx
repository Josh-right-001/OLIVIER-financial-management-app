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

export function TransactionForm({ transaction }: { transaction?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    type: transaction?.type || "revenu",
    nom: transaction?.nom || "",
    reference: transaction?.reference || "",
    montant: transaction?.montant || "",
    devise: transaction?.devise || "USD",
    motif: transaction?.motif || "",
    date: transaction?.date || new Date().toISOString().split("T")[0],
    heure: transaction?.heure || "",
    telephone: transaction?.telephone || "",
    mode_paiement: transaction?.mode_paiement || "especes",
    notes: transaction?.notes || "",
    statut: transaction?.statut || "valide",
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

      const { error } = await supabase.from("transactions").insert({
        ...formData,
        user_id: user.id,
        montant: Number.parseFloat(formData.montant),
      })

      if (error) throw error

      toast({
        title: "Succès",
        description: "Transaction enregistrée avec succès",
      })

      router.push("/transactions")
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
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenu">Revenu</SelectItem>
                  <SelectItem value="depense">Dépense</SelectItem>
                  <SelectItem value="dette">Dette</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input
                id="nom"
                required
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                placeholder="Ex: Vente produit, Achat fourniture"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                placeholder="Ex: TXN-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="montant">Montant *</Label>
              <Input
                id="montant"
                type="number"
                step="0.01"
                required
                value={formData.montant}
                onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="devise">Devise</Label>
              <Select value={formData.devise} onValueChange={(value) => setFormData({ ...formData, devise: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="CDF">CDF (FC)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode_paiement">Mode de paiement</Label>
              <Select
                value={formData.mode_paiement}
                onValueChange={(value) => setFormData({ ...formData, mode_paiement: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="especes">Espèces</SelectItem>
                  <SelectItem value="banque">Banque</SelectItem>
                  <SelectItem value="mobile_money">Mobile Money</SelectItem>
                  <SelectItem value="cheque">Chèque</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
              <Label htmlFor="statut">Statut</Label>
              <Select value={formData.statut} onValueChange={(value) => setFormData({ ...formData, statut: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="valide">Validé</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="motif">Motif</Label>
            <Input
              id="motif"
              value={formData.motif}
              onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
              placeholder="Raison de la transaction"
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
              {transaction ? "Mettre à jour" : "Enregistrer"}
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

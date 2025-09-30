"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function DebtsList({ debts }: { debts: any[] }) {
  if (!debts || debts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune dette enregistrée</p>
        <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
          <Link href="/debts/new">Créer votre première dette</Link>
        </Button>
      </div>
    )
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "en_cours":
        return "bg-accent/10 text-accent"
      case "paye":
        return "bg-success/10 text-success"
      case "en_retard":
        return "bg-red-500/10 text-red-600"
      case "annule":
        return "bg-gray-500/10 text-gray-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Créancier</TableHead>
            <TableHead>Motif</TableHead>
            <TableHead className="text-right">Montant total</TableHead>
            <TableHead className="text-right">Avance</TableHead>
            <TableHead className="text-right">Reste</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {debts.map((debt) => (
            <TableRow key={debt.id}>
              <TableCell className="font-medium">{debt.nom_creancier}</TableCell>
              <TableCell className="text-muted-foreground">{debt.motif || "-"}</TableCell>
              <TableCell className="text-right font-semibold">{Number(debt.montant_total).toFixed(2)} $</TableCell>
              <TableCell className="text-right text-success">{Number(debt.avance).toFixed(2)} $</TableCell>
              <TableCell className="text-right font-semibold text-primary">{Number(debt.reste).toFixed(2)} $</TableCell>
              <TableCell>{debt.echeance ? new Date(debt.echeance).toLocaleDateString("fr-FR") : "-"}</TableCell>
              <TableCell>
                <Badge className={getStatutColor(debt.statut)}>{debt.statut}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/debts/${debt.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/debts/${debt.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function TransactionsList({ transactions }: { transactions: any[] }) {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune transaction enregistrée</p>
        <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
          <Link href="/transactions/new">Créer votre première transaction</Link>
        </Button>
      </div>
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "revenu":
        return "bg-success/10 text-success hover:bg-success/20"
      case "depense":
        return "bg-red-500/10 text-red-600 hover:bg-red-500/20"
      case "dette":
        return "bg-accent/10 text-accent hover:bg-accent/20"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "valide":
        return "bg-success/10 text-success"
      case "en_attente":
        return "bg-yellow-500/10 text-yellow-600"
      case "annule":
        return "bg-red-500/10 text-red-600"
      default:
        return "bg-gray-500/10 text-gray-600"
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Référence</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">{new Date(transaction.date).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>
                <Badge className={getTypeColor(transaction.type)}>{transaction.type}</Badge>
              </TableCell>
              <TableCell>{transaction.nom}</TableCell>
              <TableCell className="text-muted-foreground">{transaction.reference || "-"}</TableCell>
              <TableCell className="text-right font-semibold">
                {Number(transaction.montant).toFixed(2)} {transaction.devise}
              </TableCell>
              <TableCell className="text-muted-foreground">{transaction.mode_paiement || "-"}</TableCell>
              <TableCell>
                <Badge className={getStatutColor(transaction.statut)}>{transaction.statut}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/transactions/${transaction.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/transactions/${transaction.id}/edit`}>
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

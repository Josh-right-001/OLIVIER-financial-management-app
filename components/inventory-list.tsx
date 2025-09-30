"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function InventoryList({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun article en stock</p>
        <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
          <Link href="/inventory/new">Ajouter votre premier article</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead className="text-right">Quantité</TableHead>
            <TableHead>Unité</TableHead>
            <TableHead className="text-right">Prix unitaire</TableHead>
            <TableHead className="text-right">Valeur totale</TableHead>
            <TableHead>Date d'entrée</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.produit}</TableCell>
              <TableCell className="text-muted-foreground">{item.fournisseur || "-"}</TableCell>
              <TableCell className="text-right font-semibold">{Number(item.quantite).toFixed(2)}</TableCell>
              <TableCell>{item.unite}</TableCell>
              <TableCell className="text-right">{Number(item.prix_unitaire).toFixed(2)} $</TableCell>
              <TableCell className="text-right font-semibold text-success">
                {Number(item.valeur_totale).toFixed(2)} $
              </TableCell>
              <TableCell>{new Date(item.date_entree).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/inventory/${item.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/inventory/${item.id}/edit`}>
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

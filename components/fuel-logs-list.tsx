"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function FuelLogsList({ logs }: { logs: any[] }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun relevé enregistré</p>
        <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
          <Link href="/fuel/new">Créer votre premier relevé</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Heure</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Conducteur</TableHead>
            <TableHead className="text-right">Quantité (L)</TableHead>
            <TableHead className="text-right">Prix/L</TableHead>
            <TableHead className="text-right">Coût total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">{new Date(log.date).toLocaleDateString("fr-FR")}</TableCell>
              <TableCell>{log.heure || "-"}</TableCell>
              <TableCell>{log.vehicule || "-"}</TableCell>
              <TableCell>{log.conducteur || "-"}</TableCell>
              <TableCell className="text-right font-semibold">{Number(log.quantite_litres).toFixed(2)}</TableCell>
              <TableCell className="text-right">{Number(log.prix_par_litre).toFixed(2)} $</TableCell>
              <TableCell className="text-right font-semibold text-red-600">
                {Number(log.cout_total).toFixed(2)} $
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/fuel/${log.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/fuel/${log.id}/edit`}>
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

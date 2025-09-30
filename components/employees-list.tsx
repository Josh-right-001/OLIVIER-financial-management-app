"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export function EmployeesList({ employees }: { employees: any[] }) {
  if (!employees || employees.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucun employé enregistré</p>
        <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
          <Link href="/employees/new">Ajouter votre premier employé</Link>
        </Button>
      </div>
    )
  }

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case "actif":
        return "bg-success/10 text-success"
      case "inactif":
        return "bg-gray-500/10 text-gray-600"
      case "conge":
        return "bg-accent/10 text-accent"
      case "suspendu":
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
            <TableHead>Nom complet</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Téléphone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Salaire mensuel</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {[employee.nom, employee.postnom, employee.prenom].filter(Boolean).join(" ")}
              </TableCell>
              <TableCell>{employee.role}</TableCell>
              <TableCell className="text-muted-foreground">{employee.telephone || "-"}</TableCell>
              <TableCell className="text-muted-foreground">{employee.email || "-"}</TableCell>
              <TableCell className="text-right font-semibold">
                {employee.salaire_mensuel ? `${Number(employee.salaire_mensuel).toFixed(2)} $` : "-"}
              </TableCell>
              <TableCell>
                <Badge className={getStatutColor(employee.statut)}>{employee.statut}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/employees/${employee.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/employees/${employee.id}/edit`}>
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

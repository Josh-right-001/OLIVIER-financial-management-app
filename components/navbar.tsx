"use client"

import Link from "next/link"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Package, Users, Fuel, CreditCard, BarChart3, Settings, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Tableau de bord", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Inventaire", href: "/inventory", icon: Package },
  { name: "Personnel", href: "/employees", icon: Users },
  { name: "Mazout", href: "/fuel", icon: Fuel },
  { name: "Dettes", href: "/debts", icon: CreditCard },
  { name: "Statistiques", href: "/statistics", icon: BarChart3 },
  { name: "Paramètres", href: "/settings", icon: Settings },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground no-print">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo variant="transparent" size="sm" />
            <span className="hidden font-semibold md:inline-block">OLIVIER</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button variant="ghost" size="sm" className="gap-2 text-primary-foreground hover:bg-secondary">
                <item.icon className="h-4 w-4" />
                <span className="hidden lg:inline">{item.name}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col gap-4 py-4">
              <Logo variant="transparent" size="md" className="mb-4" />
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

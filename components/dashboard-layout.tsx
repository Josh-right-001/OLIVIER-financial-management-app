"use client"

import type React from "react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Package, Users, Fuel, BarChart3, Settings, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: FileText },
  { name: "Inventaire", href: "/inventory", icon: Package },
  { name: "Employés", href: "/employees", icon: Users },
  { name: "Mazout", href: "/fuel", icon: Fuel },
  { name: "Rapports", href: "/reports", icon: BarChart3 },
  { name: "Paramètres", href: "/settings", icon: Settings },
]

export function DashboardLayout({ children, user }: { children: React.ReactNode; user: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-primary/10 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <Logo size="md" />
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-primary/10">
            <div className="flex items-center gap-3 mb-3 px-2">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent font-semibold">{user?.email?.[0].toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary truncate">{user?.email}</p>
                <p className="text-xs text-muted-foreground">Utilisateur</p>
              </div>
            </div>
            <form action="/auth/signout" method="post">
              <Button variant="outline" size="sm" className="w-full bg-transparent" type="submit">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 bg-card border-b border-primary/10 lg:hidden">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
            <Logo size="sm" />
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}

import type React from "react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { ArrowRight, BarChart3, FileText, Users, Fuel } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center space-y-8">
          <Logo size="xl" />
          <h1 className="text-4xl md:text-6xl font-bold text-primary max-w-4xl text-balance">
            Gestion Financière, Logistique et RH pour PME
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty">
            OLIVIER simplifie la gestion de vos transactions, inventaire, paie et bien plus encore. Une solution
            complète pour optimiser votre entreprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/dashboard">
                Essayer sans compte <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary bg-transparent">
              <Link href="/auth/sign-up">Créer un compte</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary bg-transparent">
              <Link href="/auth/login">Se connecter</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-accent" />}
            title="Transactions"
            description="Gérez vos transactions financières, dépenses et revenus en temps réel"
          />
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-accent" />}
            title="Inventaire"
            description="Suivez vos stocks, entrées de marchandises et fournisseurs"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-accent" />}
            title="Ressources Humaines"
            description="Gestion de la paie, employés et documents RH"
          />
          <FeatureCard
            icon={<Fuel className="h-8 w-8 text-accent" />}
            title="Gestion Mazout"
            description="Suivi de la consommation de carburant et coûts associés"
          />
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Prêt à transformer votre gestion ?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui font confiance à OLIVIER pour leur gestion quotidienne
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/auth/sign-up">
              Créer un compte <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-card border border-primary/10 rounded-xl p-6 hover:border-accent/50 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

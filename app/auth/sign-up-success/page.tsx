import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Logo } from "@/components/logo"
import { CheckCircle2 } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <Card className="border-success/20">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-success" />
              </div>
              <CardTitle className="text-2xl text-primary">Compte créé avec succès !</CardTitle>
              <CardDescription className="text-base">
                Veuillez vérifier votre boîte email pour confirmer votre adresse.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Un email de confirmation a été envoyé à votre adresse. Cliquez sur le lien dans l'email pour activer
                votre compte.
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/auth/login">Retour à la connexion</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

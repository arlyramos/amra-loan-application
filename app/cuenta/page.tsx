"use client";

import Link from "next/link";
import { AmraLogo } from "@/components/amra-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function CuentaPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Gradient bar */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary to-accent" />
      
      <div className="min-h-[calc(100vh-8px)] flex flex-col md:flex-row">
        {/* Left side - Decorative */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary/5 to-accent/5 items-center justify-center p-8">
          <div className="max-w-md text-center">
            <div className="w-48 h-48 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <span className="text-5xl font-bold text-primary-foreground">A</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Bienvenido a Amra
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Evaluamos tu perfil con tecnología de Machine Learning para darte una respuesta inmediata.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <div className="flex justify-center mb-8">
              <AmraLogo />
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="text-xs mt-1 text-primary font-medium">Cuenta</span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-xs mt-1 text-muted-foreground">Solicitud</span>
              </div>
              <div className="w-12 h-0.5 bg-border" />
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-xs mt-1 text-muted-foreground">Resultado</span>
              </div>
            </div>

            <Card className="border-border shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  Crear cuenta en Amra
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Utiliza tu cuenta de Google para continuar.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <Link href="/solicitud">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 text-base font-medium border-2 hover:bg-muted/50 transition-colors"
                  >
                    <GoogleIcon />
                    <span className="ml-3">Continuar con Google</span>
                  </Button>
                </Link>

                <p className="mt-6 text-xs text-center text-muted-foreground leading-relaxed">
                  Al continuar, confirmas que has leído y aceptado los{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    Términos y Condiciones
                  </span>{" "}
                  y el{" "}
                  <span className="text-primary cursor-pointer hover:underline">
                    Aviso de Privacidad
                  </span>{" "}
                  de Amra.
                </p>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/solicitud" className="text-primary font-medium hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

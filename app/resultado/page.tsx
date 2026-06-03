"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AmraLogo } from "@/components/amra-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowLeft, Home } from "lucide-react";
import type { PredictionResponse } from "@/lib/types";

export default function ResultadoPage() {
  const [result, setResult] = useState<PredictionResponse | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("predictionResult");
    if (stored) {
      setResult(JSON.parse(stored));
    }
  }, []);

  if (!result) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No se encontró un resultado de evaluación.</p>
          <Link href="/solicitud">
            <Button variant="outline">Ir a solicitud</Button>
          </Link>
        </div>
      </main>
    );
  }

  const isApproved = result.prediction === "approved";

  return (
    <main className="min-h-screen bg-background">
      {/* Gradient bar */}
      <div className="h-2 w-full bg-gradient-to-r from-primary via-primary to-accent" />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-center mb-8">
          <AmraLogo />
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-8 mb-8">
          
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className="text-xs mt-1 text-muted-foreground">Solicitud</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className="text-xs mt-1 text-primary font-medium">Resultado</span>
          </div>
        </div>

        {/* Result Card */}
        <Card
          className={`border-2 shadow-lg ${
            isApproved
              ? "border-success bg-success/5"
              : "border-destructive bg-destructive/5"
          }`}
        >
          <CardContent className="p-8 text-center">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                isApproved ? "bg-success" : "bg-destructive"
              }`}
            >
              {isApproved ? (
                <CheckCircle className="w-10 h-10 text-success-foreground" />
              ) : (
                <XCircle className="w-10 h-10 text-destructive-foreground" />
              )}
            </div>

            <h1
              className={`text-2xl md:text-3xl font-bold mb-4 ${
                isApproved ? "text-success" : "text-destructive"
              }`}
            >
              {isApproved ? "Solicitud aprobada" : "Solicitud rechazada"}
            </h1>

            <p className="text-muted-foreground mb-6 text-lg">
              {isApproved
                ? "Tu perfil cumple con los criterios evaluados por nuestro modelo."
                : "Tu perfil no cumple con los criterios evaluados por nuestro modelo."}
            </p>

            {/* Probability Display */}
            <div className="bg-background rounded-xl p-6 mb-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">
                Probabilidad de aprobación
              </p>
              <p
                className={`text-4xl font-bold ${
                  isApproved ? "text-success" : "text-destructive"
                }`}
              >
                {result.probability}%
              </p>

              {/* Progress bar */}
              <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    isApproved ? "bg-success" : "bg-destructive"
                  }`}
                  style={{ width: `${result.probability}%` }}
                />
              </div>
            </div>

            {/* Recommendations */}
            
            {!isApproved && (
              <div className="bg-background rounded-xl p-6 mb-6 border border-border text-left">
                <h3 className="text-lg font-semibold mb-4">
                  Recomendaciones para mejorar tu solicitud
                </h3>

                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Mantén un historial crediticio positivo y sin atrasos.</li>
                  <li>Considera solicitar un monto de préstamo menor.</li>
                  <li>Procura demostrar ingresos estables y suficientes.</li>
                  <li>Si es posible, incrementa tu capacidad de pago.</li>
                  <li>Selecciona un plazo de préstamo acorde a tus ingresos.</li>
                </ul>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-muted/50 rounded-lg p-4 text-left">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Aviso:</strong> Este resultado es una predicción generada por un
                modelo de Machine Learning entrenado para un proyecto académico y no representa una
                aprobación real de préstamo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/solicitud" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-12 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Nueva solicitud
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button
              className="w-full h-12 font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Home className="w-4 h-4 mr-2" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

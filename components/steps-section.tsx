"use client";

import { UserPlus, ClipboardList, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Completa los datos",
    description: "Ingresa la información necesaria para evaluar la solicitud",
  },
  {
    icon: CheckCircle,
    title: "Consultar resultado",
    description: "Recibe tu evaluación en segundos.",
  },
];

export function StepsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground text-balance">
          Revisa tu solicitud para un préstamo en sencillos pasos.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

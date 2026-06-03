"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AmraLogo } from "@/components/amra-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { predictLoanApproval } from "@/lib/api";
import type { LoanApplicationData } from "@/lib/types";

export default function SolicitudPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    gender: "",
    married: "",
    dependents: "",
    education: "",
    self_employed: "",
    applicantincome: "",
    coapplicantincome: "",
    loanamount: "",
    loan_amount_term: "",
    credit_history: "",
    property_area: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.gender) newErrors.gender = "Selecciona una opción";
    if (!formData.married) newErrors.married = "Selecciona una opción";
    if (!formData.dependents) newErrors.dependents = "Selecciona una opción";
    if (!formData.education) newErrors.education = "Selecciona una opción";
    if (!formData.self_employed) newErrors.self_employed = "Selecciona una opción";
    if (!formData.applicantincome || Number(formData.applicantincome) <= 0)
      newErrors.applicantincome = "Ingresa un monto válido";
    if (!formData.coapplicantincome || Number(formData.coapplicantincome) < 0)
      newErrors.coapplicantincome = "Ingresa un monto válido";
    if (!formData.loanamount || Number(formData.loanamount) <= 0)
      newErrors.loanamount = "Ingresa un monto válido";
    if (!formData.loan_amount_term || Number(formData.loan_amount_term) <= 0)
      newErrors.loan_amount_term = "Ingresa un plazo válido";
    if (!formData.credit_history) newErrors.credit_history = "Selecciona una opción";
    if (!formData.property_area) newErrors.property_area = "Selecciona una opción";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const applicationData: LoanApplicationData = {
      gender: formData.gender as "male" | "female",
      married: formData.married as "yes" | "no",
      dependents: formData.dependents as "0" | "1" | "2" | "3+",
      education: formData.education as "graduate" | "not_graduate",
      self_employed: formData.self_employed as "yes" | "no",
      applicantincome: Number(formData.applicantincome),
      coapplicantincome: Number(formData.coapplicantincome),
      loanamount: Number(formData.loanamount),
      loan_amount_term: Number(formData.loan_amount_term),
      credit_history: Number(formData.credit_history) as 0 | 1,
      property_area: formData.property_area as "urban" | "semiurban" | "rural",
    };

    try {
      const result = await predictLoanApproval(applicationData);
      // Store result in sessionStorage for the result page
      sessionStorage.setItem("predictionResult", JSON.stringify(result));
      router.push("/resultado");
    } catch (error) {
  console.error("Error al conectar con la API:", error);
  alert("No se pudo conectar con el modelo. Verifica que Flask esté corriendo en http://localhost:5000");
} finally {
      setIsLoading(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

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
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <span className="text-xs mt-1 text-primary font-medium">Solicitud</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="text-xs mt-1 text-muted-foreground">Resultado</span>
          </div>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold text-card-foreground">
              Información para evaluación
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Completa el formulario para obtener tu evaluación de préstamo.
            </p>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => updateField("gender", value)}
                  >
                    <SelectTrigger id="gender" className={errors.gender ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Hombre</SelectItem>
                      <SelectItem value="female">Mujer</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs text-destructive">{errors.gender}</p>
                  )}
                </div>

                {/* Married */}
                <div className="space-y-2">
                  <Label htmlFor="married">Estado civil</Label>
                  <Select
                    value={formData.married}
                    onValueChange={(value) => updateField("married", value)}
                  >
                    <SelectTrigger id="married" className={errors.married ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Casado(a)</SelectItem>
                      <SelectItem value="no">Soltero(a)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.married && (
                    <p className="text-xs text-destructive">{errors.married}</p>
                  )}
                </div>

                {/* Dependents */}
                <div className="space-y-2">
                  <Label htmlFor="dependents">¿Cuántas personas dependen de usted?</Label>
                  <Select
                    value={formData.dependents}
                    onValueChange={(value) => updateField("dependents", value)}
                  >
                    <SelectTrigger id="dependents" className={errors.dependents ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3+">3+</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.dependents && (
                    <p className="text-xs text-destructive">{errors.dependents}</p>
                  )}
                </div>

                {/* Education */}
                <div className="space-y-2">
                  <Label htmlFor="education">Educación</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => updateField("education", value)}
                  >
                    <SelectTrigger id="education" className={errors.education ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="graduate">Graduado</SelectItem>
                      <SelectItem value="not_graduate">No Graduado</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.education && (
                    <p className="text-xs text-destructive">{errors.education}</p>
                  )}
                </div>

                {/* Self Employed */}
                <div className="space-y-2">
                  <Label htmlFor="self_employed">¿Trabajas por cuenta propia?</Label>
                  <Select
                    value={formData.self_employed}
                    onValueChange={(value) => updateField("self_employed", value)}
                  >
                    <SelectTrigger id="self_employed" className={errors.self_employed ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Sí</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.self_employed && (
                    <p className="text-xs text-destructive">{errors.self_employed}</p>
                  )}
                </div>

                {/* Credit History */}
                <div className="space-y-2">
                  <Label htmlFor="credit_history">Historial crediticio a su consideración</Label>
                  <Select
                    value={formData.credit_history}
                    onValueChange={(value) => updateField("credit_history", value)}
                  >
                    <SelectTrigger id="credit_history" className={errors.credit_history ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Bueno</SelectItem>
                      <SelectItem value="0">Malo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.credit_history && (
                    <p className="text-xs text-destructive">{errors.credit_history}</p>
                  )}
                </div>

                {/* Applicant Income */}
                <div className="space-y-2">
                  <Label htmlFor="applicantincome">Ingreso del solicitante en miles de pesos mexicanos</Label>
                  <Input
                    id="applicantincome"
                    type="number"
                    placeholder="Ej: $50,000 MXN

 "
                    value={formData.applicantincome}
                    onChange={(e) => updateField("applicantincome", e.target.value)}
                    className={errors.applicantincome ? "border-destructive" : ""}
                  />
                  {errors.applicantincome && (
                    <p className="text-xs text-destructive">{errors.applicantincome}</p>
                  )}
                </div>

                {/* Coapplicant Income */}
                <div className="space-y-2">
                  <Label htmlFor="coapplicantincome">Ingreso del cosolicitante en miles de pesos mexicanos</Label>
                  <Input
                    id="coapplicantincome"
                    type="number"
                    placeholder="Ej: $20,000 MXN

"
                    value={formData.coapplicantincome}
                    onChange={(e) => updateField("coapplicantincome", e.target.value)}
                    className={errors.coapplicantincome ? "border-destructive" : ""}
                  />
                  {errors.coapplicantincome && (
                    <p className="text-xs text-destructive">{errors.coapplicantincome}</p>
                  )}
                </div>

                {/* Loan Amount */}
                <div className="space-y-2">
                  <Label htmlFor="loanamount">Monto del préstamo en miles de pesos mexicanos</Label>
                  <Input
                    id="loanamount"
                    type="number"
                    placeholder="Ej: $80,000 MXN

"
                    value={formData.loanamount}
                    onChange={(e) => updateField("loanamount", e.target.value)}
                    className={errors.loanamount ? "border-destructive" : ""}
                  />
                  {errors.loanamount && (
                    <p className="text-xs text-destructive">{errors.loanamount}</p>
                  )}
                </div>

                {/* Loan Amount Term */}
                <div className="space-y-2">
                  <Label htmlFor="loan_amount_term">Plazo del préstamo (meses)</Label>
                  <Input
                    id="loan_amount_term"
                    type="number"
                    placeholder="Ej: 360"
                    value={formData.loan_amount_term}
                    onChange={(e) => updateField("loan_amount_term", e.target.value)}
                    className={errors.loan_amount_term ? "border-destructive" : ""}
                  />
                  {errors.loan_amount_term && (
                    <p className="text-xs text-destructive">{errors.loan_amount_term}</p>
                  )}
                </div>

                {/* Property Area */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="property_area">Zona en donde vive</Label>
                  <Select
                    value={formData.property_area}
                    onValueChange={(value) => updateField("property_area", value)}
                  >
                    <SelectTrigger id="property_area" className={errors.property_area ? "border-destructive" : ""}>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urbana</SelectItem>
                      <SelectItem value="semiurban">Semiurbana</SelectItem>
                      <SelectItem value="rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.property_area && (
                    <p className="text-xs text-destructive">{errors.property_area}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Spinner className="mr-2" />
                    Evaluando...
                  </>
                ) : (
                  "Ver resultado"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

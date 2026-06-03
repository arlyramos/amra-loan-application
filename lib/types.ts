export interface LoanApplicationData {
  gender: "male" | "female";
  married: "yes" | "no";
  dependents: "0" | "1" | "2" | "3+";
  education: "graduate" | "not_graduate";
  self_employed: "yes" | "no";
  applicantincome: number;
  coapplicantincome: number;
  loanamount: number;
  loan_amount_term: number;
  credit_history: 0 | 1;
  property_area: "urban" | "semiurban" | "rural";
}

export interface PredictionResponse {
  prediction: "approved" | "rejected";
  probability: number;
}

export interface ApiError {
  message: string;
  status: number;
}

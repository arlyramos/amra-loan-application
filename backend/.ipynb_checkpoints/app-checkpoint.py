from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

modelo = joblib.load("modelo_prestamos.pkl")
sc = joblib.load("escalador.pkl")
ohe = joblib.load("onehot_encoder.pkl")
oe = joblib.load("ordinal_encoder.pkl")

COLUMNAS_MODELO = [
    "dependents",
    "education",
    "applicantincome",
    "coapplicantincome",
    "loanamount",
    "loan_amount_term",
    "credit_history",
    "gender_male",
    "married_yes",
    "self_employed_yes",
    "property_area_semiurban",
    "property_area_urban",
]

COLUMNAS_ESCALAR = [
    "applicantincome",
    "coapplicantincome",
    "loanamount",
    "loan_amount_term",
]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    df = pd.DataFrame([data])

    df["dependents"] = df["dependents"].replace({
        "0": 0,
        "1": 1,
        "2": 2,
        "3+": 3
    })

    df[["education"]] = oe.transform(df[["education"]])

    columnas_ohe = [
        "gender",
        "married",
        "self_employed",
        "property_area"
    ]

    matrix = ohe.transform(df[columnas_ohe])

    df_ohe = pd.DataFrame(
        matrix,
        columns=ohe.get_feature_names_out(columnas_ohe)
    )

    df = pd.concat(
        [
            df.drop(columns=columnas_ohe).reset_index(drop=True),
            df_ohe.reset_index(drop=True)
        ],
        axis=1
    )

    df = df[COLUMNAS_MODELO]

    df[COLUMNAS_ESCALAR] = sc.transform(df[COLUMNAS_ESCALAR])

    pred = modelo.predict(df)[0]

    prob = modelo.predict_proba(df)[0][1] * 100

    resultado = "approved" if pred == 1 else "rejected"

    return jsonify({
        "prediction": resultado,
        "probability": round(prob, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
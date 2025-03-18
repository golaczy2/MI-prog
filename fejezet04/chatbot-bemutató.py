import openai
import gradio as gr
from config import OPENAI_API_KEY

# Beállítjuk az OpenAI API-kulcsot a konfigurációs fájlból
openai.api_key = OPENAI_API_KEY


def chatbot_response(input_text):
    response = openai.chat.completions.create(
        model="gpt-3.5-turbo",
        messages = [{"role": "system", "content": "Vele szeretnék beszélni:"},{"role": "user", "content": input_text}],

        max_completion_tokens=50  # Ezt hosszabb válaszok esetén módosíthatod
    )
    return response.choices[0].message.content


# Létrehozzuk a Gradio-interfészt
iface = gr.Interface(
    fn=chatbot_response,
    inputs=gr.Textbox(
        "szöveg", label="Add meg, hogy milyen típusú bottal szeretnél beszélgetni (például „programozási asszisztens” vagy „pszichológus”)"),
    outputs="text",
    live=True,
    title="Egyéni chatbot",
    description="Válaszd ki, hogy milyen típusú bottal szeretnél beszélgetni, és indítsd el a beszélgetést."
)

iface.launch()

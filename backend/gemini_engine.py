import os

from google import genai
from google.genai import types

import prompts
from models import Skill

apiKey = os.environ.get("GEMINI_API_KEY")
if not apiKey:
    raise ValueError("GEMINI_API_KEY environment variable not found.")

client = genai.Client(api_key=apiKey)


def generate_comms(skill: Skill, scenario: str) -> str:
    templateName = f"{skill.name}_TEMPLATE"
    selectedTemplate = getattr(prompts, templateName, None)

    if not selectedTemplate:
        return f"Error: No template found for {templateName}"

    promptText = selectedTemplate.format(scenario=scenario)

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            config=types.GenerateContentConfig(
                system_instruction=prompts.SYSTEM_INSTRUCTION,
                temperature=0.7,
                max_output_tokens=1000
            ),
            contents=promptText
        )
        return response.text
    except Exception as e:
        print(e)
        return f"An error occurred: {e}"

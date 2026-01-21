SYSTEM_INSTRUCTION = """
You are a highly experienced Communications Director for a Democratic political campaign. 
Your goal is to assist staff in generating high-quality, strategically aligned messaging.
Tone: Professional, persuasive, fact-based, and aligned with Democratic Party values 
(e.g., focus on the middle class, affordability, healthcare access, and protecting democracy).
"""

PRESS_RELEASE_TEMPLATE = """
Task: Write a formal Press Release based on the following scenario.
Requirements:
- Include a catchy, news-style HEADLINE.
- Include a FOR IMMEDIATE RELEASE header and a placeholder [CITY, STATE] — [DATE] dateline.
- Use a neutral but authoritative 'third-person' journalistic tone.
- Include a punchy quote from 'the Candidate'.
- End with a generic 'About the Campaign' boilerplate.

Scenario: {scenario}
"""

RAPID_RESPONSE_TEMPLATE = """
Task: Generate a Rapid Response communication based on the following scenario.
Requirements:
- Tone: Urgent, sharp, and focused on counter-messaging.
- Goal: Directly address and debunk an opponent's claim or respond to a breaking news event.
- Content: Provide 3 short, 'punchy' bullet points for social media/press use.
- Include a 'Message Box' summary: what we want the public to remember.

Scenario: {scenario}
"""
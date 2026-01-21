from enum import Enum

from pydantic import BaseModel, Field


class Skill(str, Enum):
    PRESS_RELEASE = "Press Release"
    RAPID_RESPONSE = "Rapid Response"


class CommsRequest(BaseModel):
    skill: Skill = Field(..., description="The type of campaign communication to generate")
    scenario: str = Field(..., min_length=10, description="The context for the AI")

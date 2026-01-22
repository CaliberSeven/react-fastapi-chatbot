import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from gemini_engine import generate_comms
from models import CommsRequest

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://react-fastapi-chatbot.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
def handle_generate(request: CommsRequest):
    try:
        apiResponse = generate_comms(request.skill, request.scenario)
        return {"result": apiResponse}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("main:app", host='127.0.0.1', port=8000)

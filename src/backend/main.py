import pathlib
import textwrap
import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from pydantic import BaseModel


class Item(BaseModel):
    query: str

app = FastAPI()
genai.configure(api_key="AIzaSyDlbKfAnfovanD_VtX8GnIYRD2QBLfVzkc")
model = genai.GenerativeModel('gemini-pro')

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://172.16.10.110",
    "http://172.16.10.110:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
async def root(item: Item):
    if item.query == "":
        return {
            "items": [""]
        }
    try:
        response = model.generate_content("""
Prompt: Translate the following English text into Vietnamese and provide 5 to 10 different ways to say it, formatted as an array.
Conditions:
- Use formal language suitable for a business setting.
- Ensure each translation is culturally appropriate.
- Avoid using slang or regional dialects.
Validation:
- Check each translation for grammatical correctness.
- Confirm that each translation conveys the same meaning as the original sentence.
Input: "I'm looking forward to our meeting."
Output: [
  "Tôi mong chờ cuộc họp của chúng ta",
  "Tôi đang rất chờ đợi cuộc họp với bạn",
  "Tôi không thể chờ đợi để gặp bạn trong cuộc họp",
  "Tôi rất háo hức cho cuộc họp sắp tới của chúng ta",
  "Cuộc họp sắp tới là điều tôi đang mong đợi",
  "Tôi đang rất mong chờ cuộc họp của chúng ta",
  "Tôi rất mong được gặp bạn tại cuộc họp",
  "Tôi đang đếm ngược từng ngày cho cuộc họp với bạn",
  "Tôi rất mong chờ được gặp bạn trong cuộc họp",
  "Cuộc họp với bạn là điều tôi đang trông chờ"
]
Input: "{query}"
Output: 
""".format(query = item.query))
        print(response.text)
        items = json.loads(response.text)
        if len(items) == 0:
            return {
                "items": [""]
            }
    except:
        return {
            "items": [""]
        }
    return {
        "items": items
    }

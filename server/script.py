from PyPDF2 import PdfReader
import os
import openai
import authentication

def parse_pdf():
    reader = PdfReader("../API/HY3238_20230314_Cold War.pdf")
    number_of_pages = len(reader.pages)
    text = ""

    for i in range(number_of_pages):
        page = reader.pages[i]
        text += page.extract_text()

    print("Text is converted")

    return text

def make_response(prompt):
  openai.api_key = authentication.API_KEY

  print("Sending API call to GPT")

  response = openai.ChatCompletion.create(
              model="gpt-3.5-turbo",
              messages = [
                        {"role": "user", "content": "Make flashcards from the following text in the form of a json string: " + prompt + "\n"}
                        ],
              temperature = 0
          )

  return response.choices[0].message.content

print(make_response(parse_pdf()))

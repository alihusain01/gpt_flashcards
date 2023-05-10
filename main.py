from pdf_parser import *
from gpt_API import *

text = parse_pdf()

print("PDF is parsed")

print(make_response(text))
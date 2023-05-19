from API.pdf_parser import *
from API.gpt_API import *
from __init__ import create_app

# def test_api():
#     text = parse_pdf()
#     print("PDF is parsed")
#     print(make_response(text))

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
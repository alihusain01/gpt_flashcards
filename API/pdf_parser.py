from PyPDF2 import PdfReader

def parse_pdf():
    reader = PdfReader("HY3238_20230314_Cold War.pdf")
    number_of_pages = len(reader.pages)
    page = reader.pages[4]
    text = page.extract_text()

    return text


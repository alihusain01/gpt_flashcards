// Uploading PDF code
const pdfjs = require("pdfjs-dist");

// Function to convert PDF to text
async function getContent(src){
  console.log('bp1');
  const pdfJS = await import('pdfjs-dist/build/pdf');
  pdfJS.GlobalWorkerOptions.workerSrc =
    window.location.origin + '/../pdf.worker.min.js';

  console.log('bp2');


  const doc = await pdfjs.getDocument(src).promise
  console.log('bp3');
  const page = await doc.getPage(1)
  console.log('bp4');
  return await page.getTextContent()
}

async function getItems(src){
  const content = await getContent(src)
  const items = content.items.map(item => {
    console.log(item.str)
  });
  return items
}

// getItems("./1685296445673_Ali Flight Itinerary.pdf")
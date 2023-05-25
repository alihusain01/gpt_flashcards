import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
//import PdfParse from 'pdf-parse';
import pdfjsLib from "pdfjs-dist";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
  cursor: "pointer",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);

  // Import necessary dependencies
  const PDFJS = require("pdfjs-dist");

  // Function to convert PDF to text
  async function convertPdfToText(pdfFile) {
    try {
      // Load the PDF document
      const pdf = await PDFJS.getDocument(pdfFile).promise;

      // Initialize the text content variable
      let textContent = "";

      // Iterate over each page of the PDF
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        // Get the page
        const page = await pdf.getPage(pageNumber);

        // Extract the text content from the page
        const pageText = await page.getTextContent();
        const pageStrings = pageText.items.map((item) => item.str);
        textContent += pageStrings.join(" ");
      }

      // Return the extracted text
      return textContent;
    } catch (error) {
      console.error("Error converting PDF to text:", error);
      return null;
    }
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      console.log("uploaded file: ");
      console.log(uploadedFile);
      //console.log(convertPdfToText(uploadedFile));
    },
    [convertPdfToText]
  );

  // const onDrop = useCallback(acceptedFiles => {
  //     const uploadedFile = acceptedFiles[0];
  //     console.log(convertPdfToText(uploadedFile));
  //     }, [convertPdfToText]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop
    //   accept: 'image/jpeg, image/png'
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <div>Drag and drop your powerpoints here.</div>
    </div>
  );
}

export default DropzoneComponent;

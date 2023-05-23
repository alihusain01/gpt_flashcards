import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
//import PdfParse from 'pdf-parse';

const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out',
    cursor: 'pointer'
  };
  
  const activeStyle = {
    borderColor: '#2196f3'
  };
  
  const acceptStyle = {
    borderColor: '#00e676'
  };
  
  const rejectStyle = {
    borderColor: '#ff1744'
  };

function DropzoneComponent(props) {
    const [files, setFiles] = useState([]);

    
    // function convertPdfToText(pdfFile) {
    
    // const pdfParse = require('pdf-parse');
    // return new Promise((resolve, reject) => {
    //     const reader = new FileReader();

    //     reader.onload = function (event) {
    //     const pdfData = event.target.result;

    //     pdfParse(pdfData)
    //         .then((data) => {
    //         const text = data.text;
    //         resolve(text);
    //         })
    //         .catch((error) => {
    //         reject(error);
    //         });
    //     };

    //     reader.onerror = function (event) {
    //     reject(new Error('Error occurred while reading the file.'));
    //     };

    //     reader.readAsArrayBuffer(pdfFile);
    // });
    // }


    // const onDrop = useCallback(acceptedFiles => {
    // const uploadedFile = acceptedFiles[0];
    // console.log(convertPdfToText(uploadedFile));
    // }, [convertPdfToText]);

    function convertPdfToText(){
        return;
    }
      
    const onDrop = useCallback(acceptedFiles => {
        const uploadedFile = acceptedFiles[0];
        console.log(convertPdfToText(uploadedFile));
        }, [convertPdfToText]);
      
  
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject
    } = useDropzone({
      onDrop,
      accept: 'image/jpeg, image/png'
    });
  
    const style = useMemo(() => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isDragActive,
      isDragReject,
      isDragAccept
    ]);
  
    return (
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <div>Drag and drop your powerpoints here.</div>
      </div>
    )
  }

export default DropzoneComponent;
import React, { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import FormData from "form-data";
import { GlobalWorkerOptions } from "pdfjs-dist/build/pdf.worker.entry";


function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  /* Helper function for the above question API which can be deleted later */
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  // Uploading PDF code
  // const pdfjs = (require("pdfjs-dist/build/pdf")).default;

  // Function to convert PDF to text
  async function getContent(src) {
    console.log("bp1");
    const pdfjs = await import("../../node_modules/pdfjs-dist/build/pdf.js");
    pdfjs.GlobalWorkerOptions.workerSrc =
      "../../node_modules/pdfjs-dist/build/pdf.worker.js";

    console.log("bp2");

    const doc = await pdfjs.getDocument(src).promise;
    console.log("bp3");
    const page = await doc.getPage(1);
    console.log("bp4");
    return await page.getTextContent();
  }

  async function getItems(src) {
    const content = await getContent(src);
    const items = content.items.map((item) => {
      console.log(item.str);
    });
    return items;
  }

  /* Handle File Upload to Local Server */
  const [files, setFiles] = useState([]);

  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("screenshot", files);
    console.log(formData);
    axios
      .post("http://localhost:4000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Success ", res);
      })
      .catch((err) => {
        console.log("Error ", err);
      });

  };

  return (
    <>
      <div className="nav-bar">
        <div className="titles">
          <h1 className="title">GPT-Flashcards</h1>
          <h2 className="subtitle">Studying Supercharged by AI</h2>
        </div>
      </div>

      <div>
        <input
          type="file"
          name="screenshot"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
        />
        <button onClick={(e) => upload(e)}>Generate</button>
      </div>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2?",
    answer: "4",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 2,
    question: "What is 2 + 3?",
    answer: "5",
    options: ["2", "3", "4", "5"],
  },
  {
    id: 3,
    question: "What is 2 + 1?",
    answer: "3",
    options: ["2", "3", "4", "5"],
  },
];

export default App;

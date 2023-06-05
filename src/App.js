import React, { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import FormData from "form-data";

function App() {
  let [flashcards, setFlashcards] = useState(FLASHCARD_SET);
  const [newFlashcards, setNewFlashcards] = useState(1);
  useEffect(() => {
    /* axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      console.log(res);
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          // const options = [
          //   ...questionItem.incorrect_answers.map((a) => decodeString(a)),
          //   answer,
          // ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            // options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    }); */
    if (newFlashcards != 0) {
      setFlashcards(
        flashcards.map((questionItem, index) => {
          const answer = questionItem.definition;
          // const options = [
          //   ...questionItem.incorrect_answers.map((a) => decodeString(a)),
          //   answer,
          // ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.term),
            answer: answer,
            // options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    }
  }, [newFlashcards]);

  /* Helper function for the above question API which can be deleted later */
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  /* Handle File Upload to Local Server */
  const [files, setFiles] = useState([]);

  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("screenshot", files);
    console.log(formData);

    // Filename with Date Timestamp Prefix
    let generated_filename;

    axios
      .post("http://localhost:4000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Success ", res);
        generated_filename = res.data;

        let python_script_data = new FormData();
        python_script_data.append("Filename", generated_filename);

        // Call Python Script to Generate Flashcards
        axios
          .post("http://localhost:4000/generate", python_script_data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("Success ", res);
            setFlashcards(res.data);
            console.log(FLASHCARD_SET);
            console.log("flashcard state: " + newFlashcards);
            setNewFlashcards(newFlashcards + 1);
          })
          .catch((err) => {
            console.log("Error ", err);
          });
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

      <div className = "upload-box">
        <label> 
        <input
          type="file"
          name="screenshot"
          onChange={(e) => {
            setFiles(e.target.files[0]);
          }}
          />
        </label>
        <button onClick={(e) => upload(e)}>Generate</button>
      </div>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

const FLASHCARD_SET = [
  {
    term: "What is 2 + 2?",
    definition: "4",
  },
  {
    term: "What is 2 + 3?",
    definition: "5",
  },
  {
    term: "What is 2 + 1?",
    definition: "3",
  }
];

export default App;

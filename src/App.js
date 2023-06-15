import React, { useEffect, useState } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import FormData from "form-data";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

function App() {
  let [flashcards, setFlashcards] = useState(FLASHCARD_SET);
  const [newFlashcards, setNewFlashcards] = useState(1);

  useEffect(() => {
    if (newFlashcards !== 0) {
      setFlashcards(
        flashcards.map((questionItem, index) => {
          const answer = questionItem.definition;
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.term),
            answer: answer,
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

  function LoadingButton({ files }) {
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
      function simulateNetworkRequest() {
        let formData = new FormData();
        formData.append("screenshot", files);

        let generated_filename;

        return axios
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

            return axios.post(
              "http://localhost:4000/generate",
              python_script_data,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          })
          .then((res) => {
            console.log("Success ", res);
            setFlashcards(res.data);
            setNewFlashcards(newFlashcards + 1);
          })
          .catch((err) => {
            console.log("Error ", err);
          });
      }

      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

    const handleClick = () => setLoading(true);

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? "Loading…" : "Generate"}
      </Button>
    );
  }

  LoadingButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    files: PropTypes.array.isRequired,
  };

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

        <div className="upload-box">
          <label className="file-button">
            <input
              type="file"
              name="screenshot"
              onChange={(e) => {
                setFiles(e.target.files[0]);
              }}
            />
          </label>
          <LoadingButton files={files} className="button-loader" />
          {/* <button onClick={(e) => upload(e)}>Generate</button> */}
        </div>
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
  },
];

export default App;

import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

function LoadingButton({files }) {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      function simulateNetworkRequest() {
        // return new Promise((resolve) => setTimeout(resolve, 2000));
    // e.preventDefault();
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
        {isLoading ? 'Loading…' : 'Generate'}
      </Button>
    );
  }
  
  export default LoadingButton;
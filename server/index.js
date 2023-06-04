const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(fileUpload());

app.use(cors());

app.post("/", (req, res) => {
  const filename = Date.now() + "_" + req.files.screenshot.name;
  const file = req.files.screenshot;
  let uploadPath = __dirname + "/uploads/" + filename;
  file.mv(uploadPath, (Err) => {
    if (Err) {
      return res.send(Err);
    }
  });

  res.send(filename);
  // res.sendStatus(200);
});

app.post("/generate", (req, res) => {
  const { PythonShell } = require("python-shell");

  const generated_filename = req.body.Filename;

  console.log("about to run script on filename: " + req.body.Filename);

  const pyshell = new PythonShell('script.py', { mode: 'json', args: [generated_filename] });
  pyshell.on('message', function (response) {
    // console.log("datatype: " + typeof response)
    console.log(response); // response is already an object!

    res.send(response);
  });

  // let options = {
  //   mode: "json",
  //   args: [generated_filename]
  // };

  // PythonShell.run("script.py", options).then((messages) => {
  //   console.log("datatype: " + typeof messages)
  //   console.log(messages);
  //   res.send(messages);
  // });

  // res.sendStatus(200);
});

app.listen(4000);

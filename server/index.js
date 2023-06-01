const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(fileUpload());

app.use(cors());

app.post("/", (req, res) => {
    const filename = Date.now() + "_" + req.files.screenshot.name;
    const file=req.files.screenshot;
    let uploadPath = __dirname+"/uploads/"+filename;
    file.mv(uploadPath, (Err) => {
        if(Err){
            return res.send(Err)
        }
    });
    res.sendStatus(200);
    
})

app.post("/generate", (req, res) => {

const {PythonShell} = require('python-shell');

PythonShell.run('script.py', null).then(messages=>{
    console.log(messages);
  });

console.log("Outside the python shell");

res.sendStatus(200);

})

app.listen(4000);



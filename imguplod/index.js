const express = require('express');
const bodyParser = require('body-parser');

const server = express();
const port = 3001;
const db=require('./config/db/db');

const studentmodel = require('./models/students/studentmanage');
const studentMulter = require('./middleware/multer');


const students = [];
db();

server.set('view engine', 'ejs');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use("/uploads",express.static("uploads"));

server.get('/', (req, res) => {
    res.render('index');
});

server.get('/view-student', async(req, res) => {
    try{

        let students=await studentmodel.find();
        console.log(students);
        console.log("fetch completed");
        res.render('view-student', { students});
        
    }
    catch(err){
        console.log("Error",err);
    }
});


server.post('/add-student', studentMulter.single('profilepic'), async(req, res) => {
    // const obj = {
    //     ...req.body,
    //     id: Date.now()
    // };
    //students.push(obj);

    try{
        const student=studentmodel({
            rno:req.body.rno,
            name:req.body.name,
            picture:req.file.filename
           
        })
        
        // let student=create({
        //     name:req.body.name,
        //     no:req.body.no,
        //     date:req.body.date,
        //     hobby:req.body.hobby,
        //     gender:req.body.gender
        // })
        
        await student.save();
        console.log(student);
        console.log("student Add successfully");
        res.redirect('/view-student');
    }
    catch(err){
            console.log("err",err);
    }
});


server.get('/edit-student/:id',async (req, res) => {
    // const student = students.find((u) => u.id == req.params.id);
   try{

   
    const {id}=req.params;
console.log(id);
    //let student= await studentmodel.find({_id:id});
    let student= await studentmodel.findById(id);

    if (!student) {
        return res.redirect('/view-student');
    }

    res.render('edit-student', { student });
}
catch(err){
    console.log("err",err);
    res.render('');
}
});

server.get('/view-record/:id', async (req, res) => {
    try{

    
    //const student = students.find((u) => u.id == req.params.id);
    const id=req.params.id;
    let student=await studentmodel.findById({_id:id});
    if (!student) {
        return res.redirect('/view-student');
    }

    res.render('view-record', { student} );
}
    catch(err){
    
        console.log("Errr",err);
    }
});
server.post('/update-student/:id', async (req, res) => {
    try{
    // const index = students.findIndex((u) => u.id == req.params.id);

    // if (index !== -1) {
    //     students[index] = {
    //         ...students[index],
    //         ...req.body
    //     };
    // }
const id=req.params.id;

let student=await studentmodel.findByIdAndUpdate(id,req.body);
console.log("Update Successfully");
    res.redirect('/view-student');
}
    catch(err){
        console.log("err",err);
    }
});


server.get('/delete-student/:id', async(req, res) => {
  try{
    const id=req.params.id;

let student=await studentmodel.findByIdAndDelete(id);
console.log("Deleted Successfully");
    res.redirect('/view-student');
}
    catch(err){
        console.log("err",err);
    }
   
});

server.listen(port, () => {
    console.log(`Server started ---> ${port}`);
});
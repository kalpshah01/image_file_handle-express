const multer=require('multer');

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        let filename=Date.now()+"-"+file.originalname;
        cb(null,filename);
    }
})

const studentMulter=multer({storage:storage})

module.exports=studentMulter
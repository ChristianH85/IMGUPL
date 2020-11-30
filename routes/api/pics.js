const router = require("express").Router();
const db = require("../../models");
/////// bring in fs to delete file when finished
const fs=require('fs')
const picsController = require("../../controllers/picsController");
require('dotenv').config();
//import multer and create a folder "uploads" to hold on to temp files
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

///import cloudinary and configure to your bucket access
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route("/mypics")
  .get(picsController.findAll)
  .post(picsController.create);


router
  .route("/:id")
  .get(picsController.findById)
  .put(picsController.update)
  .delete(picsController.remove);
////////create reference to img url in mongodb
router.route('/dbpic')
.post(picsController.create)

//////////////// use multer upload method to organize file data to readable format
router.post("/imgup", upload.single('file'),function(req,res, next){
  console.log(req.file)
  ///////////use cloudinary uploader to send file to bucket  and upload response
  cloudinary.uploader.upload(req.file.path, { tags: 'express_sample' })
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      console.dir(image);
      ////save the file path to temp folder and delete file
      console.log(req.file.path+"\n^^^^^^^^^^^^^^")
      fs.unlink(req.file.path, err=>{if(err){console.log(err)}})
      res.json(image.url)
    })
    .then(function () {
      console.log('** photo saved');
    })
})

module.exports = router;

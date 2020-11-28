const router = require("express").Router();
const db = require("../../models");
const fs=require('fs')
const picsController = require("../../controllers/picsController");
require('dotenv').config();
//import multer and create a folder to hold on to temp files
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

///import cloudinary and configure to your bucket
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


router.post('/image', upload.single('avatar'), function (req, res, next){
console.log("files"+req.file)

cloudinary.uploader.upload(req.file.path, { tags: 'express_sample' })
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      console.dir(image);
      photo.image = image;
      // Save photo with image metadata
      return photo.save();
    })
    .then(function () {
      console.log('** photo saved');
    })
    .finally(function (resp) {
      console.log(resp)
      console.log('finally')
      res.json( { photo: photo, upload: photo.image });
    });
// console.log(req.body)
})
router.route('/dbpic')
.post(picsController.create)

router.post("/i2", upload.single('file'),function(req,res, next){
  console.log(req.file)
  cloudinary.uploader.upload(req.file.path, { tags: 'express_sample' })
    .then(function (image) {
      console.log('** file uploaded to Cloudinary service');
      console.dir(image);
      console.log(req.file.path+"\n^^^^^^^^^^^^^^")
      fs.unlink(req.file.path, err=>{if(err){console.log(err)}})
      res.json(image.url)
      photo.image = image;
      // Save photo with image metadata
      return photo.save();
    })
    .then(function () {
      console.log('** photo saved');
    })
    .finally(function () {
      console.log('finally')
      res.json( { photo: photo, upload: photo.image });
    });
    console.log(req.file.path+"\n^^^^^^^^^^^^^^")
})

module.exports = router;

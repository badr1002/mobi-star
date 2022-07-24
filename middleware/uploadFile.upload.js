const multer = require("multer");
const path = require('path')
const linkImageProfile = path.join(__dirname, "../client/src/assets/uploads/profileImage");
const linkImagePhone = path.join(
  __dirname,
  "../../client/src/assets/uploads/phoneImage"
);



  storageImageProfile = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, linkImageProfile);
    },
    filename: (req, file, cb) => {
      cb(null, req.user._id + "_" + file.originalname);
    },
  });

   uploadImageProfile = multer({
    storage: storageImageProfile,
  });

  storageImagePhone = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, linkImagePhone);
    },
    filename: (req, file, cb) => {
      cb(null, req.user._id + "_" + file.originalname);
    },
  });

   uploadImagePhone = multer({
    storage: storageImagePhone,
  });



// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, link);
//   },
//   filename: (req, file, cb) => {
//     cb(null,  req.user._id +"_"+ file.originalname);
//   },
// });

// let upload = multer({
//   storage: storage,
// });

module.exports = {
  uploadImageProfile,
  uploadImagePhone,
};

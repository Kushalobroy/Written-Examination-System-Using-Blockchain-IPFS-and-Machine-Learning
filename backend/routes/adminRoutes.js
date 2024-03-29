const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/admin'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });


router.get('/', adminController.getAllAdmins);
router.post('/create', upload.single('photo'), adminController.createAdmin);
router.post('/addStudent', upload.single('photo'), adminController.createStudent);
router.get('/getAllStudent', adminController.getAllStudents);
router.post('/addEvaluator', upload.single('photo'), adminController.createEvaluator);
router.get('/getAllEvaluator', adminController.getEvaluators);
router.get('/:id', adminController.getAdminById);
router.post('/delete/:id', adminController.deleteAdmin);
router.post('/examSchedule',adminController.examSchedule);

/*
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);
*/
module.exports = router;

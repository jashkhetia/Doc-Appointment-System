const express = require('express');
const {getDoctorInfoController, updateProfileController, getDoctorByIdController, doctorAppointmentsController, updateStatusController} = require('../controllers/doctorCtrl')
const authMiddlewares = require('../middlewares/authMiddlewares')
const router = express.Router( )

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddlewares, getDoctorInfoController);

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddlewares, updateProfileController);

//POST GET SINGLE DOC INFO
router.post('/getDoctorById', authMiddlewares, getDoctorByIdController);

//GET APPOINTMENTS
router.get('/doctor-appointments', authMiddlewares, doctorAppointmentsController);

//POST UPDATE STATUS
router.post('/update-status', authMiddlewares, updateStatusController);

module.exports = router;
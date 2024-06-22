const express = require("express");
const { User, validate } = require("../models/userModels");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookingAvailabilityController,
  bookAppointmentController,
  userAppointmentsController,
} = require("../controllers/userCtrl");
const authMiddlewares = require("../middlewares/authMiddlewares");
const Token = require("../models/token")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const bcrypt = require("bcrypt");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddlewares, authController);

//Apply-Doctor || POST
router.post("/apply-doctor", authMiddlewares, applyDoctorController);

//Notification || POST
router.post("/get-all-notification", authMiddlewares, getAllNotificationController);

//Notification || POST
router.post("/delete-all-notification", authMiddlewares, deleteAllNotificationController);

//GET ALL DOC
router.get('/getAllDoctors', authMiddlewares, getAllDoctorsController);

//BOOK APPOINTMENT
router.post('/book-appointment', authMiddlewares, bookAppointmentController);

//BOOKING AVAILABILITY
router.post('/booking-availability', authMiddlewares, bookingAvailabilityController);


//APPOINTMENT LIST
router.get('/user-appointments', authMiddlewares, userAppointmentsController);

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
module.exports = router;
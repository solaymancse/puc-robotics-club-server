const Admin = require("../Models/Admin");
const Member = require("../Models/Members");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const fs = require("fs");
const cloudinary = require('../config/cloudinary');
const cloudinaryconfig = require('../config/cloudinary');

const adminSignup = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Admin.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ msg: "Admin Already Register !" });
    }
    const hashPassword = bcrypt.hashSync(password, saltRounds);

    const admin = new Admin({
      email,
      password: hashPassword,
    });

    await admin.save();
    return res.status(201).json({ msg: admin });
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email: email });
    if (!existingAdmin) {
      return res.status(400).json({ msg: "Admin couldn't Find" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingAdmin.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "invalid username or password" });
    }

    const token = jwt.sign(
      { id: existingAdmin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5hr" }
    );

    if (req.cookies[`${existingAdmin._id}`]) {
      req.cookies[`${existingAdmin._id}`] = " ";
    }

    res.cookie(String(existingAdmin._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 3600), // 3600 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ msg: "Successfully Logged In", user: existingAdmin, token });
  } catch (error) {
    console.log(error);
  }
};

// verify token
const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];

  if (!token) {
    res.status(404).json({ msg: "No Token found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// admin logout
const adminLogout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];

  if (!prevToken) {
    return res.status(400).json({
      success: false,
      message: "Couldn't find token",
    });
  }

  jwt.verify(
    String(prevToken),
    process.env.JWT_SECRET_KEY,
    (err, existingAdmin) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Authentication failed",
        });
      }
      res.clearCookie(`${existingAdmin.id}`);
      req.cookies[`${existingAdmin.id}`] = "";

      return res
        .status(200)
        .json({ msg: "Successfully log out.", token: prevToken });
    }
  );
};

const newRegisterMember = async (req, res) => {
  const {
    name,
    email,
    studentId,
    department,
    gender,
    dob,
    bg,
    phone,
    address,
   
  } = req.body;
  const file = req.files.image;

  if (!file || Object.keys(file).length === 0) {
    return res.status(400).send("No File Were uploaded.");
  }
  let existingMember;
  try {
    existingMember = await Member.findOne({
      email: email,
      studentId: studentId,
      department,
    });

    if (existingMember) {
      return res
        .status(400)
        .json({ msg: "You are Already Register! Contact to the Club." });
    }
    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "members" },
      (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        const savedMember = new Member({
          name,
          email,
          image: result.url,
          studentId,
          department,
          gender,
          dob,
          bloodGrp: bg,
          phone,
          address,
          paid:"0",
          cloudinaryid: result.public_id,
        });
        savedMember.save();
        res.status(200).json(savedMember);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
// get all register member
const getAllMember = async (req, res) => {
  try {
    const allMembers = await Member.find().sort({ paid: 0}).exec();
    res.status(200).json(allMembers);
   
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  }
const getFiveMember = async (req, res) => {
  try {
    const allMembers = await Member.find().sort({ $natural: -1}).limit(5);
    res.status(201).json(allMembers);
   
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
// count all register member
const countAllMember = async (req, res) => {
  try {
    const allMembers = await Member.find().count();
    res.status(200).json({total:allMembers});
    console.log(allMembers);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};


// approved register member
const memberApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const member = await Member.findByIdAndUpdate(id);
    if(member.paid == 0 ){
       member.paid = 1; 
    }
    member.save();
    res.status(200).json(member);
    
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

exports.adminSignup = adminSignup;
exports.adminLogin = adminLogin;
exports.verifyToken = verifyToken;
exports.adminLogout = adminLogout;
exports.newRegisterMember = newRegisterMember;
exports.getAllMember = getAllMember;
exports.countAllMember = countAllMember;
exports.getFiveMember = getFiveMember;
exports.memberApproved = memberApproved;

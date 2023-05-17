const bcrypt = require("bcryptjs");
const patientModel = require("../../../../DB/model/Patient");

const getSignup = (req, res) => {
  const userExist = req.flash("userExist")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const catchErr = req.flash("catchErr")[0];
  const fileErr = req.flash("fileErr")[0];
  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }

  res.render("client/signup", {
    userExist,
    oldInputs,
    catchErr,
    validationErr,
    fileErr,
    title:'Signup'
  });
};

const signup = async (req, res) => {
  try {
    if (req.fileErr) {
      req.flash("fileErr", true);
      res.redirect("/signup");
    } else {
      const { userName, email, password, phone, bloodType, gender, address } =
        req.body;
      const imageUrl = `${req.fileDestination}/${req.file.filename}`;
      const user = await patientModel.findOne({ email });
      if (user) {
        req.flash("userExist", true);
        req.flash("oldInputs", req.body);
        res.redirect("/signup");
      } else {
        const hashedPassword = await bcrypt.hash(
          password,
          parseInt(process.env.SALT_ROUNDS)
        );
        const newUser = new patientModel({
          userName,
          email,
          password: hashedPassword,
          phone,
          gender,
          BloodType: bloodType,
          address,
          imageUrl,
        });
        const savedUser = await newUser.save();
        res.redirect("/login");
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    req.flash("oldInputs", req.body);
    res.redirect("/signup");
  }
};

const getSignin = (req, res) => {
  const userExist = req.flash("userExist")[0];
  const wrongPassword = req.flash("wrongPassword")[0];
  const oldInputs = req.flash("oldInputs")[0];
  const catchErr = req.flash("catchErr")[0];

  let validationErr = req.flash("validationErr")[0];
  if (validationErr) {
    validationErr = validationErr.map((err) => {
      return err.path[0];
    });
  }
  
  res.render("client/login", {
    userExist,
    oldInputs,
    catchErr,
    validationErr,
    wrongPassword,  title:'Signin'
  });
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await patientModel.findOne({ email });
    if (!user) {
      req.flash("userExist", true);
      req.flash("oldInputs", req.body);
      res.redirect("/login");
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        req.flash("wrongPassword", true);
        req.flash("oldInputs", req.body);
        res.redirect("/login");
      } else {
        req.session.user = { userID: user._id, isLoggedIn: true , role:user.role};
        res.redirect("/");
      }
    }
  } catch (error) {
    req.flash("catchErr", "server error");
    req.flash("oldInputs", req.body);
    res.redirect("/");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports = { getSignup, signup, getSignin, signin, logout };

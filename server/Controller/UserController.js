const UserModel = require("../Models/UserModel");

const CreateUser = async (req, res) => {
  const { userName, userEmail, userMobile, userPass, ConfirmPass } = req.body;

  // Check if passwords match
  if (userPass !== ConfirmPass) {
    return res
      .status(400)
      .send({ msg: "Password does not match with Confirm Password" });
  }

  try {
    const existringUser = await UserModel.findOne({ userEmail: userEmail });
    if (existringUser) {
      return res
        .status(400)
        .send({ msg: "Email is Already Registered.... Please Login" });
    }
    const User = await UserModel.create({
      userName: userName,
      userEmail: userEmail,
      userMobile: userMobile,
      userPass: userPass,
    });

    res.status(200).send({ msg: "Successfully Registered", User });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: "Server Error" });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { userEmail, userPass } = req.body;
    const User = await UserModel.findOne({ userEmail: userEmail });
    if (!User) {
      return res.status(400).send({ msg: "Email Not Found" });
    }
    if (User.userPass != userPass) {
      return res.status(400).send({ msg: "Incorrect Password" });
    }
    return res.status(200).send({ msg: "Login Successfully...", User });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server Error" });
  }
};

module.exports = {
  CreateUser,
  LoginUser,
};

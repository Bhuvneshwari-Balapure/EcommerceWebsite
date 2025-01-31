const adminModel = require("../Models/adminModel");

const AdminLogin = async (req, res) => {
  const { adminId, adminPass } = req.body;
  try {
    const admin = await adminModel.findOne({ adminId: adminId }); // Use `findOne` instead of `find`
    if (!admin) {
      return res.status(400).send({ msg: "Invalid Email" });
    }

    if (admin.adminPass !== adminPass) {
      return res.status(400).send({ msg: "Invalid Password" });
    }

    return res.status(200).send({ msg: "Login Successfully...", admin });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  AdminLogin,
};

import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";
import sendMail from "../../functions/sendMail";
import encryptNewPassword from "../../functions/encryptNewPassword";

//Register User
const register = async (_root, { input }) => {
  for (let i in input) {
    if (input[i] === "" || input[i].length < 3) {
      throw new Error("Complete all values");
    }
  }

  //Email Validation

  if (!input.email.includes("@") || !input.email.includes("mail.com")) {
    throw new Error("Type a correct email");
  }

  //Password Validation

  if (input.password.length < 8) {
    throw new Error("Type a password with 8 characters");
  }

  //Birthdate Validation

  if (input.birthdate.match(/-/gi).length !== 2) {
    throw new Error("Invalid birthdate");
  }

  //convert birthdate to array to verify
  const birthdate_array = input.birthdate.split("-");
  birthdate_array.forEach((v) => {
    if (isNaN(v)) {
      throw new Error("Invalid birthdate");
    }
  });

  //verify Year
  if (Number(birthdate_array[0]) > new Date().getFullYear()) {
    throw new Error("Invalid birthdate");
  }

  //verify if the birthdate have the 3 numbers
  if (birthdate_array.length < 3) {
    throw new Error("Invalid birthdate");
  }

  //verify february day 29
  if (Number(birthdate_array[1]) === 2) {
    if (Number(birthdate_array[2]) > 29) {
      throw new Error("Invalid birthdate");
    }
  }

  //verify months days
  if (Number(birthdate_array[2]) > 31) {
    throw new Error("Invalid birthdate");
  }

  //verify months
  if (Number(birthdate_array[1]) > 12) {
    throw new Error("Invalid birthdate");
  }

  //Verify Email in other account
  const exist = await userModel.findOne({ email: input.email });
  if (exist) {
    throw new Error("Email exist with other account");
  }

  //Save User and get token
  try {
    const newUser = await new userModel({ ...input }).save();
    const token = await jwt.sign({ _id: newUser._id }, process.env.TOKENKEY);
    return token;
  } catch {
    throw new Error("Server error");
  }
};

//Login user
const login = async (_root, { input }) => {
  for (let i in input) {
    if (input[i] === "" || input[i].length < 3) {
      throw new Error("Complete all values");
    }
  }

  //Email Validation
  if (!input.email.includes("@") || !input.email.includes("mail.com")) {
    throw new Error("Type a correct email");
  }

  console.log(input);

  //Verify if account exist
  const exist = await userModel.findOne({ email: input.email });
  if (!exist) {
    throw new Error("account doesn't exist");
  }

  if (!exist.password) {
    throw new Error("This accoun not have password");
  }

  //Verify if the password is equal and send token
  const equal = exist.compare(input.password);
  console.log(equal);
  if (equal) {
    return await jwt.sign({ _id: exist._id }, process.env.TOKENKEY);
  }

  throw new Error("Invalid password");
};

//Get User
const getMyUser = async (_root, { token }) => {
  if (token === "") {
    throw new Error("Invald Token");
  }

  try {
    const myToken = await jwt.verify(token, process.env.TOKENKEY);
    return await userModel.findById(myToken._id);
  } catch {
    throw new Error("invalid token");
  }
};

//Password Request
const passwordRequest = async (_root, { input }, ctx) => {
  const { email, uri } = input;
  //Check if email body exist
  if (email === "" || !email.includes("@") || !email.includes("mail.com")) {
    throw new Error("Type a correct email");
  }

  //Check if email exist
  const emailExist = await userModel.findOne({ email });
  if (!emailExist) {
    throw new Error("Email Doesn't Exist");
  }

  //Create token whit 1h of expiration
  const token = await jwt.sign(
    {
      action_type: "reset password",
      _id: emailExist._id,
    },
    process.env.TOKENKEY,
    { expiresIn: "1h" }
  );

  //Send Mail
  const send = await sendMail(
    "Reset Password",
    `
          <h2>Ahora vas a reestablecer tu contraseña</h2>
          <br/>
          <p>dale click al link expira en una hora</p>
          <br/>
          <a href="${uri}/nueva-contrasena?token=${token}">Link</a>
      `,
    email
  );

  //Check if mail is send
  if (send) {
    return "Mail send";
  } else {
    return "Mail not send";
  }
};

//Update Password
const updatePassword = async (_root, { input }) => {
  const { token, password } = input;

  if (password === "" || password.length < 8) {
    throw new Error("Type a better password");
  }
  //Token
  let tokenContent;

  try {
    //Verify token
    tokenContent = await jwt.verify(token, process.env.TOKENKEY);
  } catch (error) {
    throw new Error("Invalid token");
  }

  //Verify action type
  if (tokenContent.action_type != "reset password") {
    throw new Error("Invalid action_type");
  }

  //Check if email exist
  const userExist = await userModel.findById(tokenContent._id);
  if (!userExist) {
    throw new Error("Email Doesn't Exist");
  }

  //hash the password
  const hashPassword = await encryptNewPassword(password);

  //Update password
  const updatePassword = await userModel.findByIdAndUpdate(tokenContent._id, {
    password: hashPassword,
  });

  return "Done!";
};

//Update Profile
const updateProfile = async (_root, { input }) => {
  const { token } = input;

  let myToken;
  try {
    myToken = await jwt.verify(token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalid token");
  }

  const user = await userModel.findById(myToken._id);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  let querys = {};

  for (let i in input) {
    if (input[i] && input[i] !== "" && i === "password") {
      if (input[i].length < 8) {
        throw new Error("Type a better password");
      }
      querys[i] = await encryptNewPassword(input[i]);
    } else if (input[i] && input[i] !== "" && i !== "email") {
      querys[i] = input[i];
    }
  }

  const update = await userModel.findByIdAndUpdate(myToken._id, querys, {
    new: true,
  });

  return update;
};

export {
  register,
  login,
  getMyUser,
  passwordRequest,
  updatePassword,
  updateProfile,
};

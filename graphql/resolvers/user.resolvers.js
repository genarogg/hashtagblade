import jwt from "jsonwebtoken";
import userModel from "../../models/user.model";

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

  //Verify if account exist
  const exist = await userModel.findOne({ email: input.email });
  if (!exist) {
    throw new Error("account doesn't exist");
  }

  //Verify if the password is equal and send token
  const equal = exist.compare(input.password);
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

export { register, login, getMyUser };

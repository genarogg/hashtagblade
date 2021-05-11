import jwt from "jsonwebtoken";

const extractToken = async (req) => {
  try {
    const token = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.TOKENKEY
    );
    return token;
  } catch (error) {
    return false;
  }
};

export default extractToken;

import userModel from "../../models/user.model";
import jwt from "jsonwebtoken";

//Verify the social media's user that is logging
const verifySocial = async (_root, { token }) => {
  //Verify token
  if (token === "") {
    throw new Error("Invalid Token");
  }

  let decode;
  try {
    decode = await jwt.verify(token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalid token");
  }

  //Verify if the email of the social media account exist in the database
  const emailExist = await userModel.findOne({ email: decode.email });

  //Verify social
  switch (decode.type) {
    //In case that the social media is twitter
    case "twitter":
      //Verify if the email of the social media account exist in the database process v2
      if (
        emailExist &&
        !emailExist.twitterId &&
        !emailExist.image &&
        decode.image
      ) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          twitterId: decode.id,
          image: decode.image,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      } else if (emailExist && !emailExist.twitterId) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          twitterId: decode.id,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      }
      //Verify if the email of the social media account exist in the database process v2 upper

      //Verify is exist twitter and send token
      const existTwitter = await userModel.findOne({ twitterId: decode.id });
      if (!existTwitter) {
        throw new Error("Twitter doesn't exist");
      }

      const twitterToken = await jwt.sign(
        { _id: existTwitter._id },
        process.env.TOKENKEY
      );

      return twitterToken;
      break;

    //In case that the social media is twitter
    case "facebook":
      //Verify if the email of the social media account exist in the database process v2
      if (
        emailExist &&
        !emailExist.facebookId &&
        !emailExist.image &&
        decode.image
      ) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          facebookId: decode.id,
          image: decode.image,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      } else if (emailExist && !emailExist.facebookId) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          facebookId: decode.id,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      }
      //Verify if the email of the social media account exist in the database process v2 upper

      //Verify is exist twitter and send token
      const existFacebook = await userModel.findOne({ facebookId: decode.id });

      if (!existFacebook) {
        throw new Error("Twitter doesn't exist");
      }

      const facebookToken = await jwt.sign(
        { _id: existFacebook._id },
        process.env.TOKENKEY
      );

      return facebookToken;
      break;

    //In case that the social media is google
    case "google":
      //Verify if the email of the social media account exist in the database process v2
      if (
        emailExist &&
        !emailExist.googleId &&
        !emailExist.image &&
        decode.image
      ) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          googleId: decode.id,
          image: decode.image,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      } else if (emailExist && !emailExist.googleId) {
        const update = await userModel.findByIdAndUpdate(emailExist._id, {
          googleId: decode.id,
        });

        const token = await jwt.sign({ _id: update._id }, process.env.TOKENKEY);

        return token;
      }
      //Verify if the email of the social media account exist in the database process v2 upper

      //Verify is exist twitter and send token
      const existGoogle = await userModel.findOne({ googleId: decode.id });

      if (!existGoogle) {
        throw new Error("Twitter doesn't exist");
      }

      const googleToken = await jwt.sign(
        { _id: existGoogle._id },
        process.env.TOKENKEY
      );

      return googleToken;
      break;

    default:
      throw new Error("Invalid Type");
  }
};

//Register User with social red
const registerWithSocial = async (_root, { input }) => {
  for (let i in input) {
    if (input[i] === "" || input[i].length < 3) {
      throw new Error("Complete all values");
    }
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

  let decode;
  try {
    decode = await jwt.verify(input.token, process.env.TOKENKEY);
  } catch {
    throw new Error("Invalid token");
  }

  switch (decode.type) {
    case "twitter":
      const existTwitter = await userModel.findOne({ twitterId: decode.id });

      if (existTwitter) {
        throw new Error("Twitter Exist");
      }

      const newTwitterUser = await new userModel({
        ...input,
        twitterId: decode.id,
        image: decode.image,
        email: decode.email,
      }).save();

      const twitterToken = await jwt.sign(
        { _id: newTwitterUser._id },
        process.env.TOKENKEY
      );

      return twitterToken;
      break;

    case "facebook":
      const existFacebook = await userModel.findOne({ facebookId: decode.id });

      if (existFacebook) {
        throw new Error("Facebook Exist");
      }

      const newFacebookUser = await new userModel({
        facebookId: decode.id,
        ...input,
        image: decode.image,
        email: decode.email,
      }).save();

      const facebookToken = await jwt.sign(
        { _id: newFacebookUser._id },
        process.env.TOKENKEY
      );

      return facebookToken;
      break;

    case "google":
      const existGoogle = await userModel.findOne({ googleId: decode.id });

      if (existGoogle) {
        throw new Error("Google Exist");
      }

      const newGoogleUser = await new userModel({
        ...input,
        googleId: decode.id,
        image: decode.image,
        email: decode.email,
      }).save();

      const googleToken = await jwt.sign(
        { _id: newGoogleUser._id },
        process.env.TOKENKEY
      );

      return googleToken;
      break;

    case "github":
      const existGithub = await userModel.findOne({ githubId: decode.id });

      if (existGithub) {
        throw new Error("Github Exist");
      }

      let newGithubUser = await new userModel({
        ...input,
        githubId: decode.id,
        image: decode.image,
        email: decode.email,
      }).save();

      const githubToken = await jwt.sign(
        { _id: newGithubUser._id },
        process.env.TOKENKEY
      );

      return githubToken;
      break;
    default:
      throw new Error("Invalid Type");
      break;
  }
};

export { verifySocial, registerWithSocial };

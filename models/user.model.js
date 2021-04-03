import mongoose from "mongoose";
import bcrypt from "bcrypt-nodejs";

const userModel = new mongoose.Schema(
  {
    image: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String },
    gender: { type: String },
    birthdate: { type: String },

    //default
    password: { type: String },

    //twitter
    twitterId: { type: String },

    //github
    githubId: { type: String },

    //facebook
    facebookId: { type: String },

    //google
    googleId: { type: String },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  //Gen salt for password
  bcrypt.genSalt(10, (error, salt) => {
    if (error) {
      return next(error);
    }

    //hash the password
    bcrypt.hash(this.password, salt, null, (error, hash) => {
      if (error) {
        return next(error);
      }

      this.password = hash;
      next();
    });
  });
});

//compare the password
userModel.methods.compare = function (pass) {
  return bcrypt.compareSync(pass, this.password);
};

export default mongoose.models.users || mongoose.model("users", userModel);

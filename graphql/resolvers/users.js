const User = require("./../../models/User.js");
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const privateKey = process.env.PRIVATE_KEY;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { validateRegisterInput, validateLoginInput } = require("./../../utils/validators");


function generateToken(user){
    let payload = {
        id: user.id,
        username: user.username,
        mobileNo: user.mobileNo,
      };
    return jwt.sign(payload, privateKey, { expiresIn: 60 * 60 * 24 });
}
module.exports = {
  Mutation: {
    async login(_, {username, password}){
        const {errors, valid} = validateLoginInput(username, password);
        if(!valid){
          throw new UserInputError('Errors.', {errors})
        }
        const user = await User.findOne({username});
        if(!user){
            errors.general = 'User not found.';
            throw new UserInputError('User not found.', {errors})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            errors.general = 'Wrong credentials.';
            throw new UserInputError('Wrong credentials.', {errors})
        }

        const token = generateToken(user);
        return {
            ...user._doc,
            id: user._id,
            token,
          }

        
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword, mobileNo },
      },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword,
        mobileNo
      );

      if(!valid){
          throw new UserInputError('Errors', {errors})
      }
      // TODO User is unique
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is already registered.", {
          errors: {
            username: "Username is already registered.",
          },
        });
      }
      let hash = bcrypt.hashSync(password, saltRounds);

      const newUser = new User({
        email,
        username,
        password: hash,
        mobileNo,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    },
  },
};

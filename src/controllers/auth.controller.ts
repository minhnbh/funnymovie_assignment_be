import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/keys";

export default new (class AuthController {
  async signUp(req: Request, res: Response) {
    try {
      const { email, password, fullName } = req.body;

      const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const data = await UserModel.findOne({ email });
      if (data) {
        return res.status(400).json({ message: "Email already exists" });
      }
      let newUser = new UserModel({ email, password: hashPassword, fullName });
      await newUser.save();
      return res.json({ message: "Register successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Register failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required!" });
      }
      const data = await UserModel.findOne({ email });
      if (!data) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const login = await bcrypt.compare(password, data.password);
      if (!login) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        { _id: data._id, fullName: data.fullName, email: data.email },
        JWT_SECRET
      );
      const encode = jwt.verify(token, JWT_SECRET);
      return res.json({
        token,
        user: encode,
      });
    } catch (error: any) {
      return res
        .status(401)
        .json({ message: "Sign in failed!", description: error.message });
    }
  }
})();

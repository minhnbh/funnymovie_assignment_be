import authController from "../controllers/auth.controller";
import { Router } from "express";

class AuthRouter {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route("/login").post(authController.login);
    this.router.route("/register").post(authController.signUp);
  }
}

export default AuthRouter;

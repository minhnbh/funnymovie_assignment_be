import { Authentication } from "../middlewares/auth.jwt.middleware";
import movieController from "../controllers/movie.controller";
import { Router } from "express";

class MovieRouter {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route("/").get(Authentication, movieController.getAll);
    this.router.route("/share").post(Authentication, movieController.share);
  }
}

export default MovieRouter;

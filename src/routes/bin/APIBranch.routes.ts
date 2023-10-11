import { Router } from "express";
import AuthRouter from "../auth.route";
import MovieRouter from "../movie.route";

class APIBranch {
  public router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { router: _authRouter } = new AuthRouter();
    const { router: _movieRouter } = new MovieRouter();
    this.router.use("/auth", _authRouter);
    this.router.use("/movie", _movieRouter);
  }
}

export default APIBranch;

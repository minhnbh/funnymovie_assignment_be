import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import APIBranch from "./routes/bin/APIBranch.routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(cors({ origin: true, credentials: true }));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(cookieParser());

    const { router } = new APIBranch();
    this.app.use("/api", router);
  }
}

export default new App().app;

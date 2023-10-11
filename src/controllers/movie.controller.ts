import { Request, Response } from "express";
import { MovieModel } from "../models/movie.model";
import YoutubeService from "../services/youtube.service";
import { UserModel } from "../models/user.model";

export default new (class MovieController {
  async share(req: Request, res: Response) {
    const { url } = req.body;
    const { userId } = res.locals;

    const videoId = YoutubeService.getYoutubeMovieId(url);
    if (!videoId) {
      return res.json({ message: "Invalid url" });
    }
    const data = await YoutubeService.getVideoDetailById(videoId);
    if (!data) {
      return res.status(400).json({ message: "Invalid url" });
    }
    const newMovie = new MovieModel({
      videoId,
      title: data.title,
      description: data.description,
      url,
      sharedBy: userId,
      like: 0,
      dislike: 0,
    });
    const savedMovie = await newMovie.save();

    return res.json({ data: savedMovie });
  }

  async getAll(req: Request, res: Response) {
    const data = await MovieModel.find();
    const shareUserIds = [...new Set(data.map((e) => e.sharedBy))];
    const users = (
      await Promise.all(shareUserIds.map((e) => UserModel.findById(e)))
    ).reduce(
      (prev, cur) => (!!cur?.id ? { ...prev, [cur.id]: cur.email } : prev),
      {} as Record<string, any>
    );
    data.forEach((e) => {
      e.set("sharedBy", users[e.sharedBy]);
    });

    return res.json({
      data,
    });
  }
})();

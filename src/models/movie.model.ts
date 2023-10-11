import mongoose, { Document, Model, Schema } from "mongoose";

type MovieDocument = Document & {
  title: string;
  description: string;
  url: string;
  sharedBy: string;
  like?: number;
  dislike?: number;
};

type IShareMovieArgs = {
  url: MovieDocument["url"];
};

const movieSchema = new Schema({
  videoId: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  url: {
    type: Schema.Types.String,
    required: true,
  },
  sharedBy: {
    type: Schema.Types.String,
    required: true,
  },
  like: {
    type: Schema.Types.Number,
    required: false,
  },
  dislike: {
    type: Schema.Types.Number,
    required: false,
  },
});

const MovieModel: Model<MovieDocument> = mongoose.model<MovieDocument>(
  "Movie",
  movieSchema
);

export { MovieDocument, IShareMovieArgs, MovieModel };

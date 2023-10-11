import mongoose, { Document, Model, Schema } from "mongoose";

type UserDocument = Document & {
  email: string;
  password: string;
  fullName: string;
};

type UserInput = {
  email: UserDocument["email"];
  password: UserDocument["password"];
  fullName: UserDocument["fullName"];
};

const userSchema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export { UserModel, UserInput, UserDocument };

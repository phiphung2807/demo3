import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const PostSchema = new mongoose.Schema(
  {
    post_name: {
      type: String,
      minlength: 3,
    },
    post_images: {
      type: String,
    },
    post_content: {
        type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
// mongoose.plugin(slug);
PostSchema.plugin(mongoosePaginate);
export default mongoose.model("Post", PostSchema);

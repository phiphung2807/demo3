import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import slug from "mongoose-slug-generator";
const CategorySchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      minlength: 3,
      maxlength: 50,
    },
    category_images: {
      type: String,
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        require: true,
      },
    ],
    slug: {
      type: String,
      slug: "category_name",
    },
  },
  { timestamps: true, versionKey: false }
);
mongoose.plugin(slug);
CategorySchema.plugin(mongoosePaginate);
export default mongoose.model("Category", CategorySchema);

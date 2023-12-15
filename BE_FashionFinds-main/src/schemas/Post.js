import joi, { object } from "joi";

export const PostSchema = joi.object({
    post_name: joi.string().required(),
    post_images: joi.string().required(),
    post_content: joi.string().required()
});

export const PostSchemaUpdate= joi.object({
  _id: joi.string(),
  post_name: joi.string().required(),
  post_images: joi.string().required(),
  createdAt: joi.date(),
  updateAt: joi.date(),
  updatedAt: joi.date(),
  slug: joi.string(),
});

import Joi from "joi";

export const ProductSchema = Joi.object({
  product_name: Joi.string().required(),
  product_price: Joi.number().required(),
  product_images: Joi.string().required(),
  product_description: Joi.string(),
  categoryId: Joi.string().required(),
});

export const ProductUpdateSchema = Joi.object({
  _id: Joi.string(),
  product_name: Joi.string().required(),
  product_price: Joi.number().required(),
  product_images: Joi.string().required(),
  product_description: Joi.string(),
  categoryId: Joi.string().required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
  slug: Joi.string(),
  review_count: Joi.number(),
  average_score: Joi.number(),
});

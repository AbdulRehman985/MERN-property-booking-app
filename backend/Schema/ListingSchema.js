import Joi from "joi";

export const listingSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  image: Joi.string().allow("", null),
  price: Joi.number().min(1).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 1",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  country: Joi.string().required().messages({
    "string.empty": "Country is required",
  }),
});

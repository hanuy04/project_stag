import Joi from "joi";

export const validateLogin = async (loginData) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "Username tidak boleh kosong",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password tidak boleh kosong",
    }),
  });

  try {
    const value = await schema.validateAsync(loginData);
    return value;
  } catch (err){
    throw new Error(err.details[0].message);
  }
};

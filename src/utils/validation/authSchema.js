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
  } catch (err) {
    throw new Error(err.details[0].message);
  }
};

export const validateRegister = async (data) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name tidak boleh kosong",
      "string.base": "Name harus berupa teks",
    }),
    username: Joi.string().required().messages({
      "any.required": "Username tidak boleh kosong",
      "string.base": "Username harus berupa teks",
    }),
    password: Joi.string().min(8).required().messages({
      "any.required": "Password tidak boleh kosong",
      "string.base": "Password harus berupa teks",
      "string.min": "Password harus memiliki minimal 8 karakter",
    }),
    confirm: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.required": "Konfirmasi password tidak boleh kosong",
      "any.only": "Konfirmasi password harus sama dengan password",
    }),
    kelas: Joi.optional(),
    no_absen: Joi.optional(),
  });

  try {
    const value = await schema.validateAsync(data);
    return value;
  } catch (err) {
    throw new Error(err.details[0].message);
  }
};

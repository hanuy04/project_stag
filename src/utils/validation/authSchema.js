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
      "string.empty": "Name tidak boleh kosong",
      "string.base": "Name harus berupa teks",
    }),
    username: Joi.string().required().messages({
      "any.required": "Username tidak boleh kosong",
      "string.empty": "Username tidak boleh kosong",
      "string.base": "Username harus berupa teks",
    }),
    password: Joi.string().min(8).required().messages({
      "any.required": "Password tidak boleh kosong",
      "string.empty": "Password tidak boleh kosong",
      "string.base": "Password harus berupa teks",
      "string.min": "Password harus memiliki minimal 8 karakter",
    }),
    confirm: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.required": "Konfirmasi password tidak boleh kosong",
      "string.empty": "Konfirmasi password tidak boleh kosong",
      "any.only": "Konfirmasi password harus sama dengan password",
    }),
    role_id: Joi.number().integer().min(1).max(3).required().messages({
      "number.base": "Role ID harus berupa angka",
      "number.integer": "Role ID harus berupa bilangan bulat",
      "number.min": "Role ID minimal adalah {#limit}",
      "number.max": "Role ID maksimal adalah {#limit}",
      "any.required": "Role ID tidak boleh kosong",
    }),
    kelas: Joi.when("role_id", {
      is: 3, // Jika role_id adalah 3 (siswa)
      then: Joi.string().required().messages({
        "any.required": "Kelas tidak boleh kosong untuk siswa",
        "string.empty": "Kelas tidak boleh kosong untuk siswa",
        "string.base": "Kelas harus berupa teks",
      }),
      otherwise: Joi.optional(), // Jika role_id bukan 3, kelas bersifat opsional
    }),
    no_absen: Joi.when("role_id", {
      is: 3, // Jika role_id adalah 3 (siswa)
      then: Joi.number().integer().positive().required().messages({
        "any.required": "No absen tidak boleh kosong untuk siswa",
        "number.base": "No absen harus berupa angka",
        "number.integer": "No absen harus berupa bilangan bulat",
        "number.positive": "No absen harus lebih dari 0",
      }),
      otherwise: Joi.optional(), // Jika role_id bukan 3, no_absen bersifat opsional
    }),
  });

  try {
    const value = await schema.validateAsync(data);
    return value;
  } catch (err) {
    throw new Error(err.details[0].message);
  }
};

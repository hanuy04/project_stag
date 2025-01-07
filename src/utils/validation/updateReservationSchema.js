import Joi from "joi";

export const validateSarprasUpdateReservation = async (data) => {
  const schema = Joi.object({
    status_sarpras: Joi.string()
      .valid("approved", "rejected", "cancelled")
      .optional()
      .messages({
        "any.required": "status_sarpras harus diisi",
        "string.empty": "status_sarpras tidak boleh kosong",
        "any.only":
          "status_sarpras harus salah satu dari [approved, rejected, cancelled].",
      }),
    description: Joi.alternatives().conditional("status_sarpras", {
      is: "rejected",
      then: Joi.string().min(10).required().messages({
        "any.required": "Alasan tidak boleh kosong",
        "string.min": "Alasan minimal 10 karakter",
        "string.empty": "Alasan tidak boleh kosong",
      }),
      otherwise: Joi.forbidden(),
    }),
    room_id: Joi.string().optional().messages({
      "string.empty": "room_id tidak boleh kosong",
    }),
    start_time: Joi.string().optional().messages({
      "string.empty": "start_time tidak boleh kosong",
    }),
    end_time: Joi.string().optional().messages({
      "string.empty": "end_time tidak boleh kosong",
    }),
    purpose: Joi.string().optional().messages({
      "string.empty": "Tujuan tidak boleh kosong",
    }),
  });

  try {
    await schema.validateAsync(data);
  } catch (err) {
    throw new Error(err.details[0].message);
  }
};

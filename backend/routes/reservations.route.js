const express = require("express");
const router = express();

const Reservation = require("../models/Reservation");

// FIND SEMUA RESERVASI
router.get("/", async (req, res) => {
  //Untuk melakukan pengambilan data, gunakan find.
  const result = await Reservation.find();
  if (!result) return res.status(400).send("Error");
  return res.status(200).json(result);
});

// FIND 1 RESERVASI
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  //Untuk melakukan pengambilan satu data, dapat digunakan findOne
  const result = await Reservation.findOne({
    reservation_id: id,
  });
  if (!result) return res.status(404).send("No data found");
  return res.status(200).json(result);
});

// router.post("/", async (req, res) => {
//   const { name, age, email } = req.body;

//   // Terdapat 2 cara untuk melakukan penambahan data, yaitu:
//   // 1. Membuat object lalu melakukan save
//   const newCustomer = new Customer({
//     name,
//     age,
//     email,
//   });
//   const result = await newCustomer.save();

//   // 2. Menggunakan method insertMany
//   // const result = await Customer.insertMany([{
//   //     name, age, email
//   // }])

//   return res.status(201).json(result);
// });

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, age, email } = req.body;

//   // Untuk melakukan update, dapat digunakan updateOne atau updateMany
//   let result = await Customer.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         name,
//         age,
//         email,
//       },
//     }
//   );
//   if (result.modifiedCount == 0) {
//     return res.status(400).json({
//       message: "No updated data",
//     });
//   }
//   result = await Customer.find({
//     _id: id,
//   });
//   return res.status(200).json(result);
// });

// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   let result = await Customer.findOne({
//     _id: id,
//   });
//   if (!result) return res.status(404).send("No data found");
//   let deletedData = result;

//   // Untuk melakukan delete, dapat digunakan deleteOne atau deleteMany
//   result = await Customer.deleteOne({
//     _id: id,
//   });
//   if (!result)
//     return res.status(404).json({
//       message: "No updated data",
//     });
//   return res.status(200).json(deletedData);
// });

module.exports = router;

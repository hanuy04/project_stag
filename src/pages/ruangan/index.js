import MainLayout from "@/components/layouts/MainLayout";
import React from "react";

const index = () => {
  return (
    <MainLayout>
      <div className="bg-white w-full h-screen">
        <div className="p-4 w-full">
          {/* header */}
          <div className="flex">
            <h1 className="font-semibold text-4xl text-black">
              Informasi Ketersediaan Kelas
            </h1>
          </div>
          {/* kategori */}
          <div className="flex w-1/2 mt-10">
            <label>Kategori</label>
            <select className="form-control border border-black rounded p-1 mx-3 w-full">
              <option>Kelas X</option>
              <option>Kelas XI</option>
              <option>Kelas XII</option>
            </select>
          </div>
          {/* table */}
          <div className="w-full mt-5">
            <table border={"1"} className="w-full border border-blue-700">
              <thead className="border border-blue-700">
                <tr className="bg-blue-700 text-white">
                  <th className="border border-blue-700">Waktu</th>
                  <th className="border border-blue-700">Ruang X-1</th>
                  <th className="border border-blue-700">Ruang X-2</th>
                  <th className="border border-blue-700">Ruang X-3</th>
                  <th className="border border-blue-700">Ruang X-4</th>
                  <th className="border border-blue-700">Ruang X-5</th>
                  <th className="border border-blue-700">Ruang X-6</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="border border-blue-700 p-2">07:00 - 08:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">08:00 - 09:00</td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">09:00 - 10:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">10:00 - 11:00</td>
                  <td className="border border-blue-700 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 bg-red-500 p-2">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">11:00 - 12:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">12:00 - 13:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">13:00 - 14:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">14:00 - 15:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">15:00 - 16:00</td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">16:00 - 17:00</td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                </tr>
                <tr>
                  <td className="border border-blue-700 p-2">17:00 - 18:00</td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2"></td>
                  <td className="border border-blue-700 p-2 bg-red-500">
                    Tidak Tersedia
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default index;

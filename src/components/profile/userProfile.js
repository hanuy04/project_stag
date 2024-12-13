import React, { useState, useEffect } from "react";
import { KeyboardArrowRight, Menu, Person } from "@mui/icons-material";
import { Button } from "@mui/material";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState({});
  const [roles, setRoles] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const [roleFilter, setRoleFilter] = useState("siswa");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/usersCecil");
        if (!response.ok) throw new Error("Failed to fetch users.");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/roomsCecil");
        if (!response.ok) throw new Error("Failed to fetch rooms.");
        const data = await response.json();
        const roomMap = data.reduce((acc, room) => {
          acc[room.room_id] = room.room_name;
          return acc;
        }, {});
        setRooms(roomMap);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/rolesCecil");
        if (!response.ok) throw new Error("Failed to fetch roles.");
        const data = await response.json();
        const roleMap = data.reduce((acc, role) => {
          acc[role.role_id] = role.role_name;
          return acc;
        }, {});
        setRoles(roleMap);
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };

    fetchUsers();
    fetchRooms();
    fetchRoles();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const sortedData = [...users].sort((a, b) => {
    if (sortColumn) {
      let valueA;
      let valueB;

      if (sortColumn === "peran") {
        valueA = roles[a.role_id] || "";
        valueB = roles[b.role_id] || "";
      } else if (sortColumn === "no_absen") {
        valueA = a.no_absen || 0;
        valueB = b.no_absen || 0;
      } else if (sortColumn === "name") {
        valueA = a.name.toLowerCase() || "";
        valueB = b.name.toLowerCase() || "";
      } else {
        valueA = a[sortColumn];
        valueB = b[sortColumn];
      }

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    }
    return 0;
  });

  const filteredData = sortedData.filter((user) => {
    if (roleFilter === "siswa") {
      return user.role_id == 2 || user.role_id == 3;
    } else {
      return user.role_id == 0 || user.role_id == 1;
    }
  });

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Daftar User</h1>
            <div className="relative">
              <Button
                variant="contained"
                style={{ backgroundColor: "#4338CA" }}
                endIcon={<KeyboardArrowRight />}
                startIcon={<Person />}
                onClick={() => setShowLogout(!showLogout)}
              >
                Agnes [12345]
              </Button>
              {showLogout && (
                <button
                  className="absolute right-0 mt-2 w-full bg-white border shadow-lg py-2 px-4 rounded-lg text-red-600 hover:bg-red-50"
                  onClick={() => console.log("Logout clicked")}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="bg-[#4338CA] text-white px-4 py-2 rounded-lg">
              Tambah data
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => setRoleFilter("siswa")}
                className={`px-4 py-2 rounded-lg ${
                  roleFilter === "siswa"
                    ? "bg-[#4338CA] text-white"
                    : "bg-gray-200"
                }`}
              >
                Daftar Siswa
              </button>
              <button
                onClick={() => setRoleFilter("guru")}
                className={`px-4 py-2 rounded-lg ${
                  roleFilter === "guru"
                    ? "bg-[#4338CA] text-white"
                    : "bg-gray-200"
                }`}
              >
                Daftar Guru
              </button>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#4338CA] text-white">
                    {[
                      "No",
                      "Username",
                      "Nama",
                      "Kelas",
                      "No Absen",
                      "Peran",
                      "Status",
                    ]
                      .filter(
                        (header) =>
                          !(roleFilter === "guru" && header === "No Absen")
                      )
                      .map((header, index) => {
                        if (header === "No") {
                          return (
                            <th key={index} className="border p-2 text-left">
                              {header}
                            </th>
                          );
                        }
                        const sortKey =
                          header === "Peran"
                            ? "peran"
                            : header === "No Absen"
                            ? "no_absen"
                            : header === "Nama"
                            ? "name"
                            : header.toLowerCase();
                        return (
                          <th
                            key={header}
                            className="border p-2 text-left cursor-pointer"
                            onClick={() => handleSort(sortKey)}
                          >
                            {header}
                            {sortColumn === sortKey && (
                              <span className="ml-2">
                                {sortOrder === "asc" ? "↑" : "↓"}
                              </span>
                            )}
                          </th>
                        );
                      })}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 h-11">
                      <td className="border p-2">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="border p-2">{user.username || "-"}</td>
                      <td className="border p-2">{user.name || "-"}</td>
                      <td className="border p-2">{rooms[user.kelas] || "-"}</td>
                      {roleFilter !== "guru" && (
                        <td className="border p-2">{user.no_absen || "-"}</td>
                      )}
                      <td className="border p-2">
                        {roles[user.role_id] || "-"}
                      </td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            user.status === "1"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status === "1" ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {Array.from({
                    length: itemsPerPage - paginatedData.length,
                  }).map((_, emptyIndex) => (
                    <tr key={`empty-${emptyIndex}`} className="h-11">
                      <td className="border p-2" colSpan="6"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === page
                    ? "bg-[#4338CA] text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded-lg disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-gray-500">
            2020 © Sistem Fasilitas SMAK Santa Agnes
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

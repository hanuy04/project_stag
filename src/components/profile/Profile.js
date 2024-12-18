import { logout } from "@/store/persistSlices/authSlice";
import { KeyboardArrowRight, Person } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { Container } from "postcss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div>
      <Button
        variant="contained"
        endIcon={<KeyboardArrowRight />}
        onClick={() => setShowModal(!showModal)}
        sx={{
          backgroundColor: "#0c21c1",
          borderRadius: "1rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box gap={3} display={"flex"}>
          <Person />
          Agnes [12345]
        </Box>
      </Button>

      {showModal && (
        <button
          className="absolute right-0 mt-2 bg-white border shadow-lg py-2 px-4 rounded-lg text-blue hover:bg-blue z-50"
          onClick={handleLogout}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;

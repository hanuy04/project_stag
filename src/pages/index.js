import LoginPage from "@/components/auth/login/LoginPage";
import BerandaPage from "@/components/beranda/BerandaPage";
import { verifyToken } from "@/utils/verifyUser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const token = useSelector((state) => state.persist.auth.token);
  const role = useSelector((state) => state.persist.auth.user?.role);

  useEffect(() => {
    if (token) {
      const verify = async () => {
        const verified = await verifyToken(token);
        if (verified.success) {
          if (role == "sarpras") router.push("/peminjaman");
          else router.push("/beranda");
        }
      };
      verify();
    }
  }, [token, router]);

  return <LoginPage />;
};

export default index;

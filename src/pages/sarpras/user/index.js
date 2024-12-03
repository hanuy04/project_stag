import MainLayout from "@/components/layouts/MainLayout";
import UserProfile from "@/components/profile/userProfile";
import React from "react";

const index = () => {
  return (
    <MainLayout>
      <UserProfile />
    </MainLayout>
  );
};

export default index;

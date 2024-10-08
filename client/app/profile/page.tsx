"use client";

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`GoDoc | ${user?.name} Profile`}
          description="Profile"
          keywords="Profile"
        />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      </Protected>
      <Profile user={user} />
    </div>
  );
};

export default Page;

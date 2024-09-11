"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Routes/Hero";

interface Props{}

const Page:FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    return (
      <div>
        <Heading title="Learning Hub"
         description="This is a learning hub for all the students" 
         keywords="programming, coding, learning, hub, engineering, university, english, chinese" />
         <Header
         open={open}
         setOpen={setOpen}
         activeItem={activeItem}
         />
         <Hero/>
         <Hero/>
      </div>

    );
};

export default Page;
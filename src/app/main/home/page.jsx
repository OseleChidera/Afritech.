"use client";
import React, { useState } from "react";
import Nav from "@/components/Nav";
import PopularItems from "@/components/PopularItems/PopularIems";
import ImageSlider from "@/components/imageslider/ImageSlider";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  return (
    <div className="w-full relative min-h-screen max-h-fit border border-red-600   overflow-y-auto">
      <div className="pt-8 pb-[120px] flex flex-col gap-4">
        <ImageSlider />
        <PopularItems />
      </div>

      <Nav />
    </div>
  );
};

export default page;

"use client";
import React, { useContext } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { LoadableContext } from "next/dist/shared/lib/loadable-context.shared-runtime";
import { LoadingContext } from "./LoadingProvider";

const LayoutExtra = () => {
  const {isLoading} = useContext(LoadingContext)!;
  return <div>{isLoading && <LoadingSpinner />}</div>;
};

export default LayoutExtra;

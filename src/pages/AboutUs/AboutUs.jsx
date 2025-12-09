import React from "react";
import { useGetAboutUsQuery } from "../../Redux/api/aboutUsApi";

export default function AboutUs() {
  const { data, isLoading } = useGetAboutUsQuery({});

  if (isLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </section>
    );
  }

  if (!data?.data?.aboutUs) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-red-600">
          No About Us content found.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16 px-5 md:px-0 min-h-screen">
      <div className="container mx-auto">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.data.aboutUs }}
        />
      </div>
    </section>
  );
}

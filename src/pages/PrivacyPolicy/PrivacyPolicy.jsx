import React from "react";
import { useGetPrivacyQuery } from "../../Redux/api/privacyApi";

export default function PrivacyPolicy() {
  const { data, isLoading } = useGetPrivacyQuery({});

  if (isLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </section>
    );
  }

  if (!data?.data?.PrivacyPolicy) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-red-600">
          No Privacy Policy found.
        </p>
      </section>
    );
  }

  return (
    <div className="min-h-screen py-16 px-5 md:px-0">
      <div className="container mx-auto">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.data.PrivacyPolicy }}
        />
      </div>
    </div>
  );
}

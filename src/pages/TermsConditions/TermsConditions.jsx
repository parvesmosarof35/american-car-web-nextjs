import React from "react";
import { useGetTermsAndConditionsQuery } from "../../Redux/api/termsApi";

export default function TermsConditions() {
  const { data, isLoading } = useGetTermsAndConditionsQuery({});

  if (isLoading) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </section>
    );
  }

  if (!data?.data?.TermsConditions) {
    return (
      <section className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-medium text-red-600">No Terms & Conditions found.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-16 px-5 md:px-0">
      <div className="container mx-auto">
        <div
          className="prose max-w-none" // makes tailwind typography apply
          dangerouslySetInnerHTML={{ __html: data.data.TermsConditions }}
        />
      </div>
    </section>
  );
}

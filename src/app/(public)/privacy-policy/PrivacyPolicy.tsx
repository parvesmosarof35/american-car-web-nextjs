import { getBaseUrl } from "@/lib/config/env-config";
import React from "react";

// Server Component - fetches data server-side
async function getPrivacyData() {
  try {

    console.log(getBaseUrl(), "the base url");

    const response = await fetch(
      `${getBaseUrl()}setting/find_by_privacy_policyss`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache", // Enable SSG
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch privacy policy");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return null;
  }
}

export default async function PrivacyPolicy() {
  const data = await getPrivacyData();

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

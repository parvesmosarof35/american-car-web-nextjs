import React, { useState } from "react";
import BlogCard from "../../shared/BlogCard/BlogCard";
import { useGetAllBlogsQuery } from "../../Redux/api/blogApi";

export default function GuideAndBlog() {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isError } = useGetAllBlogsQuery({ page, limit });

  const blogs = data?.data?.allBlogsList || [];
  const meta = data?.data?.meta || {};
  const totalPages = meta.totalPage || 1;

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="text-center my-12">
        <h1 className="text-3xl md:text-6xl font-medium text-gray-900 mb-6">
          Number plate guide
        </h1>
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Everything you need to know about buying, selling, and valuing
            number plates — from legal formats to design tips.
          </p>
        </div>
      </div>

      {/* Loading / Error */}
      {isLoading && (
        <div className="text-center py-20 text-lg">Loading blogs...</div>
      )}
      {isError && (
        <div className="text-center py-20 text-red-500">
          Failed to load blogs.
        </div>
      )}

      {/* Blog Cards */}
      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((article) => (
              <BlogCard
                key={article._id}
                article={{
                  id: article._id,
                  image: `/${article.photo}`, // adjust if needed
                  title: article.blogTitle,
                  description: article.content,
                  link: `/blog/${article._id}`,
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#00823A] text-white hover:bg-green-700"
                }`}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    page === i + 1
                      ? "bg-[#00823A] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded ${
                  page === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#00823A] text-white hover:bg-green-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

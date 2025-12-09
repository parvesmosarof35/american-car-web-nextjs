import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  useGetRecentBlogsQuery,
  useGetSingleBlogQuery,
} from "../../Redux/api/blogApi";
import { getImageUrl } from "../../config/envConfig";
import BlogCard from "../../shared/BlogCard/BlogCard";
import Swal from "sweetalert2";

export default function BlogDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleBlogQuery(id);
  const { data: recentBlogs, isLoading: loadingRecentBlogs } =
    useGetRecentBlogsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (!data?.data) return <p>No blog found</p>;

  const blog = data.data;

  // Split long content into intro + rest
  const intro = blog.content.slice(0, 1390);
  const restContent = blog.content.slice(1390);

  return (
    <div className="container mx-auto px-4 py-5 md:py-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          {blog.blogTitle}
        </h1>

        {/* Publisher info (guard against null adminId) */}
        {(blog?.adminId && (blog.adminId.fastname || blog.adminId.lastname || blog.adminId.photo)) && (
          <div className="flex items-center gap-3 text-gray-600 my-3">
            {blog.adminId?.photo && (
              <img
                src={getImageUrl(blog.adminId.photo)}
                alt={`${blog.adminId?.fastname || ''} ${blog.adminId?.lastname || ''}`.trim() || 'Publisher'}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="text-sm ">
              {(blog.adminId?.fastname || blog.adminId?.lastname) && (
                <p className="font-medium text-gray-800">
                  {blog.adminId?.fastname || ''} {blog.adminId?.lastname || ''}
                </p>
              )}
              <p className="text-gray-500">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={getImageUrl(blog.photo)}
            alt={blog.blogTitle}
            className="w-full h-64 lg:h-96 object-cover rounded-lg"
          />
        </div>

        {/* Intro */}
        <div className="lg:w-1/2">
          <p className="text-gray-700 leading-relaxed">{intro}</p>
        </div>
      </div>

      {/* Extended Content */}
      {restContent && (
        <div className="mb-12">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>{restContent}</p>
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Share this article:
        </h4>
        <div className="flex gap-4">
          {[
            { icon: Facebook, color: "bg-blue-600 hover:bg-blue-700" },
            { icon: Twitter, color: "bg-blue-400 hover:bg-blue-500" },
            {
              icon: Instagram,
              color:
                "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
            },
            { icon: Linkedin, color: "bg-blue-700 hover:bg-blue-800" },
          ].map(({ icon, color }, i) => (
            <button
              key={i}
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                Swal.fire({
                  icon: "success",
                  title: "Copied!",
                  text: "Link copied to clipboard!",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }}
              className={`w-8 h-8 ${color} rounded flex items-center justify-center transition-colors cursor-pointer`}
            >
              {React.createElement(icon, { className: "w-4 h-4 text-white" })}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Blogs</h2>

        {loadingRecentBlogs ? (
          <p>Loading recent blogs...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentBlogs?.data?.map((article) => (
              <BlogCard
                key={article._id}
                article={{
                  id: article._id,
                  image: getImageUrl(article.photo),
                  title: article.blogTitle,
                  description: article.content,
                  link: `/blog/details/${article._id}`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

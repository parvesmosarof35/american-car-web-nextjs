import React from 'react';
import BlogCard from '../../../shared/BlogCard/BlogCard';
import { useGetAllBlogsQuery } from '../../../Redux/api/blogApi';
import Loader from '../../../shared/Loaders/Loader';

export default function HelpfulGuides() {
  const { data, isLoading } = useGetAllBlogsQuery({ limit: 3 });
  // console.log(data, isLoading);

  // Extract blog list safely
  const articles = data?.data?.allBlogsList || [];

  if(isLoading){
    <Loader></Loader>
  }

  return (
    <div className="container mx-auto px-4 md:px-0 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Helpful Guides On Buying, Selling &<br />
          Valuing Number Plates With<br />
          PlateExange
        </h1>
        <p className="text-lg text-gray-600  mx-auto">
          Discover the latest number plates added to the marketplace — fresh, unique, and available now.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((article) => (
          <BlogCard
            key={article._id}
            article={{
              id: article._id,
              image: `/${article.photo}`, // adjust path if needed
              title: article.blogTitle,
              description: article.content,
              link: `blog/${article._id}` // or whatever route you want
            }}
          />
        ))}
      </div>
    </div>
  );
}

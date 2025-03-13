
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden transition-all hover:border-gold/50 hover:shadow-gold">
      <div className="relative overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gold-dark px-3 py-1 text-xs rounded-full text-white">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center text-sm text-white/70">
            <Calendar size={14} className="mr-1" />
            {post.date}
          </div>
          <div className="flex items-center text-sm text-white/70">
            <Clock size={14} className="mr-1" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gold transition-colors">
          {post.title}
        </h3>
        
        <p className="text-white/70 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <span className="text-sm text-white/80">{post.author.name}</span>
          </div>
          
          <Link 
            to={`/blog/${post.slug}`} 
            className="text-gold hover:text-white transition-colors inline-flex items-center"
          >
            Read more <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

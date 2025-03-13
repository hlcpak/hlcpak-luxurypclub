
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard, { BlogPost } from './blog/BlogCard';

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Featured blog posts
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      slug: "ultimate-luxury-resorts-2024",
      title: "The Ultimate Guide to Luxury Resorts in 2024",
      excerpt: "Discover the world's most exclusive luxury resorts offering unparalleled experiences and exceptional service.",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      category: "Luxury Travel",
      date: "Apr 12, 2024",
      readTime: "6 min read",
      author: {
        name: "Alexandra Morgan",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg"
      }
    },
    {
      id: 2,
      slug: "hidden-paradise-destinations",
      title: "Hidden Paradise Destinations for the Elite Traveler",
      excerpt: "Explore secluded and pristine locations that offer privacy, exclusivity and unforgettable experiences.",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80",
      category: "Destinations",
      date: "Mar 28, 2024",
      readTime: "5 min read",
      author: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      id: 3,
      slug: "culinary-journeys-around-world",
      title: "Culinary Journeys Around the World",
      excerpt: "Embark on a gastronomic adventure featuring Michelin-starred restaurants and unique dining experiences.",
      content: "",
      coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      category: "Culinary",
      date: "Mar 15, 2024",
      readTime: "7 min read",
      author: {
        name: "Sophia Chen",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg"
      }
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-32 bg-black relative opacity-0 translate-y-10 transition-all duration-1000"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-gold-dark">Insights</span>
          <h2 className="text-3xl md:text-4xl mt-2 text-white">Luxury Travel <span className="text-gold">Blog</span></h2>
          <div className="h-px w-24 bg-gold-dark mx-auto mt-4"></div>
          <p className="mt-6 text-white/80 max-w-2xl mx-auto">
            Discover expert insights, travel tips, and inspiration for your next luxury journey.
          </p>
          <Link to="/blog" className="inline-flex items-center mt-4 text-gold hover:text-white transition-colors">
            <span>View All Articles</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

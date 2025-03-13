
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, MessageSquare } from 'lucide-react';
import { BlogPost } from '@/components/blog/BlogCard';
import { Card, CardContent } from '@/components/ui/card';

// This would come from a real API in a production app
import { blogPosts } from '@/data/blogData';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find the current post
    const currentPost = blogPosts.find(post => post.slug === slug);
    setPost(currentPost || null);
    
    // Find related posts (same category, excluding current)
    if (currentPost) {
      const related = blogPosts
        .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Blog post not found</h2>
          <Link to="/blog" className="text-gold hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6 ml-4">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      <main>
        {/* Hero section */}
        <section className="pt-32 pb-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-gold hover:text-white transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="bg-gold-dark px-3 py-1 text-xs rounded-full text-white">
                  {post.category}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-10 h-10 rounded-full object-cover border border-white/20 mr-3"
                  />
                  <span className="text-white">{post.author.name}</span>
                </div>
                
                <div className="flex items-center text-white/70">
                  <Calendar size={16} className="mr-1" />
                  {post.date}
                </div>
                
                <div className="flex items-center text-white/70">
                  <Clock size={16} className="mr-1" />
                  {post.readTime}
                </div>
              </div>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 max-w-5xl mx-auto mb-12 rounded-lg overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-8 py-4 border-y border-white/10">
                <div className="flex items-center space-x-4">
                  <button className="text-white/70 hover:text-gold transition-colors">
                    <MessageSquare size={20} />
                  </button>
                  <button className="text-white/70 hover:text-gold transition-colors">
                    <Bookmark size={20} />
                  </button>
                  <button className="text-white/70 hover:text-gold transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
              
              <article className="prose prose-lg prose-invert max-w-none mb-16">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              
              {/* Author bio */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 mb-16">
                <div className="flex items-start gap-6">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold"
                  />
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{post.author.name}</h3>
                    <p className="text-white/70 mb-4">
                      Luxury travel writer and expert with over a decade of experience exploring the world's most exclusive destinations.
                    </p>
                    <div className="flex space-x-3">
                      <a href="#" className="text-gold hover:text-white transition-colors">Twitter</a>
                      <a href="#" className="text-gold hover:text-white transition-colors">Instagram</a>
                      <a href="#" className="text-gold hover:text-white transition-colors">Website</a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-display font-semibold text-white mb-8">More Articles From {post.category}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedPosts.map(relatedPost => (
                      <Card key={relatedPost.id} className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-gold/50 hover:shadow-gold transition-all">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={relatedPost.coverImage} 
                            alt={relatedPost.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold text-white mb-2">
                            <Link to={`/blog/${relatedPost.slug}`} className="hover:text-gold transition-colors">
                              {relatedPost.title}
                            </Link>
                          </h4>
                          
                          <div className="flex items-center text-sm text-white/70 mb-2">
                            <Calendar size={14} className="mr-1" />
                            {relatedPost.date}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;

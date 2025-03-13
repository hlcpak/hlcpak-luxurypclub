
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const animatedSections = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedSections.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      animatedSections.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll get back to you shortly.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="absolute top-0 left-0 z-50 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-display font-bold text-gold">
          Luxury Privilege Club
        </h1>
      </div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3")'}}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Contact <span className="text-gold">Us</span>
            </h1>
            <div className="w-20 h-1 bg-gold mb-6"></div>
            <p className="text-white/80 text-lg md:text-xl">
              We're here to assist you with any questions about our membership benefits and services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Contact Card 1 */}
            <div 
              ref={(el) => (animatedSections.current[0] = el)} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-gold/40 transition-all duration-300 hover:shadow-gold text-center opacity-0 translate-y-10 transition-all duration-1000 delay-100"
            >
              <div className="bg-gold-dark/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Phone className="text-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Call Us
              </h3>
              <p className="text-white/70 mb-2">For general inquiries:</p>
              <p className="text-gold text-lg font-medium">+92 333 1234567</p>
              <p className="text-white/70 mt-4 mb-2">For membership services:</p>
              <p className="text-gold text-lg font-medium">+92 333 7654321</p>
            </div>
            
            {/* Contact Card 2 */}
            <div 
              ref={(el) => (animatedSections.current[1] = el)} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-gold/40 transition-all duration-300 hover:shadow-gold text-center opacity-0 translate-y-10 transition-all duration-1000 delay-200"
            >
              <div className="bg-gold-dark/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Mail className="text-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Email Us
              </h3>
              <p className="text-white/70 mb-2">For general inquiries:</p>
              <p className="text-gold text-lg font-medium break-all">info@luxuryprivilegeclub.com</p>
              <p className="text-white/70 mt-4 mb-2">For membership services:</p>
              <p className="text-gold text-lg font-medium break-all">members@luxuryprivilegeclub.com</p>
            </div>
            
            {/* Contact Card 3 */}
            <div 
              ref={(el) => (animatedSections.current[2] = el)} 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-gold/40 transition-all duration-300 hover:shadow-gold text-center opacity-0 translate-y-10 transition-all duration-1000 delay-300"
            >
              <div className="bg-gold-dark/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Clock className="text-gold h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                Business Hours
              </h3>
              <p className="text-white/70 mb-2">Monday to Friday:</p>
              <p className="text-gold text-lg font-medium">9:00 AM - 6:00 PM</p>
              <p className="text-white/70 mt-4 mb-2">Saturday:</p>
              <p className="text-gold text-lg font-medium">10:00 AM - 4:00 PM</p>
              <p className="text-white/70 mt-4 mb-2">Sunday:</p>
              <p className="text-gold text-lg font-medium">Closed</p>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div 
              ref={(el) => (animatedSections.current[3] = el)} 
              className="opacity-0 translate-y-10 transition-all duration-1000"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Send Us a <span className="text-gold">Message</span>
              </h2>
              <p className="text-white/80 mb-8">
                Have questions about our membership tiers, exclusive deals, or any other inquiry? Fill out the form, and our team will get back to you shortly.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/90 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/90 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-white/90 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white/90 mb-2">Message</label>
                  <textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-white/50 focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn-primary flex items-center justify-center disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div 
              ref={(el) => (animatedSections.current[4] = el)} 
              className="opacity-0 translate-y-10 transition-all duration-1000 delay-300"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:border-gold/40 transition-all duration-300 hover:shadow-gold">
                <h3 className="text-2xl font-display font-semibold text-white mb-6 flex items-center">
                  <MapPin className="text-gold mr-2 h-5 w-5" />
                  Visit Our Office
                </h3>
                <div className="rounded-lg overflow-hidden mb-6 h-[300px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.2124371966997!2d74.33395167559357!3d31.516095048536746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLiberty%20Market%2C%20Gulberg%2C%20Lahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1701896457100!5m2!1sen!2s"
                    width="100%" 
                    height="100%" 
                    style={{border: 0}} 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-gold mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Headquarters</h4>
                      <p className="text-white/70">
                        Liberty Market, Gulberg III<br />
                        Lahore, Punjab, Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-gold mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Islamabad Office</h4>
                      <p className="text-white/70">
                        Blue Area, F-6<br />
                        Islamabad, Pakistan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-gold mr-3 h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium">Karachi Office</h4>
                      <p className="text-white/70">
                        Clifton Block 5<br />
                        Karachi, Sindh, Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;

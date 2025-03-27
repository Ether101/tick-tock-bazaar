
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Shield, Gift } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import Hero from '../components/Hero';
import WatchCard from '../components/WatchCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  const { products } = useProducts();
  
  // Featured products (just the first 3)
  const featuredProducts = products.slice(0, 3);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-semibold mb-4"
            >
              Why Choose TickTock?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              We deliver exceptional timepieces with unparalleled service and expertise.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">Swiss Precision</h3>
              <p className="text-muted-foreground">
                Our watches feature premium Swiss movements, known worldwide for their accuracy and reliability.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">Lifetime Warranty</h3>
              <p className="text-muted-foreground">
                Every timepiece comes with our exclusive lifetime warranty and free maintenance service.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-xl text-center"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-3">Luxury Packaging</h3>
              <p className="text-muted-foreground">
                Each watch is presented in a premium gift box with authentic certification and documentation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-semibold mb-4"
              >
                Featured Collection
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Discover our most sought-after timepieces
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link 
                to="/products"
                className="text-primary font-medium flex items-center gap-2 hover:text-accent transition-colors group"
              >
                View All
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <WatchCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded in 2005, TickTock began with a simple mission: to create exceptional timepieces that blend traditional craftsmanship with modern design. Our founder, a third-generation watchmaker, started the company with a deep appreciation for the art of horology.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Today, we continue that legacy by sourcing the finest materials and partnering with skilled artisans to create watches that stand the test of time. Each TickTock timepiece represents our unwavering commitment to quality and design excellence.
              </p>
              <Link 
                to="/products"
                className="btn-primary"
              >
                Explore Our Collection
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop"
                  alt="Watch craftsmanship" 
                  className="w-full h-auto rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-accent/10 rounded-xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-36 h-36 bg-primary/5 rounded-xl -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Elegance on Your Wrist
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have chosen TickTock for their timekeeping needs. Time waits for no one.
            </p>
            <Link to="/products" className="btn-primary bg-white text-black hover:bg-white/90 text-lg px-8 py-3">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1974&auto=format&fit=crop"
          alt="Luxury watch background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Time is <span className="text-accent">Precious</span>.<br />
              Your Watch Should Be Too.
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-lg">
              Discover our collection of meticulously crafted timepieces that blend exceptional craftsmanship with timeless design.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="btn-primary bg-white text-black hover:bg-white/90 px-8 py-3 text-base sm:text-lg flex items-center gap-2 group"
            >
              Shop Collection
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/products"
              className="btn-secondary bg-transparent text-white border border-white/50 hover:bg-white/10 px-8 py-3 text-base sm:text-lg"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-white/70 text-sm mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

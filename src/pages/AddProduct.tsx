
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from "sonner";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    imageUrl: '',
    category: '',
    inStock: true,
    features: ['']
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...product.features];
    updatedFeatures[index] = value;
    setProduct(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const addFeature = () => {
    setProduct(prev => ({ ...prev, features: [...prev.features, ''] }));
  };
  
  const removeFeature = (index: number) => {
    const updatedFeatures = product.features.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, features: updatedFeatures }));
  };
  
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct(prev => ({ ...prev, inStock: e.target.value === 'true' }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!product.name || !product.brand || !product.price || !product.description || !product.imageUrl) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    // Filter out empty features
    const filteredFeatures = product.features.filter(feature => feature.trim() !== '');
    
    try {
      // Convert price to number
      const newProduct = {
        ...product,
        price: parseFloat(product.price),
        features: filteredFeatures
      };
      
      addProduct(newProduct);
      toast.success("Product added successfully!");
      navigate('/products');
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-8">Add New Product</h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 md:p-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Product Name */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    required
                  />
                </div>
                
                {/* Brand */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="brand" className="block text-sm font-medium mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={product.brand}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    required
                  />
                </div>
                
                {/* Price */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="price" className="block text-sm font-medium mb-2">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="0"
                    step="0.01"
                    value={product.price}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    required
                  />
                </div>
                
                {/* Category */}
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    className="input-field w-full"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="luxury">Luxury</option>
                    <option value="sport">Sport</option>
                    <option value="dress">Dress</option>
                    <option value="smart">Smart</option>
                  </select>
                </div>
                
                {/* Image URL */}
                <div className="col-span-2">
                  <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="input-field w-full"
                    required
                  />
                </div>
                
                {/* Description */}
                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field w-full"
                    required
                  ></textarea>
                </div>
                
                {/* In Stock */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Availability
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="inStock"
                        value="true"
                        checked={product.inStock}
                        onChange={handleStockChange}
                        className="mr-2"
                      />
                      In Stock
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="inStock"
                        value="false"
                        checked={!product.inStock}
                        onChange={handleStockChange}
                        className="mr-2"
                      />
                      Out of Stock
                    </label>
                  </div>
                </div>
                
                {/* Features */}
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                      Features
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="text-accent hover:text-accent/80 transition-colors flex items-center gap-1 text-sm"
                    >
                      <Plus size={16} />
                      Add Feature
                    </button>
                  </div>
                  
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        className="input-field flex-1"
                      />
                      {product.features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-2 p-2 text-red-500 hover:text-red-700 transition-colors"
                          aria-label="Remove feature"
                        >
                          <X size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddProduct;

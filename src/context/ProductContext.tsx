
import React, { createContext, useState, useContext, useEffect } from 'react';

export type WatchProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  features: string[];
  imageUrl: string;
  inStock: boolean;
  category: string;
};

type ProductContextType = {
  products: WatchProduct[];
  loading: boolean;
  error: string | null;
  searchProducts: (query: string) => WatchProduct[];
  getProductById: (id: string) => WatchProduct | undefined;
  addProduct: (product: Omit<WatchProduct, 'id'>) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Sample watch data
const initialProducts: WatchProduct[] = [
  {
    id: '1',
    name: 'Chrono Master',
    brand: 'Tick-Tock',
    price: 2499,
    description: 'The Chrono Master is a precision timepiece crafted with Swiss movement and a sapphire crystal face. Water-resistant to 100 meters with a genuine leather strap.',
    features: ['Swiss movement', 'Sapphire crystal', 'Water-resistant to 100m', 'Leather strap', 'Luminous hands'],
    imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1180&auto=format&fit=crop',
    inStock: true,
    category: 'luxury'
  },
  {
    id: '2',
    name: 'Diver Pro',
    brand: 'AquaTime',
    price: 1899,
    description: 'Designed for underwater adventures, the Diver Pro features a unidirectional rotating bezel and is water-resistant to 300 meters. The stainless steel case ensures durability.',
    features: ['Rotating bezel', 'Water-resistant to 300m', 'Stainless steel case', 'Rubber strap', 'Screw-down crown'],
    imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop',
    inStock: true,
    category: 'sport'
  },
  {
    id: '3',
    name: 'Classic Slim',
    brand: 'Tick-Tock',
    price: 1299,
    description: 'An elegant dress watch with a slim profile, perfect for formal occasions. Features a Japanese quartz movement and a genuine alligator leather strap.',
    features: ['Japanese quartz movement', 'Ultra-slim design', 'Alligator leather', 'Sapphire crystal', 'Date display'],
    imageUrl: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1180&auto=format&fit=crop',
    inStock: true,
    category: 'dress'
  },
  {
    id: '4',
    name: 'Smart Chrono',
    brand: 'TechTime',
    price: 3499,
    description: 'A hybrid smartwatch that combines traditional craftsmanship with modern technology. Tracks fitness metrics and provides notifications without sacrificing style.',
    features: ['Step tracking', 'Sleep monitoring', 'Notification alerts', 'Heart rate monitor', '7-day battery life'],
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1027&auto=format&fit=crop',
    inStock: false,
    category: 'smart'
  },
  {
    id: '5',
    name: 'Vintage Automatic',
    brand: 'Heritage',
    price: 4299,
    description: 'A timeless automatic watch inspired by designs from the 1960s. Features a visible movement through the exhibition caseback and comes with a polished mesh bracelet.',
    features: ['Automatic movement', 'Exhibition caseback', 'Mesh bracelet', 'Domed crystal', 'Small seconds subdial'],
    imageUrl: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1180&auto=format&fit=crop',
    inStock: true,
    category: 'luxury'
  },
  {
    id: '6',
    name: 'Explorer GMT',
    brand: 'AquaTime',
    price: 2799,
    description: 'The perfect travel companion with dual time zone functionality. The robust construction and legible dial make it suitable for adventures worldwide.',
    features: ['GMT function', 'Anti-magnetic case', 'Super-LumiNova indices', 'Screw-down crown', '48-hour power reserve'],
    imageUrl: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1287&auto=format&fit=crop',
    inStock: true,
    category: 'sport'
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<WatchProduct[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // In a real app, we would fetch data from an API
  useEffect(() => {
    // Simulating a data fetch
    setLoading(true);
    try {
      // Using our initialProducts as mock data
      setProducts(initialProducts);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  }, []);

  const searchProducts = (query: string): WatchProduct[] => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase().trim();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getProductById = (id: string): WatchProduct | undefined => {
    return products.find(product => product.id === id);
  };

  const addProduct = (product: Omit<WatchProduct, 'id'>) => {
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    };
    setProducts([...products, newProduct]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        searchProducts,
        getProductById,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  
  return context;
};


import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const { searchProducts } = useProducts();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the input when opened
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
        if (onClose) {
          onClose();
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const results = searchProducts(query);
      setSearchResults(results);
      setIsResultsVisible(true);
    } else {
      setSearchResults([]);
      setIsResultsVisible(false);
    }
  }, [query, searchProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setQuery('');
      setIsResultsVisible(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
    setQuery('');
    setIsResultsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div ref={searchContainerRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for watches..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-10 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent/30 focus:outline-none transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="ml-2 h-12 px-6 btn-primary"
        >
          Search
        </button>
      </form>
      
      {isResultsVisible && searchResults.length > 0 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg max-h-96 overflow-auto">
          <div className="py-2">
            {searchResults.map(product => (
              <div
                key={product.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center"
                onClick={() => handleProductSelect(product.id)}
              >
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                </div>
                <div className="text-sm font-medium">
                  ${product.price.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

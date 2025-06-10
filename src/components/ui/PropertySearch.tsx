import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { getSearchSuggestions } from '@/lib/supabase';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PropertySearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
  useGoogleRedirect?: boolean;
}

const PropertySearch = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search properties...", 
  className,
  useGoogleRedirect = false
}: PropertySearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{text: string, type: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(value, 300);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearchTerm && debouncedSearchTerm.length >= 2) {
        setIsLoading(true);
        setError(null);
        try {
          const data = await getSearchSuggestions(debouncedSearchTerm);
          // Ensure we have a valid array of suggestions
          if (Array.isArray(data)) {
            setSuggestions(data);
          } else {
            console.error('Invalid suggestions format:', data);
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setError('Failed to load suggestions');
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [debouncedSearchTerm]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
    
    if (useGoogleRedirect) {
      redirectToGoogle(suggestion);
    } else {
      onSearch();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (useGoogleRedirect) {
        redirectToGoogle(value);
      } else {
        onSearch();
      }
      setIsFocused(false);
    }
  };

  const redirectToGoogle = (searchTerm: string) => {
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(`real estate ${searchTerm}`)}`;
    window.open(googleSearchUrl, '_blank');
  };

  const clearSearch = () => {
    onChange('');
    inputRef.current?.focus();
  };

  const handleSearchClick = () => {
    if (useGoogleRedirect) {
      redirectToGoogle(value);
    } else {
      onSearch();
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-400 cursor-pointer" 
          size={18} 
          onClick={handleSearchClick}
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-8 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
        />
        {value && (
          <button 
            onClick={clearSearch} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-400 hover:text-royal-600"
            type="button"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isFocused && (isLoading || error || suggestions.length > 0) && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading && (
            <div className="px-4 py-3 text-royal-600 text-sm">
              Loading suggestions...
            </div>
          )}
          
          {error && (
            <div className="px-4 py-3 text-red-500 text-sm">
              {error}
            </div>
          )}
          
          {!isLoading && !error && suggestions.length > 0 && suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.text}-${index}`}
              className="px-4 py-2 hover:bg-royal-50 cursor-pointer flex items-center"
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <Search size={16} className="mr-2 text-royal-400" />
              <div>
                <span className="text-royal-800">{suggestion.text}</span>
                <span className="ml-2 text-xs text-royal-400 capitalize">
                  {suggestion.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertySearch;

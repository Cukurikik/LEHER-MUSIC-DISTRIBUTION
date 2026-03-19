import React, { useState, useRef, useEffect } from 'react';

type Option = {
  value: string;
  label: string;
  [key: string]: any;
};

interface CustomSelectorProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  renderOption?: (option: Option) => React.ReactNode;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);


const CustomSelector: React.FC<CustomSelectorProps> = ({ options, value, onChange, placeholder = "Select an option", renderOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left rounded-lg p-3 transition flex justify-between items-center form-input-glow"
      >
        <div className="truncate">
          {selectedOption ? (renderOption ? renderOption(selectedOption) : selectedOption.label) : <span className="text-ui-text-subtle">{placeholder}</span>}
        </div>
        <ChevronDownIcon className={`w-5 h-5 text-ui-text-subtle/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-ui-surface border border-ui-border rounded-lg shadow-2xl animate-page-fade-in-up max-h-60 overflow-hidden flex flex-col">
          <div className="p-2 border-b border-ui-border">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ui-text-subtle/60" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-ui-bg border border-ui-border rounded-md p-2 pl-9 text-sm text-ui-text-heading form-input-glow"
              />
            </div>
          </div>
          <ul className="py-1 overflow-y-auto flex-1">
            {filteredOptions.length > 0 ? filteredOptions.map(option => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer text-ui-text-body hover:bg-white/5 hover:text-primary ${value === option.value ? 'bg-white/5' : ''}`}
              >
                {renderOption ? renderOption(option) : option.label}
              </li>
            )) : <li className="px-4 py-2 text-ui-text-subtle text-center">No results found</li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelector;
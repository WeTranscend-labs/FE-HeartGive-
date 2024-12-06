import { useState, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder = 'Add tags...' }: TagInputProps) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = input.trim().toLowerCase();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
      {value.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-1 text-primary-600 hover:text-primary-800"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-[120px] outline-none"
        placeholder={value.length === 0 ? placeholder : ''}
      />
    </div>
  );
}
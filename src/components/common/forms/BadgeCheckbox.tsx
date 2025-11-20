// components/BadgeCheckbox.tsx
import React from 'react';

interface BadgeCheckboxProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (selected: string[]) => void;
}

const BadgeCheckbox: React.FC<BadgeCheckboxProps> = ({
                                                       categories,
                                                       selectedCategories,
                                                       onChange
                                                     }) => {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(item => item !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategories.includes(category);
        return (
          <label
            key={category}
            className={`
              cursor-pointer rounded-full px-4 py-2 text-sm font-medium
              transition-colors duration-200
              ${isSelected
              ? 'bg-primary-main text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
            `}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        );
      })}
    </div>
  );
};

export default BadgeCheckbox;
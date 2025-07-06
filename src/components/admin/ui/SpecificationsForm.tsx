"use client";

import React, { useState, useEffect, useRef } from "react";

import FormField from "./FormField";
import { PlusIcon, TrashIcon, ChevronDownIcon } from "@/components/ui/Icons";

interface SpecificationsFormProps {
  specifications?: Record<string, string>;
  onChange: (specifications: Record<string, string>) => void;
  className?: string;
}

// Custom dropdown component for specifications
const SpecificationDropdown: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: string[];
  index: number;
}> = ({ value, onChange, placeholder, options, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && !isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-colors duration-200"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 hover:text-gray-600"
        >
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option, optionIndex) => (
            <button
              key={optionIndex}
              type="button"
              onClick={() => handleOptionSelect(option)}
              className="w-full px-3 py-2 text-left text-sm text-gray-900 bg-white hover:bg-teal-50 hover:text-teal-900 focus:bg-teal-100 focus:text-teal-900 focus:outline-none border-b border-gray-100 last:border-b-0 transition-colors duration-150"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SpecificationsForm: React.FC<SpecificationsFormProps> = ({
  specifications = {},
  onChange,
  className = "",
}) => {
  const [localSpecs, setLocalSpecs] = useState<
    Array<{ key: string; value: string }>
  >([]);

  // Convert specifications object to array for easier editing
  useEffect(() => {
    const specsArray = Object.entries(specifications).map(([key, value]) => ({
      key,
      value,
    }));

    // Always ensure at least one empty row for new specifications
    if (specsArray.length === 0) {
      specsArray.push({ key: "", value: "" });
    }

    setLocalSpecs(specsArray);
  }, [specifications]);

  // Convert array back to object and notify parent
  const updateSpecifications = (
    newSpecs: Array<{ key: string; value: string }>
  ) => {
    // Always update local state with all specs (including empty ones)
    setLocalSpecs(newSpecs);

    // Only send non-empty specs to parent
    const specsObject = newSpecs
      .filter((spec) => spec.key.trim() && spec.value.trim()) // Only include non-empty specs
      .reduce((acc, spec) => {
        acc[spec.key.trim()] = spec.value.trim();
        return acc;
      }, {} as Record<string, string>);

    onChange(specsObject);
  };

  // Add new specification
  const addSpecification = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    const newSpecs = [...localSpecs, { key: "", value: "" }];
    setLocalSpecs(newSpecs);
  };

  // Remove specification
  const removeSpecification = (index: number) => {
    const newSpecs = localSpecs.filter((_, i) => i !== index);
    // Ensure at least one empty row remains
    if (newSpecs.length === 0) {
      newSpecs.push({ key: "", value: "" });
    }
    updateSpecifications(newSpecs);
  };

  // Update specification key or value
  const updateSpecification = (
    index: number,
    field: "key" | "value",
    newValue: string
  ) => {
    const newSpecs = localSpecs.map((spec, i) =>
      i === index ? { ...spec, [field]: newValue } : spec
    );
    updateSpecifications(newSpecs);
  };

  // Common specifications for electronics
  const commonSpecs = [
    "Brand",
    "Model",
    "Color",
    "Weight",
    "Dimensions",
    "Material",
    "Warranty",
    "Country of Origin",
    // Phone specific
    "Screen Size",
    "Storage",
    "RAM",
    "Camera",
    "Battery",
    "Operating System",
    // Laptop specific
    "Processor",
    "Graphics Card",
    "Display",
    "Ports",
    "Keyboard",
    // Accessories specific
    "Compatibility",
    "Connection Type",
    "Cable Length",
    "Power Rating",
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Product Specifications
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Add technical specifications and product details that customers will
          see on the product page.
        </p>
      </div>

      <div className="space-y-4">
        {localSpecs.map((spec, index) => (
          <div key={index} className="grid grid-cols-12 gap-3 items-end">
            <div className="col-span-4">
              <FormField label={index === 0 ? "Specification" : ""}>
                <SpecificationDropdown
                  value={spec.key}
                  onChange={(value) => updateSpecification(index, "key", value)}
                  placeholder="e.g., Screen Size, RAM, Weight"
                  options={commonSpecs}
                  index={index}
                />
              </FormField>
            </div>

            <div className="col-span-6">
              <FormField label={index === 0 ? "Value" : ""}>
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, "value", e.target.value)
                  }
                  placeholder="e.g., 6.1 inches, 8GB, 174g"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none transition-colors duration-200"
                />
              </FormField>
            </div>

            <div className="col-span-2 flex justify-end">
              {(localSpecs.length > 1 || spec.key || spec.value) && (
                <button
                  type="button"
                  onClick={() => removeSpecification(index)}
                  className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
                  title="Remove specification"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}

        {localSpecs.length === 0 && (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-sm">
              No specifications added yet. Click "Add Specification" to get
              started.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-start">
        <button
          type="button"
          onClick={(e) => addSpecification(e)}
          className="inline-flex items-center px-4 py-2 border border-teal-600 text-sm font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Specification
        </button>
      </div>

      {Object.keys(specifications).length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(specifications).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
              >
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {key}
                </span>
                <span className="text-sm text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificationsForm;

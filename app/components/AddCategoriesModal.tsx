"use client";

import { X } from "lucide-react";
import {
  Briefcase,
  Palette,
  Smartphone,
  Laptop,
  DollarSign,
  Globe,
  Music,
  Film,
  Book,
  Brain,
  Camera,
  ShoppingCart,
  Gamepad2,
  Lightbulb,
  Pencil,
  Compass,
} from "lucide-react";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ICONS = [
  Briefcase,
  Palette,
  Smartphone,
  Laptop,
  DollarSign,
  Globe,
  Music,
  Film,
  Book,
  Brain,
  Camera,
  ShoppingCart,
  Gamepad2,
  Lightbulb,
  Pencil,
  Compass,
];

const COLORS = [
  "#E74C3C",
  "#F39C12",
  "#F1C40F",
  "#2ECC71",
  "#1ABC9C",
  "#4A90E2",
  "#9B59B6",
  "#BDC3C7",
  "#34495E",
];

export default function AddCategoryModal({ open, onClose }: Props) {
  const [selectedIcon, setSelectedIcon] = useState<(typeof ICONS)[number]>(
    ICONS[0],
  );
  const [selectedColor, setSelectedColor] = useState(COLORS[5]);
  const [name, setName] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-xl rounded-2xl bg-[#262626] p-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Add New Category</h2>
            <p className="text-sm text-[#9B9B9B] mt-1">
              Create a new category to organize your bookmarks
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-[#9B9B9B] hover:text-white cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">
            Category Name <span className="text-[#F1C40F]">*</span>
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name..."
            className="w-full rounded-lg bg-[#1B1B1B] border border-[#515151]
                       px-4 py-3 text-sm placeholder-[#7F7F7F]
                       focus:outline-none focus:border-[#4A90E2]"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm">Choose Icon</label>
          <div className="grid grid-cols-8 gap-3 rounded-lg bg-[#1B1B1B] p-4 border border-[#515151]">
            {ICONS.map((Icon, index) => (
              <button
                key={index}
                onClick={() => setSelectedIcon(Icon)}
                className={`h-9 w-9 rounded-md flex items-center justify-center
                  transition
                  ${
                    selectedIcon === Icon
                      ? "bg-[#4A90E2]"
                      : "hover:bg-[#2A2A2A]"
                  }`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm">Choose color</label>
          <div className="flex gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color }}
                className={`h-9 w-9 rounded-full border-2 transition
                  ${
                    selectedColor === color
                      ? "border-white scale-105"
                      : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#F7F7F7] text-black py-3
             font-medium hover:bg-[#F4F4F4] transition cursor-pointer"
          >
            Create Category
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-[#1B1B1B] border border-[#515151]
                       py-3 hover:bg-[#2A2A2A] transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

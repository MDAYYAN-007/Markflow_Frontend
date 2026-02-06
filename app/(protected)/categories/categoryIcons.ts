import {
  Laptop,
  Smartphone,
  Tablet,
  Palette,
  DollarSign,
  Music,
  Film,
  Book,
  TrendingUp,
  Lightbulb,
  Shirt,
  Watch,
  ShoppingBag,
  LucideFootprints,
  Home,
  Utensils,
  Glasses,
  Sparkles,
  Heart,
  Dumbbell,
  Car,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export const categoryIcons: Partial<Record<string, LucideIcon>> = {
  laptops: Laptop,
  smartphones: Smartphone,
  tablets: Tablet,
  "mobile-accessories": Smartphone,

  "mens-shirts": Shirt,
  "mens-shoes": LucideFootprints,
  "mens-watches": Watch,
  "womens-dresses": Shirt,
  "womens-shoes": LucideFootprints,
  "womens-watches": Watch,
  "womens-bags": ShoppingBag,
  "womens-jewellery": Sparkles,
  sunglasses: Glasses,
  tops: Shirt,

  beauty: Palette,
  fragrances: Sparkles,
  "skin-care": Heart,

  furniture: Home,
  "home-decoration": Home,
  groceries: ShoppingBag,
  "kitchen-accessories": Utensils,
  lighting: Lightbulb,

  vehicle: Car,
  motorcycle: TrendingUp,

  "sports-accessories": Dumbbell,
  books: Book,
  music: Music,
  movies: Film,
  finance: DollarSign,
};

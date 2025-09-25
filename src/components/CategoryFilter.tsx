import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="w-full pb-4">
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          <Badge 
            variant={selectedCategory === "all" ? "default" : "outline"}
            className={`cursor-pointer whitespace-nowrap transition-colors ${
              selectedCategory === "all" 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "hover:bg-secondary"
            }`}
            onClick={() => onCategoryChange("all")}
          >
            All News
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap transition-colors ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-secondary"
              }`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
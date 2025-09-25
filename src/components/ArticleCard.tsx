import { Clock, ExternalLink, Bookmark, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  readingTime: number;
  category: string;
  onClick: () => void;
}

const ArticleCard = ({
  title,
  summary,
  source,
  publishedAt,
  imageUrl,
  readingTime,
  category,
  onClick,
}: ArticleCardProps) => {
  const timeAgo = new Date(publishedAt).toLocaleDateString();

  return (
    <Card 
      className="group cursor-pointer transition-all duration-300 hover:shadow-[var(--card-shadow-hover)] border-border bg-card"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          {imageUrl && (
            <div className="w-24 h-20 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            {/* Category and Source */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs font-medium bg-accent/10 text-accent hover:bg-accent/20">
                {category}
              </Badge>
              <span className="text-xs text-muted-foreground">{source}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>

            {/* Title */}
            <h3 className="font-headline font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Summary */}
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {summary}
            </p>

            {/* Meta info and actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{readingTime} min read</span>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bookmark className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
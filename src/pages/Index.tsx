import { useState } from "react";
import Header from "@/components/Header";
import ArticleCard from "@/components/ArticleCard";
import ArticlePanel from "@/components/ArticlePanel";
import CategoryFilter from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, TrendingUp, Clock, Globe } from "lucide-react";

// Mock data for demonstration
const mockArticles = [
  {
    id: 1,
    title: "Revolutionary AI Breakthrough Changes Healthcare Industry Forever",
    summary: "Scientists have developed a groundbreaking AI system that can diagnose diseases with 99.8% accuracy, potentially revolutionizing medical care worldwide.",
    content: "Full article content would go here...",
    source: "TechNews Today",
    author: "Dr. Sarah Johnson",
    publishedAt: "2024-01-15T10:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    readingTime: 4,
    category: "Technology",
    url: "https://example.com/article1"
  },
  {
    id: 2,
    title: "Climate Summit Reaches Historic Agreement on Carbon Emissions",
    summary: "World leaders agree on ambitious new targets to reduce global carbon emissions by 50% within the next decade.",
    content: "Full article content would go here...",
    source: "Global Climate Report",
    author: "Michael Chen",
    publishedAt: "2024-01-14T15:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1569163139394-de44cb5894c8?w=400&h=300&fit=crop",
    readingTime: 6,
    category: "Environment",
    url: "https://example.com/article2"
  },
  {
    id: 3,
    title: "Major Economic Reforms Announced by Federal Reserve",
    summary: "The Federal Reserve announces significant policy changes aimed at controlling inflation and stabilizing the economy.",
    content: "Full article content would go here...",
    source: "Financial Times",
    author: "Lisa Rodriguez",
    publishedAt: "2024-01-14T09:20:00Z",
    readingTime: 3,
    category: "Business",
    url: "https://example.com/article3"
  },
  {
    id: 4,
    title: "Space Mission Successfully Lands on Mars, Discovers Water",
    summary: "NASA's latest Mars rover has discovered substantial water reserves beneath the planet's surface, marking a historic achievement.",
    content: "Full article content would go here...",
    source: "Space Exploration Daily",
    author: "Prof. James Wilson",
    publishedAt: "2024-01-13T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop",
    readingTime: 5,
    category: "Science",
    url: "https://example.com/article4"
  }
];

const categories = ["Technology", "Environment", "Business", "Science", "Politics", "Health"];

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof mockArticles[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = selectedCategory === "all" 
    ? mockArticles 
    : mockArticles.filter(article => article.category === selectedCategory);

  const handleArticleClick = (article: typeof mockArticles[0]) => {
    setSelectedArticle(article);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-4 leading-tight">
              Stay Informed with <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">Smart Summaries</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get concise, AI-powered summaries of the latest news articles. Translate them into any language and stay globally informed in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium">
                <PlusCircle className="w-5 h-5 mr-2" />
                Add Article URL
              </Button>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Live Updates</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  <span>50+ Languages</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Instant Summaries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Articles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              summary={article.summary}
              source={article.source}
              publishedAt={article.publishedAt}
              imageUrl={article.imageUrl}
              readingTime={article.readingTime}
              category={article.category}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <Card className="p-12 text-center bg-secondary/30">
            <div className="max-w-md mx-auto">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-headline font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or add a custom article URL.
              </p>
            </div>
          </Card>
        )}
      </main>

      {/* Article Panel */}
      {selectedArticle && (
        <ArticlePanel
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          article={selectedArticle}
        />
      )}
    </div>
  );
};

export default Index;

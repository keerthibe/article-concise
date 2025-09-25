import { X, Languages, Download, Copy, ExternalLink, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ArticlePanelProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    summary: string;
    content: string;
    source: string;
    author?: string;
    publishedAt: string;
    imageUrl?: string;
    readingTime: number;
    category: string;
    url: string;
  };
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
];

const ArticlePanel = ({ isOpen, onClose, article }: ArticlePanelProps) => {
  const [translatedSummary, setTranslatedSummary] = useState(article.summary);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { toast } = useToast();

  const handleTranslate = async (languageCode: string) => {
    setIsTranslating(true);
    setSelectedLanguage(languageCode);
    
    // Simulate translation - in real app, this would call your translation API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTranslatedSummary(`[${languages.find(l => l.code === languageCode)?.name} translation] ${article.summary}`);
      toast({
        title: "Translation complete",
        description: `Summary translated to ${languages.find(l => l.code === languageCode)?.name}`,
      });
    } catch (error) {
      toast({
        title: "Translation failed", 
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(translatedSummary);
    toast({
      title: "Copied to clipboard",
      description: "Article summary copied successfully",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([`${article.title}\n\n${translatedSummary}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.slice(0, 50)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Article summary saved as text file",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-background border-l border-border overflow-y-auto">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-headline font-bold text-primary">Article Summary</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Article Header */}
          <div className="space-y-4">
            {article.imageUrl && (
              <div className="w-full h-48 rounded-lg overflow-hidden bg-secondary">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-accent/10 text-accent">
                  {article.category}
                </Badge>
                <span className="text-sm text-muted-foreground">{article.source}</span>
              </div>

              <h1 className="text-2xl font-headline font-bold text-foreground leading-tight">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </div>
                {article.author && <span>By {article.author}</span>}
              </div>
            </div>
          </div>

          <Separator />

          {/* Summary Section */}
          <Card className="p-6 bg-secondary/30 border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-headline font-semibold text-primary">Summary</h3>
                <div className="flex items-center gap-2">
                  <Select value={selectedLanguage} onValueChange={handleTranslate}>
                    <SelectTrigger className="w-40">
                      <Languages className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Translate" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative">
                {isTranslating && (
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-md flex items-center justify-center">
                    <div className="text-sm text-muted-foreground">Translating...</div>
                  </div>
                )}
                <p className="text-foreground leading-relaxed font-body">
                  {translatedSummary}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read Full
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticlePanel;
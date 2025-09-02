'use client';

import { Article } from '@/types/article';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, MapPin, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case '5': return 'destructive';
      case '4': return 'default';
      case '3': return 'secondary';
      case '2': return 'outline';
      case '1': return 'outline';
      default: return 'outline';
    }
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'CZ': return 'bg-blue-100 text-blue-800';
      case 'SK': return 'bg-green-100 text-green-800';
      case 'EU': return 'bg-purple-100 text-purple-800';
      case 'US': return 'bg-red-100 text-red-800';
      case 'World': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true, 
        locale: cs 
      });
    } catch {
      return 'Neznámý čas';
    }
  };

  const getSourceFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return article.source_name || 'Neznámý zdroj';
    }
  };

  const tags = article.tagy ? article.tagy.split(',').slice(0, 3) : [];

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            {article.doporuceny_nadpis || 'Bez nadpisu'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="shrink-0"
          >
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>{formatTimeAgo(article.timestamp)}</span>
          <MapPin className="h-3 w-3 ml-2" />
          <span>{article.region}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">
          {article.shrnuti}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge variant={getImportanceColor(article.dulezitost)}>
              <Star className="h-3 w-3 mr-1" />
              {article.dulezitost}
            </Badge>
            <Badge className={getRegionColor(article.region)}>
              {article.region}
            </Badge>
          </div>
          <Badge variant="outline">
            {article.tema}
          </Badge>
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="mt-2 text-xs text-muted-foreground">
          Zdroj: {getSourceFromUrl(article.url)}
        </div>
      </CardContent>
    </Card>
  );
}

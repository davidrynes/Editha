'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cs } from 'date-fns/locale';

interface HighPriorityTickerProps {
  articles: Article[];
}

export function HighPriorityTicker({ articles }: HighPriorityTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Filter articles with importance 5
  const highPriorityArticles = articles.filter(article => 
    parseInt(article.dulezitost) === 5
  );

  useEffect(() => {
    if (highPriorityArticles.length <= 1) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out, change content and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % highPriorityArticles.length
        );
        setIsVisible(true);
      }, 300); // Half of transition duration
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [highPriorityArticles.length]);

  if (highPriorityArticles.length === 0) {
    return null;
  }

  const currentArticle = highPriorityArticles[currentIndex];

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
      return currentArticle.source_name || 'Neznámý zdroj';
    }
  };

  return (
    <Card className="border-red-200 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div 
              className={`transition-opacity duration-600 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 h-6">
                <h3 className="font-semibold text-red-900 truncate">
                  {currentArticle.doporuceny_nadpis || 'Bez nadpisu'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="shrink-0 h-6 w-6 p-0"
                >
                  <a 
                    href={currentArticle.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
              
              <div className="h-10 mb-2">
                <p className="text-sm text-red-800 line-clamp-2">
                  {currentArticle.shrnuti}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-red-700 h-4">
                <span>{formatTimeAgo(currentArticle.timestamp)}</span>
                <span>•</span>
                <span>{currentArticle.region}</span>
                <span>•</span>
                <span>{getSourceFromUrl(currentArticle.url)}</span>
              </div>
            </div>
          </div>
          
          {highPriorityArticles.length > 1 && (
            <div className="flex items-center gap-1">
              {highPriorityArticles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-red-600' : 'bg-red-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

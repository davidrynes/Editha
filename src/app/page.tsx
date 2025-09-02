'use client';

import { useState, useEffect } from 'react';
import { Article } from '@/types/article';
import { fetchArticles, filterArticles } from '@/lib/data';
import { ArticleCard } from '@/components/ArticleCard';
import { Filters } from '@/components/Filters';
import { HighPriorityTicker } from '@/components/HighPriorityTicker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Download } from 'lucide-react';

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchArticles();
      setArticles(data);
      setFilteredArticles(data);
    } catch (err) {
      setError('Nepodařilo se načíst články');
      console.error('Error loading articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleFiltersChange = (filters: {
    region?: string;
    tema?: string;
    dulezitost?: string;
  }) => {
    const filtered = filterArticles(articles, filters);
    setFilteredArticles(filtered);
  };

  const exportToCSV = () => {
    const csvContent = [
      // Header
      ['Nadpis', 'Shrnutí', 'Region', 'Téma', 'Důležitost', 'Tagy', 'Zdroj', 'URL', 'Čas'].join(','),
      // Data
      ...filteredArticles.map(article => [
        `"${article.doporuceny_nadpis || ''}"`,
        `"${article.shrnuti || ''}"`,
        `"${article.region || ''}"`,
        `"${article.tema || ''}"`,
        `"${article.dulezitost || ''}"`,
        `"${article.tagy || ''}"`,
        `"${article.source_name || ''}"`,
        `"${article.url || ''}"`,
        `"${article.timestamp || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `clanky_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Načítám články...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadArticles}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Zkusit znovu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard redaktorů</h1>
              <p className="text-muted-foreground">
                Přehled klasifikovaných článků z RSS zdrojů
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadArticles}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Obnovit
              </Button>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {filteredArticles.length} z {articles.length} článků
            </Badge>
            <Badge variant="outline">
              Poslední aktualizace: {new Date().toLocaleString('cs-CZ')}
            </Badge>
          </div>
        </div>

        {/* High Priority Ticker */}
        <div className="mb-8">
          <HighPriorityTicker articles={filteredArticles} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Filters articles={articles} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Articles Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Články</h2>
          {filteredArticles.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Žádné články neodpovídají zadaným filtrům.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id_hash} article={article} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Article } from '@/types/article';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';

interface FiltersProps {
  articles: Article[];
  onFiltersChange: (filters: {
    region?: string;
    tema?: string;
    dulezitost?: string;
  }) => void;
}

export function Filters({ articles, onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    region: 'all',
    tema: 'all',
    dulezitost: 'all'
  });

  const regions = Array.from(new Set(articles.map(a => a.region).filter(Boolean))).sort();
  const temata = Array.from(new Set(articles.map(a => a.tema).filter(Boolean))).sort();
  const dulezitosti = Array.from(new Set(articles.map(a => a.dulezitost).filter(Boolean))).sort();

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Convert 'all' to undefined for filtering
    const filterValues = {
      region: newFilters.region === 'all' ? undefined : newFilters.region,
      tema: newFilters.tema === 'all' ? undefined : newFilters.tema,
      dulezitost: newFilters.dulezitost === 'all' ? undefined : newFilters.dulezitost
    };
    
    onFiltersChange(filterValues);
  };

  const clearFilters = () => {
    const clearedFilters = { region: 'all', tema: 'all', dulezitost: 'all' };
    setFilters(clearedFilters);
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filtry
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Všechny regiony" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny regiony</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Téma</label>
            <Select value={filters.tema} onValueChange={(value) => handleFilterChange('tema', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Všechna témata" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechna témata</SelectItem>
                {temata.map(tema => (
                  <SelectItem key={tema} value={tema}>{tema}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Důležitost</label>
            <Select value={filters.dulezitost} onValueChange={(value) => handleFilterChange('dulezitost', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Všechny úrovně" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Všechny úrovně</SelectItem>
                {dulezitosti.map(dulezitost => (
                  <SelectItem key={dulezitost} value={dulezitost}>
                    {dulezitost} {Array.from({length: parseInt(dulezitost)}, () => '★').join('')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="w-full"
          >
            <X className="h-4 w-4 mr-2" />
            Vymazat filtry
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

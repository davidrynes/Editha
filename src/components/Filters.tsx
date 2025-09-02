'use client';

import { useState } from 'react';
import { Article } from '@/types/article';
import { Button } from '@/components/ui/button';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

interface FiltersProps {
  articles: Article[];
  onFiltersChange: (filters: {
    region?: string;
    temata?: string[];
    dulezitost?: string;
  }) => void;
}

export function Filters({ articles, onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState({
    region: 'all',
    temata: [] as string[],
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
      temata: newFilters.temata.length === 0 ? undefined : newFilters.temata,
      dulezitost: newFilters.dulezitost === 'all' ? undefined : newFilters.dulezitost
    };
    
    onFiltersChange(filterValues);
  };

  const handleTemaChange = (tema: string, checked: boolean) => {
    const newTemata = checked 
      ? [...filters.temata, tema]
      : filters.temata.filter(t => t !== tema);
    
    const newFilters = { ...filters, temata: newTemata };
    setFilters(newFilters);
    
    const filterValues = {
      region: newFilters.region === 'all' ? undefined : newFilters.region,
      temata: newTemata.length === 0 ? undefined : newTemata,
      dulezitost: newFilters.dulezitost === 'all' ? undefined : newFilters.dulezitost
    };
    
    onFiltersChange(filterValues);
  };

  const clearFilters = () => {
    const clearedFilters = { region: 'all', temata: [], dulezitost: 'all' };
    setFilters(clearedFilters);
    onFiltersChange({});
  };

  const hasActiveFilters = filters.region !== 'all' || filters.temata.length > 0 || filters.dulezitost !== 'all';

  return (
    <Card>
      <CardContent className="p-6 space-y-4">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <label className="text-sm font-medium mb-2 block">Témata</label>
            <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-3">
              {temata.map(tema => (
                <div key={tema} className="flex items-center space-x-2">
                  <Checkbox
                    id={tema}
                    checked={filters.temata.includes(tema)}
                    onCheckedChange={(checked) => handleTemaChange(tema, checked as boolean)}
                  />
                  <label
                    htmlFor={tema}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {tema}
                  </label>
                </div>
              ))}
            </div>
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

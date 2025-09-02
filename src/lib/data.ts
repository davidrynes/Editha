import Papa from 'papaparse';
import { Article } from '@/types/article';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_l17m8vJHRh6tpFR6DsOa57riI_Os0P-jxG0kOsXfwe0GIVL6gmezhK8nM2ZOYzURii97ogE3mXM6/pub?gid=1296308681&single=true&output=csv';

export async function fetchArticles(): Promise<Article[]> {
  try {
    const response = await fetch(CSV_URL, { 
      next: { revalidate: 300 } // Cache for 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const articles = results.data as Article[];
          // Sort by importance (5-1) then by timestamp descending
          const sortedArticles = articles.sort((a, b) => {
            const importanceA = parseInt(a.dulezitost) || 0;
            const importanceB = parseInt(b.dulezitost) || 0;
            
            // First sort by importance (descending)
            if (importanceA !== importanceB) {
              return importanceB - importanceA;
            }
            
            // Then by timestamp (newest first)
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
          resolve(sortedArticles);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export function getUniqueValues(articles: Article[], field: keyof Article): string[] {
  const values = articles.map(article => article[field]).filter(Boolean);
  return Array.from(new Set(values)).sort();
}

export function filterArticles(articles: Article[], filters: {
  region?: string;
  tema?: string;
  dulezitost?: string;
}): Article[] {
  return articles.filter(article => {
    // Filter out duplicate articles
    if (article.tema === 'Duplicitni' || article.doporuceny_nadpis === 'Duplicitní zpráva') {
      return false;
    }
    
    if (filters.region && article.region !== filters.region) return false;
    if (filters.tema && article.tema !== filters.tema) return false;
    if (filters.dulezitost && article.dulezitost !== filters.dulezitost) return false;
    
    return true;
  });
}

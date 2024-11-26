import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthenticatedLayout from './Layouts/AuthenticatedLayout';

const Games = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    platform: 'all',
    genre: 'all',
    search: ''
  });

  const genres = [
    'All', 'MMORPG', 'Shooter', 'Strategy', 'Action', 'Racing', 'Sports', 'MMO',
    'Survival', 'Card Game', 'Battle Royale', 'MOBA'
  ];

  const platforms = ['All', 'PC (Windows)', 'Web Browser'];

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch games');
      
      const data = await response.json();
      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGames = games.filter(game => {
    const matchesPlatform = filter.platform === 'all' || game.platform === filter.platform;
    const matchesGenre = filter.genre === 'all' || game.genre.toLowerCase() === filter.genre.toLowerCase();
    const matchesSearch = game.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         game.short_description.toLowerCase().includes(filter.search.toLowerCase());
    
    return matchesPlatform && matchesGenre && matchesSearch;
  });

  if (isLoading) {
    return (
      <AuthenticatedLayout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (error) {
    return (
      <AuthenticatedLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Error Loading Games</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <Button onClick={fetchGames}>Try Again</Button>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Free Games</h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search games..."
                value={filter.search}
                onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
                className="w-full"
              />
            </div>
            <Select
              value={filter.platform}
              onValueChange={(value) => setFilter(prev => ({ ...prev, platform: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform.toLowerCase()} value={platform.toLowerCase()}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filter.genre}
              onValueChange={(value) => setFilter(prev => ({ ...prev, genre: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.toLowerCase()} value={genre.toLowerCase()}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-1">{game.title}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {game.genre}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {game.short_description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      {game.platform}
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => window.open(game.game_url, '_blank')}
                    >
                      Play Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Games Found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Games;
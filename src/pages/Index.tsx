import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

interface CardItem {
  id: number;
  name: string;
  rarity: Rarity;
  value: number;
  image: string;
  owned: boolean;
  category: string;
}

const mockCards: CardItem[] = [
  { id: 1, name: 'Огненный дракон', rarity: 'legendary', value: 15000, image: '🐉', owned: true, category: 'Мифические существа' },
  { id: 2, name: 'Ледяной маг', rarity: 'epic', value: 7500, image: '🧙‍♂️', owned: true, category: 'Маги' },
  { id: 3, name: 'Эльфийский лучник', rarity: 'rare', value: 3200, image: '🏹', owned: false, category: 'Воины' },
  { id: 4, name: 'Гоблин-разведчик', rarity: 'common', value: 850, image: '👺', owned: true, category: 'Существа' },
  { id: 5, name: 'Феникс', rarity: 'legendary', value: 18000, image: '🔥', owned: false, category: 'Мифические существа' },
  { id: 6, name: 'Небесный рыцарь', rarity: 'epic', value: 6800, image: '⚔️', owned: true, category: 'Воины' },
  { id: 7, name: 'Лесной страж', rarity: 'rare', value: 4100, image: '🌲', owned: false, category: 'Защитники' },
  { id: 8, name: 'Горный тролль', rarity: 'common', value: 920, image: '👹', owned: true, category: 'Существа' },
  { id: 9, name: 'Древний артефакт', rarity: 'legendary', value: 22000, image: '💎', owned: false, category: 'Артефакты' },
  { id: 10, name: 'Морской страж', rarity: 'rare', value: 3850, image: '🌊', owned: true, category: 'Защитники' },
  { id: 11, name: 'Гномий кузнец', rarity: 'common', value: 780, image: '⚒️', owned: false, category: 'Ремесленники' },
  { id: 12, name: 'Темный некромант', rarity: 'epic', value: 8200, image: '💀', owned: false, category: 'Маги' },
];

const rarityConfig = {
  common: { label: 'Обычная', gradient: 'gradient-common', color: 'rarity-common' },
  rare: { label: 'Редкая', gradient: 'gradient-rare', color: 'rarity-rare' },
  epic: { label: 'Эпическая', gradient: 'gradient-epic', color: 'rarity-epic' },
  legendary: { label: 'Легендарная', gradient: 'gradient-legendary', color: 'rarity-legendary' },
};

const Index = () => {
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');
  const [activeTab, setActiveTab] = useState('catalog');

  const filteredCards = selectedRarity === 'all' 
    ? mockCards 
    : mockCards.filter(card => card.rarity === selectedRarity);

  const ownedCards = mockCards.filter(card => card.owned);
  const totalValue = ownedCards.reduce((sum, card) => sum + card.value, 0);
  const collectionProgress = (ownedCards.length / mockCards.length) * 100;

  const rarityStats = {
    common: mockCards.filter(c => c.rarity === 'common' && c.owned).length,
    rare: mockCards.filter(c => c.rarity === 'rare' && c.owned).length,
    epic: mockCards.filter(c => c.rarity === 'epic' && c.owned).length,
    legendary: mockCards.filter(c => c.rarity === 'legendary' && c.owned).length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎴</div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">CardVault</h1>
                <p className="text-sm text-muted-foreground">Платформа коллекционера</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Общая стоимость</p>
                <p className="text-xl font-bold text-accent">{totalValue.toLocaleString()} ₽</p>
              </div>
              <Button variant="default" className="gap-2">
                <Icon name="User" size={18} />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="catalog" className="gap-2">
              <Icon name="Library" size={16} />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="collection" className="gap-2">
              <Icon name="Sparkles" size={16} />
              Коллекция
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2">
              <Icon name="BarChart3" size={16} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="animate-fade-in">
            <div className="mb-6 flex gap-2 flex-wrap">
              <Button 
                variant={selectedRarity === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedRarity('all')}
              >
                Все карты
              </Button>
              {Object.entries(rarityConfig).map(([rarity, config]) => (
                <Button
                  key={rarity}
                  variant={selectedRarity === rarity ? 'default' : 'outline'}
                  onClick={() => setSelectedRarity(rarity as Rarity)}
                  className="gap-2"
                >
                  {config.label}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.map((card) => (
                <Card 
                  key={card.id} 
                  className={`${rarityConfig[card.rarity].gradient} border-0 overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer ${!card.owned && 'opacity-60'}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className="bg-black/30 text-white border-0">
                        {rarityConfig[card.rarity].label}
                      </Badge>
                      {card.owned && (
                        <Icon name="Check" size={20} className="text-white" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-3">
                      <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {card.image}
                      </div>
                      <CardTitle className="text-white text-lg mb-1">{card.name}</CardTitle>
                      <p className="text-white/80 text-sm">{card.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/20">
                      <span className="text-white/90 text-sm">Стоимость</span>
                      <span className="text-white font-bold">{card.value.toLocaleString()} ₽</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collection" className="animate-fade-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-accent" />
                  Прогресс коллекции
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Собрано карт</span>
                      <span className="font-bold">{ownedCards.length} / {mockCards.length}</span>
                    </div>
                    <Progress value={collectionProgress} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {Object.entries(rarityConfig).map(([rarity, config]) => (
                      <div key={rarity} className={`${config.gradient} rounded-lg p-4 text-white`}>
                        <p className="text-sm opacity-90 mb-1">{config.label}</p>
                        <p className="text-2xl font-bold">{rarityStats[rarity as Rarity]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ownedCards.map((card) => (
                <Card 
                  key={card.id} 
                  className={`${rarityConfig[card.rarity].gradient} border-0 overflow-hidden group hover:scale-105 transition-all duration-300`}
                >
                  <CardHeader className="pb-3">
                    <Badge variant="secondary" className="bg-black/30 text-white border-0 w-fit">
                      {rarityConfig[card.rarity].label}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-3">
                      <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {card.image}
                      </div>
                      <CardTitle className="text-white text-lg mb-1">{card.name}</CardTitle>
                      <p className="text-white/80 text-sm">{card.category}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/20">
                      <span className="text-white/90 text-sm">Стоимость</span>
                      <span className="text-white font-bold">{card.value.toLocaleString()} ₽</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Wallet" size={24} className="text-primary" />
                    Общая стоимость
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary">{totalValue.toLocaleString()} ₽</p>
                  <p className="text-muted-foreground mt-2">из {mockCards.reduce((sum, c) => sum + c.value, 0).toLocaleString()} ₽ возможных</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/20 to-accent/10 border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Star" size={24} className="text-accent" />
                    Редкие карты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">{rarityStats.legendary + rarityStats.epic}</p>
                  <p className="text-muted-foreground mt-2">Эпических и легендарных</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-rarity-rare/20 to-rarity-epic/20 border-rarity-rare/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} className="text-rarity-rare" />
                    Прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-rarity-rare">{Math.round(collectionProgress)}%</p>
                  <p className="text-muted-foreground mt-2">Коллекция завершена</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Распределение по редкости</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(rarityConfig).map(([rarity, config]) => {
                    const total = mockCards.filter(c => c.rarity === rarity).length;
                    const owned = rarityStats[rarity as Rarity];
                    const percentage = (owned / total) * 100;
                    
                    return (
                      <div key={rarity}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{config.label}</span>
                          <span className="text-muted-foreground">{owned} / {total}</span>
                        </div>
                        <Progress value={percentage} className={`h-2 ${config.gradient}`} />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

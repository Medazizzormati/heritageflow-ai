import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { MapPin, ArrowLeft, Filter } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Explore() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { data: sites, isLoading } = trpc.sites.list.useQuery();

  const categories = ["all", "archaeology", "museum", "monument", "historical"];

  const filteredSites = sites?.filter(
    (site: any) => selectedCategory === "all" || site.category === selectedCategory
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold">Explorer les Sites</h1>
          </div>
          <Button
            onClick={() => setLocation("/recommendations")}
            className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600"
          >
            Obtenir des Recommandations
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold">Filtrer par catégorie:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-cyan-500 to-amber-500"
                    : "border-slate-600 text-slate-300 hover:border-cyan-400"
                }
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sites Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Chargement des sites...</p>
          </div>
        ) : filteredSites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">Aucun site trouvé dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site: any) => (
              <div
                key={site.id}
                className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden hover:border-cyan-400 transition-colors"
              >
                <div className="bg-gradient-to-r from-cyan-500/20 to-amber-500/20 h-40 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-cyan-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{site.name}</h3>
                  <p className="text-slate-400 mb-4 line-clamp-2">{site.description}</p>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Catégorie:</span>
                      <span className="text-cyan-400">{site.category || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Période:</span>
                      <span className="text-amber-400">{site.historicalPeriod || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fréquentation:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-red-500"
                            style={{ width: `${site.currentCrowdLevel || 0}%` }}
                          ></div>
                        </div>
                        <span>{site.currentCrowdLevel || 0}%</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                    onClick={() => setLocation(`/site/${site.id}`)}
                  >
                    Voir Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

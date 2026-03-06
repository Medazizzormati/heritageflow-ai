import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation, useRoute } from "wouter";
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useRef, useState } from "react";
import { MapView } from "@/components/Map";
import { showToast } from "@/components/Toast";

export default function SiteDetail() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isDetailPage, params] = useRoute("/site/:id");
  const siteId = params?.id ? parseInt(params.id) : null;
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);

  const { data: site, isLoading } = trpc.sites.getById.useQuery(
    { id: siteId || 0 },
    { enabled: !!siteId }
  );

  const addToItinerary = trpc.itineraries.create.useMutation({
    onSuccess: () => {
      showToast("Site ajouté à votre itinéraire!", "success", 2000);
    },
    onError: (error) => {
      showToast("Erreur: " + error.message, "error", 3000);
    },
  });

  const handleAddToItinerary = () => {
    if (!user || !site) return;
    addToItinerary.mutate({
      name: `Visite de ${site.name}`,
      description: site.description || "",
      siteIds: [site.id || 0],
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-400">Chargement des détails du site...</p>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Site non trouvé</p>
          <Button onClick={() => setLocation("/explore")} className="bg-cyan-500 hover:bg-cyan-600">
            Retour à l'exploration
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/explore")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold">{site.name}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Map */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-amber-500/20 rounded-lg h-96 mb-8 border border-slate-700 overflow-hidden">
          <MapView
            onMapReady={(map) => {
              setMapReady(true);
              if (site?.latitude && site?.longitude) {
                const lat = parseFloat(site.latitude);
                const lng = parseFloat(site.longitude);
                map.setCenter({ lat, lng });
                map.setZoom(15);
                if (window.google?.maps?.Marker) {
                  new window.google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: site.name,
                  });
                }
              }
            }}
          />
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Description */}
          <div className="md:col-span-2">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">À Propos</h2>
              <p className="text-slate-300 leading-relaxed mb-6">{site.description}</p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Catégorie</h3>
                  <p className="text-lg text-cyan-400">{site.category || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Période Historique</h3>
                  <p className="text-lg text-amber-400">{site.historicalPeriod || "N/A"}</p>
                </div>
              </div>

              {site.accessibilityInfo && (
                <div className="bg-slate-700/50 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">Accessibilité</h3>
                  <p className="text-slate-300">{site.accessibilityInfo}</p>
                </div>
              )}
            </div>

            {/* Visitor Reviews */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Avis des Visiteurs</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-slate-700 pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400">Visiteur {i}</span>
                    </div>
                    <p className="text-slate-300">Expérience exceptionnelle! Un site incontournable.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-amber-500/10 border border-cyan-500/30 rounded-lg p-8 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Informations Pratiques</h3>

              {site.openingHours && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold">Horaires</span>
                  </div>
                  <p className="text-slate-300 ml-8">{site.openingHours}</p>
                </div>
              )}

              {site.entryFee && (
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold">Tarif d'entrée</span>
                  </div>
                  <p className="text-slate-300 ml-8">{site.entryFee}</p>
                </div>
              )}

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <span className="font-semibold">Fréquentation</span>
                </div>
                <div className="ml-8">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-red-500"
                        style={{ width: `${site.currentCrowdLevel || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{site.currentCrowdLevel || 0}%</span>
                  </div>
                  <p className="text-xs text-slate-400">Capacité: {site.maxCapacity} visiteurs</p>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600"
                  onClick={handleAddToItinerary}
                  disabled={!user || addToItinerary.isPending}
                >
                  {addToItinerary.isPending ? "Ajout en cours..." : "Ajouter à mon Itinéraire"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:border-cyan-400"
                  onClick={() => setLocation("/explore")}
                >
                  Voir d'autres sites
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

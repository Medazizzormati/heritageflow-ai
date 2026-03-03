import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Award, MapPin, Leaf, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

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
            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          </div>
          <Button
            onClick={() => setLocation("/")}
            className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* User Profile */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Profil Utilisateur</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-400 mb-2">Nom</p>
              <p className="text-2xl font-bold">{user?.name || "Utilisateur"}</p>
            </div>
            <div>
              <p className="text-slate-400 mb-2">Email</p>
              <p className="text-2xl font-bold">{user?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Visites</span>
              <MapPin className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Badges</span>
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-3xl font-bold">0</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Durabilité</span>
              <Leaf className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-3xl font-bold">75%</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400">Distance</span>
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold">0 km</p>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Vos Badges</h2>
          {false ? (
            <div className="grid md:grid-cols-3 gap-4">
              {[].map((badge: any) => (
                <div
                  key={badge.id}
                  className="bg-slate-700/50 rounded-lg p-4 text-center border border-amber-400/30"
                >
                  <Award className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                  <p className="font-bold">{badge.badgeName}</p>
                  <p className="text-sm text-slate-400 mt-2">{badge.badgeDescription}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400">Aucun badge encore. Commencez à explorer!</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            onClick={() => setLocation("/explore")}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 py-6 text-lg"
          >
            Explorer les Sites
          </Button>
          <Button
            onClick={() => setLocation("/recommendations")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 py-6 text-lg"
          >
            Obtenir des Recommandations
          </Button>
        </div>
      </div>
    </div>
  );
}

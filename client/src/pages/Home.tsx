import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { MapPin, Sparkles, Users, Leaf, Globe, Zap } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              HeritageFlow AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
            <Button
              variant="ghost"
              onClick={() => setLocation("/explore")}
              className="text-white hover:text-cyan-400"
            >
              Explorer
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation("/presentation")}
              className="text-white hover:text-cyan-400"
            >
              Présentation 3D
            </Button>
                <span className="text-sm text-slate-400">{user?.name}</span>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white">
                  Connexion
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Explorez le Patrimoine Culturel de Manière Intelligente et Durable
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                HeritageFlow AI combine l'intelligence artificielle, la cartographie interactive et la gestion des flux touristiques pour transformer votre expérience de découverte culturelle.
              </p>
              <div className="flex gap-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      onClick={() => setLocation("/recommendations")}
                      className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-3 text-lg"
                    >
                      Obtenir des Recommandations
                    </Button>
                    <Button
                      onClick={() => setLocation("/explore")}
                      variant="outline"
                      className="border-amber-400 text-amber-400 hover:bg-amber-400/10 px-8 py-3 text-lg"
                    >
                      Explorer les Sites
                    </Button>
                  </>
                ) : (
                  <a href={getLoginUrl()}>
                    <Button className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white px-8 py-3 text-lg">
                      Commencer Maintenant
                    </Button>
                  </a>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 rounded-lg blur-3xl"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg">Recommandations Personnalisées par IA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-amber-400" />
                    <span className="text-lg">Cartographie Interactive Enrichie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg">Gestion des Flux en Temps Réel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-amber-400" />
                    <span className="text-lg">Tourisme Durable et Responsable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Fonctionnalités Principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Recommandations Intelligentes",
                description: "Obtenez des itinéraires personnalisés basés sur vos intérêts, budget et durée de visite.",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Cartographie Interactive",
                description: "Explorez les sites patrimoniaux avec informations complètes et fréquentation en temps réel.",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Assistant IA 24/7",
                description: "Chatbot multilingue pour répondre à vos questions sur le patrimoine et les recommandations.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Gestion des Flux",
                description: "Tableau de bord pour gestionnaires avec prédictions et alertes de surcharge.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Tourisme Durable",
                description: "Badges et gamification pour encourager le tourisme responsable et la préservation.",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Reconstruction Virtuelle",
                description: "Visualisez les monuments dans leur état original grâce à la technologie IA.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à Transformer Votre Expérience Touristique?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des milliers de visiteurs qui découvrent le patrimoine culturel de manière intelligente et durable.
          </p>
          {isAuthenticated ? (
            <Button
              onClick={() => setLocation("/recommendations")}
              className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white px-8 py-3 text-lg"
            >
              Commencer l'Exploration
            </Button>
          ) : (
            <a href={getLoginUrl()}>
              <Button className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white px-8 py-3 text-lg">
                Se Connecter Maintenant
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2026 HeritageFlow AI. Transforming Cultural Tourism. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

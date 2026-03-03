import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { MapPin, Sparkles, Users, Leaf, Globe, Zap, LogOut, Github, Play, FileText } from "lucide-react";
import { trpc } from "@/lib/trpc";

function LogoutButton() {
  const logoutMutation = trpc.auth.logout.useMutation();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-slate-400 hover:text-red-400"
      disabled={logoutMutation.isPending}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Deconnexion
    </Button>
  );
}

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
              Presentation 3D
            </Button>
            <a href="https://github.com/Medazizzormati/heritageflow-ai" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                className="text-white hover:text-cyan-400"
                title="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </Button>
            </a>
                <span className="text-sm text-slate-400">{user?.name}</span>
                <LogoutButton />
              </>
            ) : (
              <>
              <a href="https://github.com/Medazizzormati/heritageflow-ai" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  className="text-white hover:text-cyan-400"
                  title="GitHub Repository"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </a>
              <a href={getLoginUrl()}>
                <Button className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white">
                  Connexion
                </Button>
              </a>
              </>
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
                Explorez le Patrimoine Culturel de Maniere Intelligente et Durable
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                HeritageFlow AI combine l'intelligence artificielle, la cartographie interactive et la gestion des flux touristiques pour transformer votre experience de decouverte culturelle.
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
                    <span className="text-lg">Recommandations Personnalisees par IA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-amber-400" />
                    <span className="text-lg">Cartographie Interactive Enrichie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-cyan-400" />
                    <span className="text-lg">Gestion des Flux en Temps Reel</span>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Fonctionnalites Principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Recommandations Intelligentes",
                description: "Obtenez des itineraires personnalises bases sur vos interets, budget et duree de visite.",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Cartographie Interactive",
                description: "Explorez les sites patrimoniaux avec informations completes et frequentation en temps reel.",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Assistant IA 24/7",
                description: "Chatbot multilingue pour repondre a vos questions sur le patrimoine et les recommandations.",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Gestion des Flux",
                description: "Tableau de bord pour gestionnaires avec predictions et alertes de surcharge.",
              },
              {
                icon: <Leaf className="w-8 h-8" />,
                title: "Tourisme Durable",
                description: "Badges et gamification pour encourager le tourisme responsable et la preservation.",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Reconstruction Virtuelle",
                description: "Visualisez les monuments dans leur etat original grace a la technologie IA.",
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

      {/* Presentation & Video Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Decouvrez HeritageFlow AI</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Presentation */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-cyan-400 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold">Presentation Professionnelle</h3>
              </div>
              <p className="text-slate-400 mb-6">Consultez notre presentation complete avec 15 slides detaillant la vision, l'architecture et l'impact de HeritageFlow AI.</p>
              <a href="https://manus.im/share/file/82b34837-43fb-45df-8a99-0ed8d8b537e1" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Voir la Presentation
                </Button>
              </a>
            </div>

            {/* Video Demo */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Play className="w-8 h-8 text-amber-400" />
                <h3 className="text-2xl font-bold">Demo Video</h3>
              </div>
              <p className="text-slate-400 mb-6">Regardez une demonstration complete de l'application avec toutes les fonctionnalites en action.</p>
              <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 w-full" disabled>
                <Play className="w-4 h-4 mr-2" />
                Video en Preparation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pret a Transformer Votre Experience Touristique?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Rejoignez des milliers de visiteurs qui decouvrent le patrimoine culturel de maniere intelligente et durable.
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-slate-400">&copy; 2026 HeritageFlow AI. Transforming Cultural Tourism. All rights reserved.</p>
          <a href="https://github.com/Medazizzormati/heritageflow-ai" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  );
}

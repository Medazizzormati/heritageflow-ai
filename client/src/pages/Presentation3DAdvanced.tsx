import { useLocation } from "wouter";
import { ArrowLeft, Sparkles, MapPin, Users, Leaf, Globe, Zap, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Presentation3DAdvanced() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Recommandations IA",
      description: "Itinéraires personnalisés basés sur vos préférences",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: <MapPin className="w-12 h-12" />,
      title: "Cartographie Interactive",
      description: "Exploration en temps réel avec données live",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Gestion des Flux",
      description: "Dashboard pour gestionnaires de destinations",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Tourisme Durable",
      description: "Badges et gamification responsable",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Assistant IA 24/7",
      description: "Chatbot multilingue intelligent",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Reconstruction Virtuelle",
      description: "Visualisation 3D des monuments",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const stats = [
    { label: "Sites Patrimoniaux", value: "10+", icon: <MapPin className="w-8 h-8" /> },
    { label: "Utilisateurs Actifs", value: "1000+", icon: <Users className="w-8 h-8" /> },
    { label: "Score Durabilité", value: "95%", icon: <Award className="w-8 h-8" /> },
    { label: "Satisfaction", value: "4.8/5", icon: <TrendingUp className="w-8 h-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Présentation 3D - HeritageFlow AI
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero 3D */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-amber-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12 text-center">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-amber-400 to-purple-400 bg-clip-text text-transparent">
              Transformez le Tourisme Culturel
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              HeritageFlow AI combine l'intelligence artificielle, la cartographie interactive et la gestion durable des flux touristiques pour créer une expérience inoubliable.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-8 py-3">
                Découvrir Maintenant
              </Button>
              <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10 px-8 py-3">
                En Savoir Plus
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid 3D */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold mb-12 text-center">6 Piliers Technologiques</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 transform group-hover:scale-105">
                  <div className={`text-transparent bg-gradient-to-r ${feature.color} bg-clip-text mb-4`}>
                    {feature.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold mb-12 text-center">Impact & Résultats</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:border-cyan-400 transition-colors"
              >
                <div className="text-cyan-400 mb-4 flex justify-center">{stat.icon}</div>
                <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold mb-12 text-center">Architecture Technique</h3>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">Frontend</div>
                <p className="text-slate-400">React 19 + Tailwind 4 + TypeScript</p>
              </div>
              <div className="text-center border-l border-r border-slate-700">
                <div className="text-3xl font-bold text-amber-400 mb-2">Backend</div>
                <p className="text-slate-400">Express + tRPC + MySQL</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">IA</div>
                <p className="text-slate-400">Claude 3.5 Sonnet + Google Maps</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-6">Prêt à Révolutionner le Tourisme Culturel?</h3>
            <p className="text-lg text-slate-400 mb-8">Rejoignez la révolution du tourisme intelligent et durable.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-8 py-3 text-lg">
                Commencer Maintenant
              </Button>
              <Button variant="outline" className="border-amber-400 text-amber-400 hover:bg-amber-400/10 px-8 py-3 text-lg">
                Voir la Démo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          <p>&copy; 2026 HeritageFlow AI. Transforming Cultural Tourism. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

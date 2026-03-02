import React, { useEffect, useState } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Globe, Sparkles, Users, Leaf, Zap, MapPin, BarChart3, MessageCircle, Award } from "lucide-react";

export default function Presentation3D() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: "Recommandations IA Personnalisées",
      description: "Obtenez des itinéraires uniques basés sur vos intérêts, budget et durée de visite",
      color: "from-cyan-500 to-blue-500",
      details: ["Analyse des préférences", "Optimisation des trajets", "Suggestions culturelles"]
    },
    {
      icon: MapPin,
      title: "Cartographie Interactive Enrichie",
      description: "Explorez les sites patrimoniaux avec informations complètes et fréquentation en temps réel",
      color: "from-green-500 to-emerald-500",
      details: ["Localisation GPS", "Informations détaillées", "Fréquentation en direct"]
    },
    {
      icon: MessageCircle,
      title: "Assistant IA Multilingue 24/7",
      description: "Chatbot intelligent pour répondre à vos questions sur le patrimoine et les recommandations",
      color: "from-purple-500 to-pink-500",
      details: ["Support multilingue", "Réponses instantanées", "Contexte culturel"]
    },
    {
      icon: BarChart3,
      title: "Gestion des Flux en Temps Réel",
      description: "Tableau de bord pour gestionnaires avec prédictions et alertes de surcharge",
      color: "from-orange-500 to-red-500",
      details: ["Prédictions d'affluence", "Alertes en temps réel", "Analytics détaillées"]
    },
    {
      icon: Award,
      title: "Tourisme Durable & Gamification",
      description: "Badges et récompenses pour encourager le tourisme responsable et la préservation",
      color: "from-yellow-500 to-amber-500",
      details: ["Badges de durabilité", "Points de récompense", "Classements"]
    },
    {
      icon: Globe,
      title: "Reconstruction Virtuelle 3D",
      description: "Visualisez les monuments dans leur état original grâce à la technologie IA",
      color: "from-indigo-500 to-purple-500",
      details: ["Modèles 3D", "Historique visuel", "Expérience immersive"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-amber-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation("/")}>
            <Globe className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
              HeritageFlow AI
            </span>
          </div>
          <Button 
            onClick={() => setLocation("/")}
            className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600"
          >
            Retour
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
              HeritageFlow AI
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-light">
              Transformez votre expérience du patrimoine culturel
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            {isAuthenticated ? (
              <>
                <Button 
                  onClick={() => setLocation("/explore")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
                >
                  Commencer l'Exploration
                </Button>
                <Button 
                  onClick={() => setLocation("/recommendations")}
                  variant="outline"
                  className="border-amber-500 text-amber-400 hover:bg-amber-500/10 px-8 py-6 text-lg"
                >
                  Voir les Recommandations
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setLocation("/")}
                className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white px-8 py-6 text-lg"
              >
                Se Connecter pour Commencer
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid with 3D Effect */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 space-y-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-5xl font-bold">Nos Fonctionnalités Principales</h2>
          <p className="text-xl text-slate-400">Découvrez comment l'IA transforme le tourisme culturel</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl transform group-hover:scale-105 group-hover:rotate-y-5 transition-all duration-300 shadow-2xl" />
                
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative p-8 space-y-6 h-full">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-300">
                    {feature.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-amber-400" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { label: "Sites Patrimoniaux", value: "500+" },
            { label: "Utilisateurs Actifs", value: "10K+" },
            { label: "Itinéraires Générés", value: "50K+" },
            { label: "Satisfaction", value: "98%" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2 p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-bold">Stack Technologique</h2>
          <p className="text-xl text-slate-400">Construit avec les meilleures technologies</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Frontend", tech: ["React 19", "Tailwind CSS 4", "TypeScript"] },
            { title: "Backend", tech: ["tRPC", "Express.js", "Node.js"] },
            { title: "IA & Services", tech: ["Claude API", "Google Maps", "LLM Integration"] }
          ].map((stack, i) => (
            <div key={i} className="p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 space-y-4">
              <h3 className="text-2xl font-bold text-cyan-400">{stack.title}</h3>
              <ul className="space-y-2">
                {stack.tech.map((t, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300">
                    <Zap className="w-4 h-4 text-amber-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold">Prêt à Transformer Votre Expérience?</h2>
          <p className="text-xl text-slate-400">
            Rejoignez des milliers de visiteurs qui découvrent le patrimoine culturel de manière intelligente et durable
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <>
              <Button 
                onClick={() => setLocation("/explore")}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
              >
                Commencer Maintenant
              </Button>
              <Button 
                onClick={() => setLocation("/recommendations")}
                variant="outline"
                className="border-amber-500 text-amber-400 hover:bg-amber-500/10 px-8 py-6 text-lg"
              >
                Mes Recommandations
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setLocation("/")}
              className="bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white px-8 py-6 text-lg"
            >
              Se Connecter Maintenant
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-sm py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>© 2026 HeritageFlow AI - Transforming Cultural Tourism with AI</p>
          <p className="text-sm mt-2">AINC'26 - Défi Tourisme Innovant</p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse-custom {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-pulse {
          animation: pulse-custom 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

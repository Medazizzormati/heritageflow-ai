import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Sparkles, Clock, DollarSign } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";

export default function Recommendations() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("medium");
  const [duration, setDuration] = useState(4);
  const [recommendations, setRecommendations] = useState<any>(null);

  const generateMutation = trpc.recommendations.generate.useMutation();

  const interestOptions = [
    "Archaeology",
    "Art",
    "History",
    "Architecture",
    "Culture",
    "Nature",
  ];

  const handleGenerateRecommendations = async () => {
    const result = await generateMutation.mutateAsync({
      interests,
      budget,
      duration,
    });
    setRecommendations(result);
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
          <h1 className="text-3xl font-bold">Recommandations Personnalisées</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {!recommendations ? (
          <div className="space-y-8">
            {/* Interests Selection */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400" />
                Vos Intérêts Culturels
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interestOptions.map((interest) => (
                  <Button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    variant={
                      interests.includes(interest) ? "default" : "outline"
                    }
                    className={
                      interests.includes(interest)
                        ? "bg-gradient-to-r from-cyan-500 to-amber-500"
                        : "border-slate-600 text-slate-300 hover:border-cyan-400"
                    }
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            {/* Budget Selection */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-amber-400" />
                Votre Budget
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {["low", "medium", "high"].map((b) => (
                  <Button
                    key={b}
                    onClick={() => setBudget(b)}
                    variant={budget === b ? "default" : "outline"}
                    className={
                      budget === b
                        ? "bg-gradient-to-r from-cyan-500 to-amber-500"
                        : "border-slate-600 text-slate-300 hover:border-cyan-400"
                    }
                  >
                    {b === "low"
                      ? "Budget"
                      : b === "medium"
                        ? "Moyen"
                        : "Élevé"}
                  </Button>
                ))}
              </div>
            </div>

            {/* Duration Selection */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-cyan-400" />
                Durée de la Visite
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xl font-bold text-amber-400 min-w-24">
                  {duration} heure{duration > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateRecommendations}
              disabled={interests.length === 0 || generateMutation.isPending}
              className="w-full bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600 text-white py-6 text-lg font-bold"
            >
              {generateMutation.isPending
                ? "Génération en cours..."
                : "Générer mes Recommandations"}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Vos Recommandations</h2>
              <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                <p className="text-slate-300 whitespace-pre-wrap">
                  {recommendations.recommendations}
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setRecommendations(null)}
                  variant="outline"
                  className="flex-1 border-slate-600 text-slate-300 hover:border-cyan-400"
                >
                  Modifier les Critères
                </Button>
                <Button
                  onClick={() => setLocation("/explore")}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-amber-500 hover:from-cyan-600 hover:to-amber-600"
                >
                  Explorer les Sites
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

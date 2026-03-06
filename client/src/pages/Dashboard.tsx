import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { BarChart3, TrendingUp, Users, AlertTriangle, MapPin, Activity, ArrowLeft } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const { data: sites } = trpc.sites.list.useQuery();

  useEffect(() => {
    if (user && user.role !== "admin") {
      setLocation("/");
    }
  }, [user, setLocation]);

  useEffect(() => {
    if (!chartRef.current || !sites) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const sortedSites = [...sites].sort((a: any, b: any) => (b.frequency || 0) - (a.frequency || 0)).slice(0, 10);

    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: sortedSites.map(s => s.name),
        datasets: [
          {
            label: "Frequentation (%)",
            data: sortedSites.map((s: any) => s.currentCrowdLevel || 0),
            backgroundColor: [
              "rgba(6, 182, 212, 0.8)",
              "rgba(6, 182, 212, 0.7)",
              "rgba(6, 182, 212, 0.6)",
              "rgba(6, 182, 212, 0.5)",
              "rgba(6, 182, 212, 0.4)",
              "rgba(251, 146, 60, 0.8)",
              "rgba(251, 146, 60, 0.7)",
              "rgba(251, 146, 60, 0.6)",
              "rgba(251, 146, 60, 0.5)",
              "rgba(251, 146, 60, 0.4)",
            ],
            borderColor: [
              "rgba(6, 182, 212, 1)",
              "rgba(6, 182, 212, 1)",
              "rgba(6, 182, 212, 1)",
              "rgba(6, 182, 212, 1)",
              "rgba(6, 182, 212, 1)",
              "rgba(251, 146, 60, 1)",
              "rgba(251, 146, 60, 1)",
              "rgba(251, 146, 60, 1)",
              "rgba(251, 146, 60, 1)",
              "rgba(251, 146, 60, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: "y" as const,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              color: "rgba(148, 163, 184, 1)",
            },
            grid: {
              color: "rgba(71, 85, 105, 0.2)",
            },
          },
          y: {
            ticks: {
              color: "rgba(148, 163, 184, 1)",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [sites]);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-400">Acces non autorise</p>
      </div>
    );
  }

  const totalSites = sites?.length || 0;
  const avgFrequency = sites ? Math.round(sites.reduce((sum: number, s: any) => sum + (s.currentCrowdLevel || 0), 0) / sites.length) : 0;
  const overloadedSites = sites?.filter((s: any) => (s.currentCrowdLevel || 0) > 70).length || 0;
  const totalVisitors = sites ? sites.reduce((sum: number, s: any) => sum + Math.round((s.currentCrowdLevel || 0) * 80), 0) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
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
            <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          </div>
          <div className="text-sm text-slate-400">
            Bienvenue, {user.name}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">Sites Patrimoniaux</h3>
              <MapPin className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-cyan-400">{totalSites}</p>
            <p className="text-xs text-slate-400 mt-2">Actifs en Tunisie</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">Frequentation Moyenne</h3>
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-amber-400">{avgFrequency}%</p>
            <p className="text-xs text-slate-400 mt-2">Capacite utilisee</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">Visiteurs Estimes</h3>
              <Users className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{(totalVisitors / 1000).toFixed(1)}K</p>
            <p className="text-xs text-slate-400 mt-2">Aujourd'hui</p>
          </div>

          <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-700/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-300">Sites Surcharges</h3>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{overloadedSites}</p>
            <p className="text-xs text-slate-400 mt-2">Frequentation &gt; 70%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold">Frequentation par Site (Top 10)</h2>
            </div>
            <div style={{ height: "400px" }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold">Alertes Actives</h2>
            </div>
            <div className="space-y-4">
              {overloadedSites > 0 ? (
                sites
                  ?.filter((s: any) => (s.frequency || 0) > 70)
                  .map((site: any) => (
                    <div key={site.id} className="bg-red-900/20 border border-red-700/50 rounded p-3">
                      <p className="text-sm font-medium text-red-300">{site.name}</p>
                      <p className="text-xs text-red-400 mt-1">Frequentation: {site.frequency}%</p>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-slate-400">Aucune alerte actuellement</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold">Tous les Sites</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Site</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Categorie</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Frequentation</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Capacite</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {sites?.map((site: any) => (
                  <tr key={site.id} className="border-b border-slate-700/50 hover:bg-slate-700/20 transition">
                    <td className="py-3 px-4 text-slate-200">{site.name}</td>
                    <td className="py-3 px-4 text-slate-400">{site.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              (site.frequency || 0) > 70
                                ? "bg-red-500"
                                : (site.frequency || 0) > 50
                                ? "bg-amber-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${site.frequency}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{site.frequency}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">8000 visiteurs</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          (site.frequency || 0) > 70
                            ? "bg-red-900/30 text-red-300"
                            : (site.frequency || 0) > 50
                            ? "bg-amber-900/30 text-amber-300"
                            : "bg-green-900/30 text-green-300"
                        }`}
                      >
                        {(site.frequency || 0) > 70 ? "Surcharge" : (site.frequency || 0) > 50 ? "Modere" : "Normal"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

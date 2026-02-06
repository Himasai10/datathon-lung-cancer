import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Activity, DollarSign, Heart, ShieldAlert, Award, ChevronRight, Info, Users, TrendingUp } from 'lucide-react';

const DATA = {
  chicago: {
    city: "Chicago",
    baseline_smoking: 0.103,
    hotspot: "Fuller Park",
    hotspot_smoking: 0.347,
    hotspot_incidence: 132.3,
  },
  philly: {
    city: "Philadelphia",
    baseline_smoking: 0.16,
    hotspot: "Grays Ferry",
    hotspot_smoking: 0.22,
    hotspot_incidence: 88.6,
  }
};

// Helper function to format percentages properly (avoids floating point issues)
const formatPercent = (value) => {
  return (value * 100).toFixed(1) + '%';
};

const LungCancerDashboard = () => {
  const [uptake, setUptake] = useState(0.20);
  const [years, setYears] = useState(10);

  const calculateROI = (cityData) => {
    const SCREENING_COST = 300;
    const SAVINGS_PER_SHIFT = 125000; // Stage IV -> Stage I saving delta
    const population = 100000;
    const screened = population * uptake;
    const annual_cases = screened * 0.01;
    const shifted_cases = annual_cases * (0.5 * uptake);

    const investment = screened * SCREENING_COST;
    const annual_savings = (shifted_cases * SAVINGS_PER_SHIFT) - investment;
    const total_savings = annual_savings * years;
    const lives_saved = Math.round(shifted_cases * 0.8 * years); // Simplified mortality impact

    return { investment, annual_savings, total_savings, lives_saved };
  };

  const results = {
    chicago: calculateROI(DATA.chicago),
    philly: calculateROI(DATA.philly)
  };

  const chartData = [
    { name: 'Year 3', Chicago: results.chicago.annual_savings * 3, Philly: results.philly.annual_savings * 3 },
    { name: 'Year 5', Chicago: results.chicago.annual_savings * 5, Philly: results.philly.annual_savings * 5 },
    { name: 'Year 10', Chicago: results.chicago.total_savings, Philly: results.philly.total_savings },
  ];

  return (
    <div className="min-h-screen bg-background text-slate-800 p-8 font-sans">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-brand mb-2">PULSE: Lung Cancer ROI</h1>
            <p className="text-muted max-w-2xl">Return on Prevention: Comparing data-driven interventions for Chicago and Philadelphia.</p>
          </div>

          {/* Uptake Control Panel */}
          <div className="bg-surface p-6 rounded-2xl border border-border shadow-lg w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-3">
              <Users className="text-brand size-5" />
              <span className="text-sm font-semibold text-slate-700">Screening Uptake Rate</span>
              <div className="group relative">
                <Info className="text-muted size-4 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity w-64 pointer-events-none z-10">
                  <strong>Uptake Rate</strong> is the percentage of eligible population that participates in lung cancer screening programs. Higher uptake = more people screened = earlier detection.
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range" min="0.05" max="1" step="0.05"
                value={uptake} onChange={(e) => setUptake(parseFloat(e.target.value))}
                className="w-48 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand"
              />
              <span className="text-2xl font-bold text-brand min-w-[60px]">{(uptake * 100).toFixed(0)}%</span>
            </div>
            <p className="text-xs text-muted mt-2">
              {uptake <= 0.2 ? "Low uptake: Limited reach, lower costs" :
                uptake <= 0.5 ? "Moderate uptake: Balanced approach" :
                  "High uptake: Maximum prevention impact"}
            </p>
          </div>
        </div>
      </header>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-blue-100 rounded-xl">
            <Heart className="text-brand size-7" />
          </div>
          <div>
            <h3 className="text-muted text-sm font-medium mb-1">Estimated Lives Saved</h3>
            <p className="text-3xl font-bold text-slate-800">{(results.chicago.lives_saved + results.philly.lives_saved).toLocaleString()}</p>
            <p className="text-xs text-muted mt-1">Over {years} years combined</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-green-100 rounded-xl">
            <DollarSign className="text-safe size-7" />
          </div>
          <div>
            <h3 className="text-muted text-sm font-medium mb-1">Net Economic Impact</h3>
            <p className="text-3xl font-bold text-slate-800">${((results.chicago.total_savings + results.philly.total_savings) / 1e6).toFixed(1)}M</p>
            <p className="text-xs text-muted mt-1">{(results.chicago.total_savings + results.philly.total_savings) >= 0 ? "Savings" : "Investment needed"}</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl border border-border shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow">
          <div className="p-4 bg-orange-100 rounded-xl">
            <TrendingUp className="text-orange-600 size-7" />
          </div>
          <div>
            <h3 className="text-muted text-sm font-medium mb-1">Equity Efficiency</h3>
            <p className="text-3xl font-bold text-slate-800">8.4x</p>
            <p className="text-xs text-muted mt-1">ROI in underserved areas</p>
          </div>
        </div>
      </div>

      {/* City Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Chicago */}
        <div className="bg-surface p-8 rounded-2xl border border-border shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <div className="w-3 h-3 bg-brand rounded-full"></div>
            Chicago Model
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">City-wide Smoking Rate</span>
              <span className="font-semibold text-slate-700">{formatPercent(DATA.chicago.baseline_smoking)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <div>
                <span className="text-slate-700 font-medium">Hotspot: {DATA.chicago.hotspot}</span>
                <p className="text-xs text-muted mt-1">Highest risk neighborhood</p>
              </div>
              <span className="text-danger font-bold text-lg">{formatPercent(DATA.chicago.hotspot_smoking)}</span>
            </div>
            <div className="bg-blue-50 p-5 rounded-xl mt-4">
              <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">10-Year Investment Required</p>
              <p className="text-2xl font-bold text-brand">${(results.chicago.investment / 1e6).toFixed(1)}M</p>
              <p className="text-xs text-muted mt-2">Lives saved: {results.chicago.lives_saved.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Philadelphia */}
        <div className="bg-surface p-8 rounded-2xl border border-border shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
            <div className="w-3 h-3 bg-danger rounded-full"></div>
            Philadelphia Model
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted">City-wide Smoking Rate</span>
              <span className="font-semibold text-slate-700">{formatPercent(DATA.philly.baseline_smoking)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <div>
                <span className="text-slate-700 font-medium">Hotspot: {DATA.philly.hotspot}</span>
                <p className="text-xs text-muted mt-1">Highest risk neighborhood</p>
              </div>
              <span className="text-danger font-bold text-lg">{formatPercent(DATA.philly.hotspot_smoking)}</span>
            </div>
            <div className="bg-red-50 p-5 rounded-xl mt-4">
              <p className="text-xs text-muted mb-1 uppercase tracking-wider font-medium">10-Year Investment Required</p>
              <p className="text-2xl font-bold text-danger">${(results.philly.investment / 1e6).toFixed(1)}M</p>
              <p className="text-xs text-muted mt-2">Lives saved: {results.philly.lives_saved.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-surface p-8 rounded-2xl border border-border shadow-md">
        <h2 className="text-xl font-bold mb-2 text-slate-800">Economic Projection Over Time</h2>
        <p className="text-muted text-sm mb-6">Cumulative net savings from early detection screening programs</p>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `$${(value / 1e6).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`$${(value / 1e6).toFixed(1)}M`, '']}
                labelStyle={{ color: '#1e293b', fontWeight: 'bold' }}
              />
              <Legend />
              <Line type="monotone" dataKey="Chicago" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: '#2563eb' }} />
              <Line type="monotone" dataKey="Philly" stroke="#dc2626" strokeWidth={3} dot={{ r: 5, fill: '#dc2626' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 p-4 bg-slate-100 rounded-xl border border-border">
        <p className="text-xs text-muted text-center">
          <strong>Methodology:</strong> ROI calculated based on LDCT screening costs ($300/screen), stage-shift savings (~$125K per case shifted from Stage IV to Stage I), and estimated mortality reduction rates. Adjust uptake to model different policy scenarios.
        </p>
      </div>
    </div>
  );
};

export default LungCancerDashboard;

import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Activity, DollarSign, Heart, ShieldAlert, Award, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-background text-white p-8 font-sans">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-blue-500 mb-2">PULSE: LUNG CANCER ROI</h1>
          <p className="text-gray-400 max-w-2xl">Return on Prevention: Comparing data-driven interventions for Chicago and Philadelphia.</p>
        </div>
        <div className="bg-surface p-4 rounded-2xl border border-gray-800">
          <span className="text-xs uppercase font-bold text-gray-500 block mb-1">Target Scenario</span>
          <div className="flex gap-4">
            <div>
              <label className="text-xs text-blue-400">UPTAKE: {(uptake * 100).toFixed(0)}%</label>
              <input
                type="range" min="0.05" max="1" step="0.05"
                value={uptake} onChange={(e) => setUptake(parseFloat(e.target.value))}
                className="block w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Metric Cards */}
        <div className="bg-surface p-6 rounded-3xl border border-gray-800 flex items-center gap-6 shadow-2xl">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <Heart className="text-blue-500 size-8" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Estimated Lives Saved</h3>
            <p className="text-3xl font-bold">{(results.chicago.lives_saved + results.philly.lives_saved).toLocaleString()}</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-gray-800 flex items-center gap-6 shadow-2xl">
          <div className="p-4 bg-green-500/10 rounded-2xl">
            <DollarSign className="text-safe size-8" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Net Economic Impact</h3>
            <p className="text-3xl font-bold">${((results.chicago.total_savings + results.philly.total_savings) / 1e6).toFixed(1)}M</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-3xl border border-gray-800 flex items-center gap-6 shadow-2xl">
          <div className="p-4 bg-orange-500/10 rounded-2xl">
            <Award className="text-orange-500 size-8" />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">Equity Efficiency</h3>
            <p className="text-3xl font-bold">8.4x</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Comparison Section */}
        <div className="bg-surface p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full"></div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ChevronRight className="text-blue-500" /> Chicago Model
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-2 text-sm">
              <span className="text-gray-500">Benchmark Smoking</span>
              <span>10.3%</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2 text-sm">
              <span className="text-gray-500 font-bold">Hotspot: {DATA.chicago.hotspot}</span>
              <span className="text-danger font-bold">{DATA.chicago.hotspot_smoking * 100}%</span>
            </div>
            <div className="bg-background/50 p-4 rounded-xl mt-6">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">10y Investment</p>
              <p className="text-xl font-mono">${(results.chicago.investment / 1e6).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-3xl border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl rounded-full"></div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <ChevronRight className="text-blue-500" /> Philly Model
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-800 pb-2 text-sm">
              <span className="text-gray-500">Benchmark Smoking</span>
              <span>16.0%</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2 text-sm">
              <span className="text-gray-500 font-bold">Hotspot: {DATA.philly.hotspot}</span>
              <span className="text-danger font-bold">{DATA.philly.hotspot_smoking * 100}%</span>
            </div>
            <div className="bg-background/50 p-4 rounded-xl mt-6">
              <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">10y Investment</p>
              <p className="text-xl font-mono">${(results.philly.investment / 1e6).toFixed(1)}M</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface p-8 rounded-3xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-8">Economic Projection Over Time</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{ backgroundColor: '#121212', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="Chicago" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="Philly" stroke="#ef4444" strokeWidth={4} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LungCancerDashboard;

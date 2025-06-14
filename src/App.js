
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Users, Shield, Car, Home, Activity, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

const InsuranceAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock data - in a real application, this would come from APIs
  const fraudDetectionData = [
    { month: 'Jan', detected: 45, prevented: 38, savings: 850000 },
    { month: 'Feb', detected: 52, prevented: 44, savings: 920000 },
    { month: 'Mar', detected: 38, prevented: 35, savings: 750000 },
    { month: 'Apr', detected: 61, prevented: 55, savings: 1100000 },
    { month: 'Mai', detected: 47, prevented: 42, savings: 890000 },
    { month: 'Jun', detected: 55, prevented: 49, savings: 980000 }
  ];

  const riskAssessmentData = [
    { category: 'Niedrig', value: 65, color: '#10B981' },
    { category: 'Mittel', value: 25, color: '#F59E0B' },
    { category: 'Hoch', value: 10, color: '#EF4444' }
  ];

  const claimsData = [
    { week: 'KW 1', processed: 1200, automated: 850, manual: 350 },
    { week: 'KW 2', processed: 1350, automated: 920, manual: 430 },
    { week: 'KW 3', processed: 1180, automated: 780, manual: 400 },
    { week: 'KW 4', processed: 1420, automated: 1050, manual: 370 }
  ];

  const performanceMetrics = [
    { name: 'Fraud Detection Accuracy', value: 94.2, change: 2.1, trend: 'up' },
    { name: 'Claims Processing Time', value: 3.2, unit: 'Tage', change: -0.8, trend: 'down' },
    { name: 'Customer Satisfaction', value: 4.7, unit: '/5', change: 0.3, trend: 'up' },
    { name: 'Auto STP Rate', value: 78, unit: '%', change: 5.2, trend: 'up' }
  ];

  const telematicsData = [
    { month: 'Jan', safeDrivers: 85, accidents: 12, premiumReduction: 15 },
    { month: 'Feb', safeDrivers: 87, accidents: 10, premiumReduction: 18 },
    { month: 'Mar', safeDrivers: 89, accidents: 8, premiumReduction: 22 },
    { month: 'Apr', safeDrivers: 91, accidents: 7, premiumReduction: 25 },
    { month: 'Mai', safeDrivers: 92, accidents: 6, premiumReduction: 28 },
    { month: 'Jun', safeDrivers: 94, accidents: 5, premiumReduction: 30 }
  ];

  const ModelPerformanceCard = ({ title, accuracy, lastUpdated, status }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-blue-600">{accuracy}%</span>
            <span className="text-sm text-gray-500 ml-2">Genauigkeit</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status === 'active' ? 'Aktiv' : 'Training'}
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Letztes Update: {lastUpdated}
      </div>
    </div>
  );

  const MetricCard = ({ title, value, unit, change, trend, icon: Icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline mt-2">
            <p className="text-2xl font-semibold text-gray-900">
              {value}{unit && <span className="text-sm ml-1">{unit}</span>}
            </p>
            {change && (
              <div className={`ml-2 flex items-center text-sm ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(change)}
              </div>
            )}
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">HUK-COBURG</h1>
                  <p className="text-xs text-gray-500">Analytics Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="7d">7 Tage</option>
                <option value="30d">30 Tage</option>
                <option value="90d">90 Tage</option>
                <option value="1y">1 Jahr</option>
              </select>
              <div className="text-sm text-gray-600">
                Letztes Update: {new Date().toLocaleString('de-DE')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Übersicht', icon: Activity },
              { id: 'fraud', label: 'Betrugs-Erkennung', icon: AlertTriangle },
              { id: 'risk', label: 'Risiko-Bewertung', icon: Shield },
              { id: 'claims', label: 'Schadenbearbeitung', icon: CheckCircle },
              { id: 'telematics', label: 'Telematik', icon: Car }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  change={metric.change}
                  trend={metric.trend}
                  icon={index === 0 ? Shield : index === 1 ? Activity : index === 2 ? Users : Car}
                />
              ))}
            </div>

            {/* ML Models Performance */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">ML-Modell Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ModelPerformanceCard
                  title="Betrugs-Erkennungsmodell"
                  accuracy={94.2}
                  lastUpdated="Heute, 14:30"
                  status="active"
                />
                <ModelPerformanceCard
                  title="Risiko-Bewertungsmodell"
                  accuracy={89.7}
                  lastUpdated="Gestern, 23:15"
                  status="active"
                />
                <ModelPerformanceCard
                  title="Prämien-Optimierungsmodell"
                  accuracy={87.3}
                  lastUpdated="Heute, 02:00"
                  status="training"
                />
              </div>
            </div>

            {/* Overview Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Betrugs-Erkennungsleistung</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={fraudDetectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="detected" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="prevented" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Risiko-Verteilung</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={riskAssessmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ category, value }) => `${category}: ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {riskAssessmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fraud' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Betrugs-Erkennungssystem</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-8 h-8 text-red-600 mr-3" />
                    <div>
                      <p className="text-2xl font-bold text-red-600">55</p>
                      <p className="text-sm text-red-700">Verdächtige Fälle (Monat)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <div>
                      <p className="text-2xl font-bold text-green-600">€980.000</p>
                      <p className="text-sm text-green-700">Gesparte Summe (Monat)</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-8 h-8 text-blue-600 mr-3" />
                    <div>
                      <p className="text-2xl font-bold text-blue-600">94.2%</p>
                      <p className="text-sm text-blue-700">Erkennungsgenauigkeit</p>
                    </div>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={fraudDetectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'savings' ? `€${value.toLocaleString()}` : value,
                      name === 'detected' ? 'Erkannt' : name === 'prevented' ? 'Verhindert' : 'Einsparungen'
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="detected" fill="#EF4444" name="Erkannt" />
                  <Bar dataKey="prevented" fill="#10B981" name="Verhindert" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Risiko-Bewertung & Underwriting</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">Risiko-Kategorien Verteilung</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskAssessmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ category, value }) => `${category}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskAssessmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">Automatisierte Underwriting-Rate</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Kfz-Versicherung</span>
                        <span className="text-sm text-gray-600">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Hausratversicherung</span>
                        <span className="text-sm text-gray-600">78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Haftpflichtversicherung</span>
                        <span className="text-sm text-gray-600">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Claims Processing Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">1,420</p>
                  <p className="text-sm text-gray-600">Verarbeitete Schäden (diese Woche)</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">74%</p>
                  <p className="text-sm text-gray-600">Automatisierung Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">3.2</p>
                  <p className="text-sm text-gray-600">Ø Bearbeitungszeit (Tage)</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={claimsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="automated" stackId="a" fill="#10B981" name="Automatisiert" />
                  <Bar dataKey="manual" stackId="a" fill="#F59E0B" name="Manuell" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'telematics' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Telematik Analytics - Smart Driver Programm</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Car className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">94%</p>
                  <p className="text-sm text-green-700">Sichere Fahrer</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">5</p>
                  <p className="text-sm text-red-700">Unfälle (Monat)</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">30%</p>
                  <p className="text-sm text-blue-700">Ø Prämienreduktion</p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={telematicsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="safeDrivers" stroke="#10B981" strokeWidth={3} name="Sichere Fahrer (%)" />
                  <Line type="monotone" dataKey="accidents" stroke="#EF4444" strokeWidth={3} name="Unfälle" />
                  <Line type="monotone" dataKey="premiumReduction" stroke="#3B82F6" strokeWidth={3} name="Prämienreduktion (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InsuranceAnalyticsDashboard;
//     );
// }

// export default App;

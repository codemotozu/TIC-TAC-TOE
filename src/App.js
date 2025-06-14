import React, { useState, useEffect } from 'react';
import './index.css';

const InsuranceAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Mock data - in a real application, this would come from APIs......
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

  // Simple Icons as components
  const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );

  const AlertTriangleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );

  const ActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  );

  const CarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H8.5a1 1 0 0 0-.8.4L5 11l-5.16 1.86A1 1 0 0 0-1 14v3.15h3"/>
      <circle cx="6.5" cy="16.5" r="2.5"/>
      <circle cx="16.5" cy="16.5" r="2.5"/>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );

  const TrendingUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  );

  const TrendingDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
      <polyline points="17 18 23 18 23 12"/>
    </svg>
  );

  // Simple Bar Chart Component
  const SimpleBarChart = ({ data, dataKey1, dataKey2, height = 300 }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d[dataKey1] || 0, d[dataKey2] || 0)));
    const barWidth = 60;
    const chartWidth = data.length * (barWidth + 20);

    return (
      <div style={{ width: '100%', height: height, overflowX: 'auto' }}>
        <svg width={chartWidth} height={height} style={{ minWidth: '100%' }}>
          {data.map((item, index) => {
            const x = index * (barWidth + 20) + 30;
            const height1 = (item[dataKey1] / maxValue) * (height - 80);
            const height2 = (item[dataKey2] / maxValue) * (height - 80);
            
            return (
              <g key={index}>
                {/* Bar 1 */}
                <rect
                  x={x}
                  y={height - 40 - height1}
                  width={barWidth / 2 - 2}
                  height={height1}
                  fill="#EF4444"
                />
                {/* Bar 2 */}
                <rect
                  x={x + barWidth / 2}
                  y={height - 40 - height2}
                  width={barWidth / 2 - 2}
                  height={height2}
                  fill="#10B981"
                />
                {/* Label */}
                <text
                  x={x + barWidth / 2}
                  y={height - 10}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {item.month || item.week}
                </text>
                {/* Values */}
                <text
                  x={x + barWidth / 4}
                  y={height - 45 - height1}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#333"
                >
                  {item[dataKey1]}
                </text>
                <text
                  x={x + (3 * barWidth) / 4}
                  y={height - 45 - height2}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#333"
                >
                  {item[dataKey2]}
                </text>
              </g>
            );
          })}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#EF4444' }}></div>
            <span style={{ fontSize: '12px' }}>{dataKey1 === 'detected' ? 'Erkannt' : 'Automatisiert'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981' }}></div>
            <span style={{ fontSize: '12px' }}>{dataKey2 === 'prevented' ? 'Verhindert' : 'Manuell'}</span>
          </div>
        </div>
      </div>
    );
  };

  // Simple Pie Chart Component
  const SimplePieChart = ({ data, width = 300, height = 300 }) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    
    let currentAngle = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <svg width={width} height={height}>
            {data.map((item, index) => {
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
              const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
              const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
              const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
              );
            })}
            {/* Center circle */}
            <circle cx={centerX} cy={centerY} r={radius * 0.3} fill="#fff" />
          </svg>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div 
                  style={{ 
                    width: '16px', 
                    height: '16px', 
                    backgroundColor: item.color, 
                    borderRadius: '2px' 
                  }}
                ></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>
                  {item.category}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Simple Line Chart Component
  const SimpleLineChart = ({ data, lines, height = 300 }) => {
    const maxValue = Math.max(...data.flatMap(d => lines.map(line => d[line.key])));
    const chartWidth = 500;
    const padding = 50;
    
    const getX = (index) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
    const getY = (value) => height - padding - ((value / maxValue) * (height - 2 * padding));

    return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <svg width={chartWidth} height={height}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1={padding}
              y1={padding + (i * (height - 2 * padding)) / 4}
              x2={chartWidth - padding}
              y2={padding + (i * (height - 2 * padding)) / 4}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Lines */}
          {lines.map((line, lineIndex) => {
            const points = data.map((d, i) => `${getX(i)},${getY(d[line.key])}`).join(' ');
            return (
              <polyline
                key={lineIndex}
                points={points}
                fill="none"
                stroke={line.color}
                strokeWidth="3"
              />
            );
          })}
          
          {/* Data points */}
          {lines.map((line, lineIndex) =>
            data.map((d, i) => (
              <circle
                key={`${lineIndex}-${i}`}
                cx={getX(i)}
                cy={getY(d[line.key])}
                r="4"
                fill={line.color}
              />
            ))
          )}
          
          {/* X-axis labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 20}
              textAnchor="middle"
              fontSize="12"
              fill="#666"
            >
              {d.month}
            </text>
          ))}
        </svg>
        
        {/* Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '20px' }}>
          {lines.map((line, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '16px', height: '3px', backgroundColor: line.color }}></div>
              <span style={{ fontSize: '12px' }}>{line.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ModelPerformanceCard = ({ title, accuracy, lastUpdated, status }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>{title}</h3>
          <div style={{ marginTop: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6' }}>{accuracy}%</span>
            <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '8px' }}>Genauigkeit</span>
          </div>
        </div>
        <div style={{
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: status === 'active' ? '#dcfce7' : '#fef3c7',
          color: status === 'active' ? '#166534' : '#92400e'
        }}>
          {status === 'active' ? 'Aktiv' : 'Training'}
        </div>
      </div>
      <div style={{ marginTop: '16px', fontSize: '14px', color: '#6b7280' }}>
        Letztes Update: {lastUpdated}
      </div>
    </div>
  );

  const MetricCard = ({ title, value, unit, change, trend, IconComponent }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>{title}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px' }}>
            <p style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>
              {value}{unit && <span style={{ fontSize: '14px', marginLeft: '4px' }}>{unit}</span>}
            </p>
            {change && (
              <div style={{
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                color: trend === 'up' ? '#059669' : '#dc2626'
              }}>
                {trend === 'up' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <span style={{ marginLeft: '4px' }}>{Math.abs(change)}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px', color: '#2563eb' }}>
          <IconComponent />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eff6ff 0%, #f9fafb 100%)' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ color: '#2563eb' }}>
                  <ShieldIcon />
                </div>
                <div>
                  <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>HUK-COBURG</h1>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Analytics Dashboard</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              >
                <option value="7d">7 Tage</option>
                <option value="30d">30 Tage</option>
                <option value="90d">90 Tage</option>
                <option value="1y">1 Jahr</option>
              </select>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>
                Letztes Update: {new Date().toLocaleString('de-DE')}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {[
              { id: 'overview', label: 'Übersicht', icon: ActivityIcon },
              { id: 'fraud', label: 'Betrugs-Erkennung', icon: AlertTriangleIcon },
              { id: 'risk', label: 'Risiko-Bewertung', icon: ShieldIcon },
              { id: 'claims', label: 'Schadenbearbeitung', icon: CheckCircleIcon },
              { id: 'telematics', label: 'Telematik', icon: CarIcon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 4px',
                  borderBottom: activeTab === id ? '2px solid #3b82f6' : '2px solid transparent',
                  fontWeight: '500',
                  fontSize: '14px',
                  color: activeTab === id ? '#2563eb' : '#6b7280',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== id) {
                    e.target.style.color = '#374151';
                    e.target.style.borderBottomColor = '#d1d5db';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== id) {
                    e.target.style.color = '#6b7280';
                    e.target.style.borderBottomColor = 'transparent';
                  }
                }}
              >
                <Icon />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Key Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
              {performanceMetrics.map((metric, index) => (
                <MetricCard
                  key={index}
                  title={metric.name}
                  value={metric.value}
                  unit={metric.unit}
                  change={metric.change}
                  trend={metric.trend}
                  IconComponent={index === 0 ? ShieldIcon : index === 1 ? ActivityIcon : index === 2 ? UsersIcon : CarIcon}
                />
              ))}
            </div>

            {/* ML Models Performance */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>ML-Modell Performance</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Betrugs-Erkennungsleistung</h3>
                <SimpleBarChart data={fraudDetectionData} dataKey1="detected" dataKey2="prevented" />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>Risiko-Verteilung</h3>
                <SimplePieChart data={riskAssessmentData} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fraud' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>Betrugs-Erkennungssystem</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: '#dc2626', marginRight: '12px' }}>
                      <AlertTriangleIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626', margin: 0 }}>55</p>
                      <p style={{ fontSize: '14px', color: '#b91c1c', margin: 0 }}>Verdächtige Fälle (Monat)</p>
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: '#059669', marginRight: '12px' }}>
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#059669', margin: 0 }}>€980.000</p>
                      <p style={{ fontSize: '14px', color: '#047857', margin: 0 }}>Gesparte Summe (Monat)</p>
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ color: '#2563eb', marginRight: '12px' }}>
                      <ActivityIcon />
                    </div>
                    <div>
                      <p style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', margin: 0 }}>94.2%</p>
                      <p style={{ fontSize: '14px', color: '#1d4ed8', margin: 0 }}>Erkennungsgenauigkeit</p>
                    </div>
                  </div>
                </div>
              </div>

              <SimpleBarChart data={fraudDetectionData} dataKey1="detected" dataKey2="prevented" height={400} />
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>Risiko-Bewertung & Underwriting</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px' }}>Risiko-Kategorien Verteilung</h3>
                  <SimplePieChart data={riskAssessmentData} width={350} height={350} />
                </div>

                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#374151', marginBottom: '16px' }}>Automatisierte Underwriting-Rate</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { name: 'Kfz-Versicherung', value: 85, color: '#3b82f6' },
                      { name: 'Hausratversicherung', value: 78, color: '#059669' },
                      { name: 'Haftpflichtversicherung', value: 92, color: '#7c3aed' }
                    ].map((item, index) => (
                      <div key={index} style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.name}</span>
                          <span style={{ fontSize: '14px', color: '#6b7280' }}>{item.value}%</span>
                        </div>
                        <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px' }}>
                          <div style={{ 
                            backgroundColor: item.color, 
                            height: '8px', 
                            borderRadius: '9999px', 
                            width: `${item.value}%`,
                            transition: 'width 1s ease-in-out'
                          }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'claims' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>Claims Processing Analytics</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#2563eb', margin: 0 }}>1,420</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Verarbeitete Schäden (diese Woche)</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#059669', margin: 0 }}>74%</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Automatisierung Rate</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '32px', fontWeight: '700', color: '#7c3aed', margin: 0 }}>3.2</p>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Ø Bearbeitungszeit (Tage)</p>
                </div>
              </div>

              <SimpleBarChart data={claimsData} dataKey1="automated" dataKey2="manual" height={400} />
            </div>
          </div>
        )}

        {activeTab === 'telematics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '24px' }}>Telematik Analytics - Smart Driver Programm</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ color: '#059669', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <CarIcon />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#059669', margin: 0 }}>94%</p>
                  <p style={{ fontSize: '14px', color: '#047857', margin: 0 }}>Sichere Fahrer</p>
                </div>
                <div style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ color: '#dc2626', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <AlertTriangleIcon />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626', margin: 0 }}>5</p>
                  <p style={{ fontSize: '14px', color: '#b91c1c', margin: 0 }}>Unfälle (Monat)</p>
                </div>
                <div style={{ backgroundColor: '#eff6ff', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ color: '#2563eb', display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                    <ActivityIcon />
                  </div>
                  <p style={{ fontSize: '24px', fontWeight: '700', color: '#2563eb', margin: 0 }}>30%</p>
                  <p style={{ fontSize: '14px', color: '#1d4ed8', margin: 0 }}>Ø Prämienreduktion</p>
                </div>
              </div>

              <SimpleLineChart 
                data={telematicsData} 
                lines={[
                  { key: 'safeDrivers', color: '#10B981', name: 'Sichere Fahrer (%)' },
                  { key: 'accidents', color: '#EF4444', name: 'Unfälle' },
                  { key: 'premiumReduction', color: '#3B82F6', name: 'Prämienreduktion (%)' }
                ]}
                height={400} 
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return <InsuranceAnalyticsDashboard />;
}

export default App;

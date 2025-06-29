
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Database, FileText, Brain, Zap, Users, Globe, Satellite, TrendingUp } from 'lucide-react';

const SmartStatsCards = () => {
  const stats = [
    { label: 'Active Users', value: '50K+', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Satellite Missions', value: '25+', icon: Satellite, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Knowledge Base', value: '15.4K', icon: Database, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { label: 'Query Accuracy', value: '99.2%', icon: Brain, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Response Time', value: '0.3s', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { label: 'Countries Served', value: '120+', icon: Globe, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { label: 'Documents', value: '8.9K', icon: FileText, color: 'text-red-600', bgColor: 'bg-red-50' },
    { label: 'Growth Rate', value: '+45%', icon: TrendingUp, color: 'text-emerald-600', bgColor: 'bg-emerald-50' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4 mb-4 sm:mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-sm">
          <CardContent className="p-2 sm:p-4">
            <div className="flex flex-col items-center text-center space-y-1 sm:space-y-2">
              <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-3 w-3 sm:h-5 sm:w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm sm:text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600 leading-tight">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SmartStatsCards;

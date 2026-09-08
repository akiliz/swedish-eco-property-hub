
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart4, TrendingUp, UserCheck, Users, Eye, Search } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const analyticsData = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 1900 },
  { name: "Mar", value: 1800 },
  { name: "Apr", value: 2400 },
  { name: "May", value: 2200 },
  { name: "Jun", value: 3000 },
  { name: "Jul", value: 3700 },
];

const metricCards = [
  { 
    title: "Total Visitors", 
    value: "24.2k", 
    change: "+12.3%", 
    trend: "up",
    icon: <Eye className="h-4 w-4" />
  },
  { 
    title: "Unique Users", 
    value: "12.5k", 
    change: "+8.7%", 
    trend: "up",
    icon: <Users className="h-4 w-4" />
  },
  { 
    title: "Conversion Rate", 
    value: "3.2%", 
    change: "+0.5%", 
    trend: "up",
    icon: <UserCheck className="h-4 w-4" />
  },
  { 
    title: "Avg. Session", 
    value: "3m 12s", 
    change: "-0.3%", 
    trend: "down",
    icon: <Search className="h-4 w-4" />
  }
];

const AdminAnalytics = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Website Analytics</CardTitle>
            <CardDescription>Traffic overview and key metrics</CardDescription>
          </div>
          <BarChart4 className="text-muted-foreground" size={20} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {metricCards.map((metric, index) => (
            <div key={index} className="p-2 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">{metric.title}</span>
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {metric.icon}
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-semibold">{metric.value}</span>
                <span className={`text-xs ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingUp className="h-3 w-3 mr-0.5 rotate-180" />}
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="h-[200px] mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAnalytics;

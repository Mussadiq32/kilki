import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  Heart,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  RefreshCw
} from 'lucide-react';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCity, setSelectedCity] = useState('all');

  // Mock analytics data
  const metrics = {
    totalViews: 125430,
    totalUsers: 8942,
    totalProperties: 587,
    conversionRate: 3.2,
    viewsGrowth: 12.5,
    usersGrowth: 8.3,
    propertiesGrowth: 15.7,
    conversionGrowth: -2.1
  };

  const viewsData = [
    { date: '2024-01-01', views: 1200, users: 800 },
    { date: '2024-01-02', views: 1350, users: 920 },
    { date: '2024-01-03', views: 1100, users: 750 },
    { date: '2024-01-04', views: 1450, users: 980 },
    { date: '2024-01-05', views: 1600, users: 1100 },
    { date: '2024-01-06', views: 1800, users: 1250 },
    { date: '2024-01-07', views: 2100, users: 1400 }
  ];

  const topCitiesData = [
    { city: 'Srinagar', properties: 145, views: 28500, color: '#0088FE' },
    { city: 'Delhi', properties: 120, views: 24300, color: '#00C49F' },
    { city: 'Bangalore', properties: 98, views: 19800, color: '#FFBB28' },
    { city: 'Chandigarh', properties: 87, views: 16200, color: '#FF8042' },
    { city: 'Gurgaon', properties: 76, views: 14900, color: '#8884D8' },
    { city: 'Jammu', properties: 61, views: 12100, color: '#82CA9D' },
    { city: 'Mumbai', properties: 92, views: 18500, color: '#FF6B6B' }
  ];

  const propertyTypesData = [
    { type: 'Residential', count: 320, percentage: 54.5 },
    { type: 'Commercial', count: 180, percentage: 30.7 },
    { type: 'Villa', count: 52, percentage: 8.9 },
    { type: 'Apartment', count: 35, percentage: 5.9 }
  ];

  const topPropertiesData = [
    {
      id: 'prop_001',
      title: 'Luxury Villa with Dal Lake View',
      location: 'Srinagar',
      views: 2450,
      inquiries: 24,
      price: '2.5 Cr',
      status: 'Active'
    },
    {
      id: 'prop_002',
      title: 'Modern 3BHK Apartment',
      location: 'Delhi',
      views: 1890,
      inquiries: 18,
      price: '85 Lac',
      status: 'Active'
    },
    {
      id: 'prop_003',
      title: 'Commercial Space in IT Hub',
      location: 'Bangalore',
      views: 1650,
      inquiries: 15,
      price: '1.2 Cr',
      status: 'Active'
    },
    {
      id: 'prop_004',
      title: 'Independent House',
      location: 'Chandigarh',
      views: 1420,
      inquiries: 12,
      price: '95 Lac',
      status: 'Sold'
    }
  ];

  const conversionData = [
    { month: 'Jan', inquiries: 240, conversions: 12 },
    { month: 'Feb', inquiries: 280, conversions: 15 },
    { month: 'Mar', inquiries: 320, conversions: 18 },
    { month: 'Apr', inquiries: 290, conversions: 14 },
    { month: 'May', inquiries: 350, conversions: 22 },
    { month: 'Jun', inquiries: 380, conversions: 25 }
  ];

  const MetricCard = ({ title, value, growth, icon: Icon, format = 'number' }: any) => {
    const isPositive = growth > 0;
    const formattedValue = format === 'currency' ? `₹${value}` : 
                          format === 'percentage' ? `${value}%` : 
                          value.toLocaleString();

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{formattedValue}</p>
            </div>
            <div className="p-3 bg-gold-100 dark:bg-gold-900/20 rounded-full">
              <Icon className="h-6 w-6 text-gold-600 dark:text-gold-400" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(growth)}%
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">vs last period</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Track performance and user engagement</p>
        </div>
        
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="srinagar">Srinagar</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="chandigarh">Chandigarh</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Views"
          value={metrics.totalViews}
          growth={metrics.viewsGrowth}
          icon={Eye}
        />
        <MetricCard
          title="Total Users"
          value={metrics.totalUsers}
          growth={metrics.usersGrowth}
          icon={Users}
        />
        <MetricCard
          title="Total Properties"
          value={metrics.totalProperties}
          growth={metrics.propertiesGrowth}
          icon={MapPin}
        />
        <MetricCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          growth={metrics.conversionGrowth}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views & Users Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Views & Users Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="views" stackId="1" stroke="#D4A574" fill="#D4A574" />
                <Area type="monotone" dataKey="users" stackId="1" stroke="#1E3A8A" fill="#1E3A8A" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Cities by Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cities by Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCitiesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="city" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#D4A574" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ type, percentage }) => `${type}: ${percentage}%`}
                >
                  {propertyTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={topCitiesData[index % topCitiesData.length].color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="inquiries" stroke="#D4A574" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" stroke="#1E3A8A" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Properties Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Property</th>
                  <th className="text-left py-3 px-4 font-semibold">Location</th>
                  <th className="text-left py-3 px-4 font-semibold">Views</th>
                  <th className="text-left py-3 px-4 font-semibold">Inquiries</th>
                  <th className="text-left py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {topPropertiesData.map((property) => (
                  <tr key={property.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <p className="text-sm text-gray-500">{property.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                        {property.location}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1 text-gray-400" />
                        {property.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3 px-4">{property.inquiries}</td>
                    <td className="py-3 px-4 font-semibold">{property.price}</td>
                    <td className="py-3 px-4">
                      <Badge variant={property.status === 'Active' ? 'default' : 'secondary'}>
                        {property.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;

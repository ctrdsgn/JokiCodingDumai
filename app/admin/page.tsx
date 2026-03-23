'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart, Users, Package, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { AdminCard, StatCard, Table, TableRow, TableCell, Badge } from '../components/admin';
import { getOrders, getDashboardStats, updateOrderStatus } from '@/app/actions';

interface Order {
  id: string;
  clientName: string;
  email: string;
  service: string;
  status: string;
  createdAt: Date | string;
  budget?: string | null;
}

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalProjects: number;
  totalServices: number;
}

const statusConfig: Record<string, { badge: 'warning' | 'success' | 'info' | 'error'; label: string }> = {
  PENDING: { badge: 'warning', label: 'Pending' },
  IN_PROGRESS: { badge: 'info', label: 'In Progress' },
  COMPLETED: { badge: 'success', label: 'Completed' },
  CANCELLED: { badge: 'error', label: 'Cancelled' },
};

export default function AdminDashboard() {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    totalProjects: 0,
    totalServices: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [ordersResult, statsResult] = await Promise.all([
      getOrders(),
      getDashboardStats(),
    ]);

    if (ordersResult.success && ordersResult.data) {
      setRecentOrders(ordersResult.data.slice(0, 5)); // Show only 5 most recent
    }
    if (statsResult.success && statsResult.data) {
      setStats(statsResult.data);
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED') => {
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      loadData();
    } else {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 12, label: 'vs last month' }}
          gradient="teal"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Clock}
          gradient="purple"
        />
        <StatCard
          title="Projects Done"
          value={stats.totalProjects}
          icon={Package}
          trend={{ value: 15, label: 'vs last month' }}
          gradient="blue"
        />
        <StatCard
          title="Services"
          value={stats.totalServices}
          icon={DollarSign}
          gradient="orange"
        />
      </div>

      {/* Recent Orders Table */}
      <AdminCard
        title="Recent Orders"
        action={
          <button className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
            View All →
          </button>
        }
      >
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <Table headers={['Order ID', 'Customer', 'Service', 'Status', 'Date', 'Actions']}>
            {recentOrders.map((order) => {
              const status = statusConfig[order.status];
              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-mono text-teal-400">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{order.clientName}</div>
                      <div className="text-gray-500 text-xs">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>
                    <Badge variant={status.badge}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(order.id, 'IN_PROGRESS')}
                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                            title="Mark as In Progress"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Cancel Order"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {order.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                          className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          title="Mark as Completed"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        )}

        {recentOrders.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No orders yet.</p>
          </div>
        )}
      </AdminCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Pending Actions">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <p className="text-white font-medium">{stats.pendingOrders} Orders Awaiting Review</p>
                <p className="text-gray-400 text-sm">New orders need your attention</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <div className="flex-1">
                <p className="text-white font-medium">Update Portfolio</p>
                <p className="text-gray-400 text-sm">Add recent projects to showcase</p>
              </div>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Recent Activity">
          <div className="space-y-4">
            {recentOrders.slice(0, 3).map((order, index) => (
              <div key={order.id} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  order.status === 'PENDING' ? 'bg-yellow-400' :
                  order.status === 'IN_PROGRESS' ? 'bg-blue-400' :
                  'bg-green-400'
                }`} />
                <div>
                  <p className="text-white text-sm">
                    <span className="font-medium">{order.clientName}</span> placed a new order
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <p className="text-gray-400 text-sm">No recent activity</p>
            )}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

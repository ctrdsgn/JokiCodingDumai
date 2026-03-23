'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';
import { AdminCard, Table, TableRow, TableCell, Badge } from '../../components/admin';
import { getOrders, updateOrderStatus } from '@/app/actions';

interface Order {
  id: string;
  clientName: string;
  email: string;
  whatsapp: string;
  service: string;
  description: string;
  budget?: string | null;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date | string;
}

const statusConfig: Record<string, { badge: 'warning' | 'success' | 'info' | 'error'; label: string }> = {
  PENDING: { badge: 'warning', label: 'Pending' },
  IN_PROGRESS: { badge: 'info', label: 'In Progress' },
  COMPLETED: { badge: 'success', label: 'Completed' },
  CANCELLED: { badge: 'error', label: 'Cancelled' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    const result = await getOrders();
    if (result.success && result.data) {
      setOrders(result.data);
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: Order['status']) => {
    const result = await updateOrderStatus(id, newStatus);
    if (result.success) {
      loadOrders();
    } else {
      alert('Failed to update status');
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    PENDING: orders.filter((o) => o.status === 'PENDING').length,
    IN_PROGRESS: orders.filter((o) => o.status === 'IN_PROGRESS').length,
    COMPLETED: orders.filter((o) => o.status === 'COMPLETED').length,
    CANCELLED: orders.filter((o) => o.status === 'CANCELLED').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Orders Management</h1>
        <p className="text-gray-400 text-sm mt-1">
          View and manage incoming order requests
        </p>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by customer, email, or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="all">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </AdminCard>

      {/* Orders Table */}
      <AdminCard>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <Table headers={['Order ID', 'Customer', 'Service', 'Budget', 'Status', 'Date', 'Actions']}>
            {filteredOrders.map((order) => {
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
                  <TableCell className="text-gray-400">{order.budget || '-'}</TableCell>
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
                      <button
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={`mailto:${order.email}`}
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-teal-400 hover:bg-gray-700 transition-colors"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                      <a
                        href={`https://wa.me/${order.whatsapp.replace(/\s/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-colors"
                        title="Contact via WhatsApp"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      {/* Status Actions */}
                      {order.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(order.id, 'IN_PROGRESS')}
                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                            title="Mark as In Progress"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(order.id, 'CANCELLED')}
                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            title="Cancel Order"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {order.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'COMPLETED')}
                          className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          title="Mark as Completed"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        )}

        {filteredOrders.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400">No orders found</p>
          </div>
        )}
      </AdminCard>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', count: statusCounts.PENDING, color: 'yellow' },
          { label: 'In Progress', count: statusCounts.IN_PROGRESS, color: 'blue' },
          { label: 'Completed', count: statusCounts.COMPLETED, color: 'green' },
          { label: 'Cancelled', count: statusCounts.CANCELLED, color: 'red' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-xl bg-gray-900 border border-gray-800 text-center`}
          >
            <p className="text-2xl font-bold text-white">{stat.count}</p>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

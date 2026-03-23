'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ====================
// Service Actions
// ====================

export async function getServices() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: services };
  } catch (error) {
    console.error('Error fetching services:', error);
    return { success: false, error: 'Failed to fetch services' };
  }
}

export async function getServiceById(id: string) {
  try {
    const service = await prisma.service.findUnique({
      where: { id },
    });
    if (!service) {
      return { success: false, error: 'Service not found' };
    }
    return { success: true, data: service };
  } catch (error) {
    console.error('Error fetching service:', error);
    return { success: false, error: 'Failed to fetch service' };
  }
}

export async function createService(formData: {
  title: string;
  description: string;
  price: string;
  icon?: string;
  features: string[];
  gradient?: string;
  popular?: boolean;
}) {
  try {
    const service = await prisma.service.create({
      data: {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        icon: formData.icon,
        features: formData.features,
        gradient: formData.gradient,
        popular: formData.popular ?? false,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true, data: service };
  } catch (error) {
    console.error('Error creating service:', error);
    return { success: false, error: 'Failed to create service' };
  }
}

export async function updateService(
  id: string,
  formData: {
    title?: string;
    description?: string;
    price?: string;
    icon?: string;
    features?: string[];
    gradient?: string;
    popular?: boolean;
  }
) {
  try {
    const service = await prisma.service.update({
      where: { id },
      data: {
        ...formData,
        features: formData.features,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true, data: service };
  } catch (error) {
    console.error('Error updating service:', error);
    return { success: false, error: 'Failed to update service' };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin/packages');
    return { success: true };
  } catch (error) {
    console.error('Error deleting service:', error);
    return { success: false, error: 'Failed to delete service' };
  }
}

// ====================
// Project Actions
// ====================

export async function getProjects(featuredOnly?: boolean) {
  try {
    const projects = await prisma.project.findMany({
      where: featuredOnly ? { featured: true } : {},
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    console.error('Error fetching project:', error);
    return { success: false, error: 'Failed to fetch project' };
  }
}

export async function createProject(formData: {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}) {
  try {
    const project = await prisma.project.create({
      data: {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        category: formData.category,
        tags: formData.tags,
        link: formData.link,
        github: formData.github,
        featured: formData.featured ?? false,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true, data: project };
  } catch (error) {
    console.error('Error creating project:', error);
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(
  id: string,
  formData: {
    title?: string;
    description?: string;
    imageUrl?: string;
    category?: string;
    tags?: string[];
    link?: string;
    github?: string;
    featured?: boolean;
  }
) {
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...formData,
        tags: formData.tags,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true, data: project };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin/portfolio');
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

// ====================
// Order Actions
// ====================

export async function getOrders(status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED') {
  try {
    const where = status ? { status } : {};
    const orders = await prisma.order.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: orders };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { success: false, error: 'Failed to fetch orders' };
  }
}

export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
    });
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    return { success: true, data: order };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { success: false, error: 'Failed to fetch order' };
  }
}

export async function createOrder(formData: {
  clientName: string;
  whatsapp: string;
  email: string;
  service: string;
  description: string;
  budget?: string;
}) {
  try {
    const order = await prisma.order.create({
      data: {
        clientName: formData.clientName,
        whatsapp: formData.whatsapp,
        email: formData.email,
        service: formData.service,
        description: formData.description,
        budget: formData.budget,
        status: 'PENDING',
      },
    });
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
    return { success: true, data: order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error: 'Failed to create order' };
  }
}

export async function updateOrderStatus(
  id: string,
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
    return { success: true, data: order };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, error: 'Failed to update order status' };
  }
}

export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({
      where: { id },
    });
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, error: 'Failed to delete order' };
  }
}

// ====================
// Promo Actions
// ====================

export async function getPromos(activeOnly?: boolean) {
  try {
    const promos = await prisma.promo.findMany({
      where: activeOnly ? { active: true } : {},
      orderBy: { createdAt: 'desc' },
    });
    return { success: true, data: promos };
  } catch (error) {
    console.error('Error fetching promos:', error);
    return { success: false, error: 'Failed to fetch promos' };
  }
}

export async function getPromoById(id: string) {
  try {
    const promo = await prisma.promo.findUnique({
      where: { id },
    });
    if (!promo) {
      return { success: false, error: 'Promo not found' };
    }
    return { success: true, data: promo };
  } catch (error) {
    console.error('Error fetching promo:', error);
    return { success: false, error: 'Failed to fetch promo' };
  }
}

export async function createPromo(formData: {
  title: string;
  description: string;
  discount: string;
  validUntil?: string;
  gradient?: string;
  active?: boolean;
}) {
  try {
    const promo = await prisma.promo.create({
      data: {
        title: formData.title,
        description: formData.description,
        discount: formData.discount,
        validUntil: formData.validUntil ? new Date(formData.validUntil) : null,
        gradient: formData.gradient,
        active: formData.active ?? true,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/promos');
    return { success: true, data: promo };
  } catch (error) {
    console.error('Error creating promo:', error);
    return { success: false, error: 'Failed to create promo' };
  }
}

export async function updatePromo(
  id: string,
  formData: {
    title?: string;
    description?: string;
    discount?: string;
    validUntil?: string;
    gradient?: string;
    active?: boolean;
  }
) {
  try {
    const promo = await prisma.promo.update({
      where: { id },
      data: {
        ...formData,
        validUntil: formData.validUntil ? new Date(formData.validUntil) : undefined,
      },
    });
    revalidatePath('/');
    revalidatePath('/admin/promos');
    return { success: true, data: promo };
  } catch (error) {
    console.error('Error updating promo:', error);
    return { success: false, error: 'Failed to update promo' };
  }
}

export async function deletePromo(id: string) {
  try {
    await prisma.promo.delete({
      where: { id },
    });
    revalidatePath('/');
    revalidatePath('/admin/promos');
    return { success: true };
  } catch (error) {
    console.error('Error deleting promo:', error);
    return { success: false, error: 'Failed to delete promo' };
  }
}

// ====================
// Dashboard Stats
// ====================

export async function getDashboardStats() {
  try {
    const [totalOrders, pendingOrders, totalProjects, totalServices] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.count({ where: { status: 'PENDING' } }),
        prisma.project.count(),
        prisma.service.count(),
      ]);

    return {
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        totalProjects,
        totalServices,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return { success: false, error: 'Failed to fetch dashboard stats' };
  }
}

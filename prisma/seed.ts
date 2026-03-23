import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Services
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'svc-landing-page' },
      update: {},
      create: {
        id: 'svc-landing-page',
        title: 'Web Landing Page',
        description: 'Stunning single-page websites that capture attention and convert visitors into customers. Perfect for products, events, or personal branding.',
        price: 'From Rp 1.5jt',
        icon: 'Monitor',
        features: ['Modern, responsive design', 'SEO optimized', 'Fast loading speed', 'Mobile-first approach', 'Contact form integration', 'Social media links'],
        gradient: 'from-teal-500 to-cyan-500',
        popular: false,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-ecommerce' },
      update: {},
      create: {
        id: 'svc-ecommerce',
        title: 'E-Commerce',
        description: 'Full-featured online stores with secure payment integration, inventory management, and seamless checkout experience.',
        price: 'From Rp 5jt',
        icon: 'ShoppingCart',
        features: ['Product catalog management', 'Shopping cart & checkout', 'Payment gateway integration', 'Order management system', 'Inventory tracking', 'Customer accounts'],
        gradient: 'from-purple-500 to-pink-500',
        popular: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'svc-custom-web' },
      update: {},
      create: {
        id: 'svc-custom-web',
        title: 'Custom Web App',
        description: 'Tailor-made web applications built to your specific business needs. From dashboards to complex SaaS platforms.',
        price: 'From Rp 8jt',
        icon: 'Code',
        features: ['Custom functionality', 'Database integration', 'User authentication', 'Admin dashboard', 'API development', 'Ongoing support'],
        gradient: 'from-blue-500 to-indigo-500',
        popular: false,
      },
    }),
  ]);

  console.log(`✅ Created ${services.length} services`);

  // Create Projects
  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: 'prj-toko-online' },
      update: {},
      create: {
        id: 'prj-toko-online',
        title: 'Toko Online Riau',
        description: 'A full-featured e-commerce platform for a local retail business in Riau, featuring product management, secure payments, and real-time inventory tracking.',
        imageUrl: '/portfolio/project-1.svg',
        category: 'E-Commerce',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'Stripe'],
        link: '#',
        github: '#',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { id: 'prj-dumai-tourism' },
      update: {},
      create: {
        id: 'prj-dumai-tourism',
        title: 'Dumai Tourism Guide',
        description: 'An interactive tourism website showcasing the beautiful destinations, culture, and cuisine of Dumai city with stunning visuals and maps.',
        imageUrl: '/portfolio/project-2.svg',
        category: 'Landing Page',
        tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Leaflet'],
        link: '#',
        github: '#',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { id: 'prj-dashboard-pro' },
      update: {},
      create: {
        id: 'prj-dashboard-pro',
        title: 'Business Dashboard Pro',
        description: 'A comprehensive admin dashboard for managing business operations, analytics, and team collaboration with real-time data visualization.',
        imageUrl: '/portfolio/project-3.svg',
        category: 'Web App',
        tags: ['Next.js', 'PostgreSQL', 'Chart.js', 'Auth.js'],
        link: '#',
        github: '#',
        featured: true,
      },
    }),
    prisma.project.upsert({
      where: { id: 'prj-restaurant-order' },
      update: {},
      create: {
        id: 'prj-restaurant-order',
        title: 'Restaurant Ordering System',
        description: 'Digital menu and ordering system for a local restaurant with QR code integration, table management, and kitchen display system.',
        imageUrl: '/portfolio/project-4.svg',
        category: 'Web App',
        tags: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
        link: '#',
        github: '#',
        featured: false,
      },
    }),
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  // Create Promos
  const promos = await Promise.all([
    prisma.promo.upsert({
      where: { id: 'promo-new-year' },
      update: {},
      create: {
        id: 'promo-new-year',
        title: 'New Year Special',
        description: 'Get 20% off on all landing page packages. Perfect time to launch your business online!',
        discount: '20% OFF',
        validUntil: new Date('2026-12-31'),
        gradient: 'from-red-500 to-pink-500',
        active: true,
      },
    }),
    prisma.promo.upsert({
      where: { id: 'promo-bundle' },
      update: {},
      create: {
        id: 'promo-bundle',
        title: 'Bundle Package',
        description: 'Order E-Commerce + Custom Web App together and save Rp 3jt. Best value for growing businesses.',
        discount: 'Save Rp 3jt',
        validUntil: null,
        gradient: 'from-purple-500 to-indigo-500',
        active: true,
      },
    }),
  ]);

  console.log(`✅ Created ${promos.length} promos`);

  // Create Sample Orders
  const orders = await Promise.all([
    prisma.order.upsert({
      where: { id: 'ord-001' },
      update: {},
      create: {
        id: 'ord-001',
        clientName: 'Budi Santoso',
        whatsapp: '0812 3456 7890',
        email: 'budi.santoso@email.com',
        service: 'E-Commerce',
        description: 'Need an online store for my fashion business with payment gateway integration.',
        budget: 'Rp 5-10jt',
        status: 'PENDING',
      },
    }),
    prisma.order.upsert({
      where: { id: 'ord-002' },
      update: {},
      create: {
        id: 'ord-002',
        clientName: 'Siti Nurhaliza',
        whatsapp: '0813 9876 5432',
        email: 'siti.nur@email.com',
        service: 'Landing Page',
        description: 'Single page website for my restaurant with menu and reservation form.',
        budget: 'Rp 1-3jt',
        status: 'COMPLETED',
      },
    }),
    prisma.order.upsert({
      where: { id: 'ord-003' },
      update: {},
      create: {
        id: 'ord-003',
        clientName: 'Ahmad Rizki',
        whatsapp: '0814 1122 3344',
        email: 'ahmad.rizki@email.com',
        service: 'Custom Web App',
        description: 'Inventory management system for my warehouse with barcode scanning.',
        budget: 'Rp 10jt+',
        status: 'IN_PROGRESS',
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} orders`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

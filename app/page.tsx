import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Promo } from './components/Promo';
import { getServices, getProjects, getPromos } from './actions';

export default async function Home() {

  const [servicesResult, projectsResult, promosResult] = await Promise.all([
    getServices(),
    getProjects(),
    getPromos(true), 
  ]);


  const services = servicesResult.success && servicesResult.data ? servicesResult.data : [];
  const projects = projectsResult.success && projectsResult.data ? projectsResult.data : [];
  const promos = promosResult.success && promosResult.data ? promosResult.data : [];

  return (
    <>
      <Hero />
      <Services services={services} />
      <Portfolio projects={projects} />
      <Promo promos={promos} />
    </>
  );
}

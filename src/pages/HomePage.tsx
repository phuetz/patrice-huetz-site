import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Books from '../components/Books';
import Services from '../components/Services';
import Blog from '../components/Blog';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <div id="accueil">
        <Hero />
      </div>
      <Books />
      <Services />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

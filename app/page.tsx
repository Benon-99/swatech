import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Features from '@/components/Features';
import BlogPreview from '@/components/BlogPreview';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Features />
      <BlogPreview />
    </main>
  );
}
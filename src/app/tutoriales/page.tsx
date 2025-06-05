import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/NavBar';
import VideosSection from '@/components/tutoriales/VideosSection';

export default function TutorialesPage() {
  return (
    <main>
      <Navbar />

      <section className="md:py-16 bg-white dark:bg-dark">
        <div className="md:px-6 lg:px-8 xl:px-[100px]">
          <VideosSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}

import Navbar from '@/components/shared/NavBar';
import VideosSection from '@/components/tutoriales/VideosSection';

export default function TutorialesPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-white dark:bg-dark">
        <div className="">
          {/* <div className="md:px-6 lg:px-8 xl:px-[100px]"> */}
          <VideosSection />
        </div>
      </section>
    </main>
  );
}

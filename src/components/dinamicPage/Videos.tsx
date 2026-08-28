import Link from 'next/link';
import { Videos } from '@/types/DinamicLanding';
import VideosSection from '../info/VideosSection';
import Button from '../shared/Button';
type VideosComponentProps = {
  videos: Videos[];
};

export default function VideosComponent({ videos }: VideosComponentProps) {
  return (
    <section>
      <div className="dark:bg-dark px-[50px] md:px-[100px] xl:px-[145px] padding-xxl ">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 text-center lg:text-start">
          <h1 className="font-encode-sans text-[30px] lg:text-4xl text-secondary font-extrabold lg:font-black leading-snug">
            Conocé más sobre <br className="hidden lg:block " /> cómo invertir
          </h1>
          <div className="hidden lg:block">
            <Link href="/tutoriales">
              <Button variant="light">Ver todos los videos</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col 2xl:pl-[150px]">
        <VideosSection videos={videos} error={''} loading={false} />
      </div>
      <div className="flex lg:hidden justify-center pb-10 lg:pb-0">
        <Link href="/tutoriales">
          <Button variant="light">Ver todos los videos</Button>
        </Link>
      </div>
    </section>
  );
}

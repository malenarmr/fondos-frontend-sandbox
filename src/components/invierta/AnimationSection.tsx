import Button from '@/components/shared/Button';
import Link from 'next/link';
import JsonAnimation from '../shared/LottieAnimation';

export default function AnimationSection() {
  return (
    <section className="lg:rounded-t-[50px] lg:bg-light-aqua-green py-[30px] lg:pb-[70px] lg:mt-20 flex flex-col items-center mb-5 lg:mb-[-50px]">
      <div className="container flex flex-col lg:flex-row items-center lg:justify-between lg:items-center">
        <div className={'hidden lg:block lg:mr-20 lg:px-16 py-16'}>
          {/* <LottieAnimation
            animationData={animationData}
            loop={true}
            autoplay={true}
          /> */}
          <JsonAnimation src="/invierta/06_Destacado.json" />
        </div>
        <div className=" flex flex-col justify-center lg:justify-end items-center lg:items-start lg:w-[50%] lg:ml-[30px] lg:pl-7">
          <h1 className="font-encode-sans text-xl lg:text-4xl text-primary leading-7 mb-5 font-bold">
            ¡No pierdas más tiempo!
            <br />
            Invertí con Invierta
          </h1>
          <p className="font-encode-sans text-lg text-primary leading-6 mb-16 font-400 px-14 lg:px-0">
            Cambiá tu forma de invertir y potenciá tus ahorros.
            <br />
            Accedé a una amplia variedad de productos financieros
            <br />
            para todos los perfiles.
          </p>
          <div className="flex justify-center">
            <Link
              href="https://app.provinciabursatil.com.ar/#!/registration/email?originalUrl="
              passHref
            >
              <Button>Crear cuenta</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

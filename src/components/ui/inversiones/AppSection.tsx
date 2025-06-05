import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

const AppSection: React.FC = () => {
  return (
    <div className="lg:rounded-t-[50px] lg:bg-light-aqua-green flex flex-col justify-center items-center pt-20 pb-20 md:pb-32 text-center mb-12 md:mb-[-50px]">
      <h1 className="font-encode-sans text-xl lg:text-4xl text-primary leading-7 mb-5 font-bold">
        ¡El mejor precio para tus dólares!
      </h1>
      <p className="font-encode-sans text-lg text-primary leading-6 mb-12 font-400 px-14 lg:px-0">
        Dólar MEP nunca fue tan fácil. Accedé a la mejor
        <br />
        cotización del mercado y en el acto. Es rápido, seguro y sin límites.
      </p>
      <div className="text-primary">
        <div className="flex gap-4 justify-center xl:justify-start">
          <Link
            href="https://apps.apple.com/app/id6448729005"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
              <Image
                src="/home/AppStore.svg"
                alt="Apple icon"
                width={110}
                height={110}
                className="m-0 xl:mr-2"
              />
            </button>
          </Link>
          <Link
            href="https://play.google.com/store/apps/details?id=io.btrader.prbu&hl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="flex items-center border text-primary rounded-[10px] px-6 py-5 transition-shadow duration-200 hover:bg-white hover:shadow-[0_0_15px_rgba(0,0,0,0.35)]">
              <Image
                src="/home/PlayStore.svg"
                alt="Play Store icon"
                width={110}
                height={110}
                className="m-0 xl:mr-2"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppSection;

import Button from '../shared/Button';

const MobileInviertaSection = () => {
  return (
    <section className="bg-[#005A63] py-8 px-6 rounded-t-[10px] text-white md:hidden font-encode-sans">
      <h3 className="font-encode-sans text-[25px] font-bold mb-4">
        Llegó Invierta!
      </h3>
      <p className="font-encode-sans text-[16px] font-normal mb-6">
        Con INVIERTA podés dar tus primeros pasos en el mundo de las inversiones
        sin complicaciones. Gestioná tu dinero de manera simple, rápida y
        segura.
      </p>
      <Button>Descargar Invierta!</Button>
    </section>
  );
};

export default MobileInviertaSection;

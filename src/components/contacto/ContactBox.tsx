import { Mail, MessageCircle } from 'lucide-react';

interface ContactBoxProps {
  contacto: {
    telefono: string;
    fax: string;
    consultas_denuncias: string;
    email: string;
  };
}

export default function ContactBox({ contacto }: ContactBoxProps) {
  return (
    <div className="border border-[#009B67] rounded-tl-[8px] rounded-br-[8px] rounded-tr-[22px] rounded-bl-[22px] bg-white py-8 w-full flex flex-col gap-6 shadow-sm items-center">
      {/* Teléfonos */}
      <div className="flex items-start gap-4 p-4">
        <MessageCircle
          size={32}
          strokeWidth={2}
          color="#009B67"
          className="min-w-[32px]"
        />
        <div className="flex flex-col">
          <span className="text-secondary text-md md:text-lg">
            Tel.: {contacto.telefono} / FAX. {contacto.fax}
          </span>
          <span className="text-secondary text-md md:text-lg">
            Consultas o Denuncias: {contacto.consultas_denuncias}
          </span>
        </div>
      </div>
      {/* Email */}
      <div className="flex items-center gap-4">
        <Mail
          size={32}
          strokeWidth={2}
          color="#009B67"
          className="min-w-[32px]"
        />
        <a
          href={`mailto:${contacto.email.trim()}`}
          className="text-secondary text-md md:text-lg underline"
        >
          {contacto.email.trim()}
        </a>
      </div>
    </div>
  );
}

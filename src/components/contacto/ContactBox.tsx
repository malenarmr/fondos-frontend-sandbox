import { Mail, MessageCircle } from 'lucide-react';

export default function ContactBox() {
  return (
    <div className="border border-[#009B67] rounded-2xl bg-white p-8 max-w-md w-full flex flex-col gap-6 shadow-sm">
      {/* Teléfonos */}
      <div className="flex items-start gap-4">
        <MessageCircle
          size={32}
          strokeWidth={2}
          color="#009B67"
          className="min-w-[32px]"
        />
        <div className="flex flex-col">
          <span className="text-secondary text-lg">
            Tel.: (11) 4348 - 9415 / FAX. 4348 - 9417
          </span>
          <span className="text-secondary text-lg">
            Consultas o Denuncias: 0800 - 666 - 2285
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
          href="mailto:sugerencias@provinfondos.com.ar"
          className="text-secondary text-lg underline"
        >
          sugerencias@provinfondos.com.ar
        </a>
      </div>
    </div>
  );
}

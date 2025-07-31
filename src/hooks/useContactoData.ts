import { ContactoData, fetchContacto } from '@/services/contactService';
import { useEffect, useState } from 'react';

export function useContactoData() {
  const [contacto, setContacto] = useState<ContactoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacto().then((data) => {
      setContacto(data);
      setLoading(false);
    });
  }, []);

  return { contacto, loading };
}

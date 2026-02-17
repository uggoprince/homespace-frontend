import { Phone, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { formatPhone } from '@/Utils/formatters';
import { DisabledContactButton } from '@/components/Button/DisabledContactButton';
import { cn } from '@/lib/cn';

interface ContactLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  className?: string;
  external?: boolean;
}

const ContactLink = ({ href, icon: Icon, label, className, external }: ContactLinkProps) => (
  <a
    href={href}
    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    className={cn(
      'w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium hover:scale-[1.02] transition-all',
      className,
    )}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </a>
);

export const PhoneButton = ({ phoneNumber }: { phoneNumber?: string }) => (
  phoneNumber ? (
    <ContactLink
      href={`tel:${phoneNumber}`}
      icon={Phone}
      label={formatPhone(phoneNumber)}
      className="bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/25"
    />
  ) : (
    <DisabledContactButton icon={Phone} label="Phone not available" />
  )
);

export const WhatsAppButton = ({ phoneNumber }: { phoneNumber?: string }) => (
  phoneNumber ? (
    <ContactLink
      href={`https://wa.me/${phoneNumber.replaceAll(/\D/g, '')}`}
      icon={FaWhatsapp}
      label="WhatsApp"
      className="bg-green-600 hover:bg-green-500 text-white"
      external
    />
  ) : (
    <DisabledContactButton icon={FaWhatsapp} label="WhatsApp not available" />
  )
);

export const EmailButton = ({ email }: { email?: string }) => (
  email ? (
    <ContactLink
      href={`mailto:${email}`}
      icon={Mail}
      label="Send Email"
      className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700"
    />
  ) : (
    <DisabledContactButton icon={Mail} label="Email not available" />
  )
);

interface ContactButtonsProps {
  phoneNumber?: string;
  email?: string;
}

const ContactButtons = ({ phoneNumber, email }: ContactButtonsProps) => (
  <div className="space-y-3">
    <PhoneButton phoneNumber={phoneNumber} />
    <WhatsAppButton phoneNumber={phoneNumber} />
    <EmailButton email={email} />
  </div>
);

export default ContactButtons;

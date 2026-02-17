import { toast } from 'sonner';

export const showToast = (
  message: string, 
  type: 'success' | 'error' | 'info' = 'info',
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' = 'top-center'
) => {
  if (type === 'success') {
    toast.success(message, { position });
  } else if (type === 'error') {
    toast.error(message, { position });
  } else {
    toast(message, { position });
  }
};
import { useAuth } from '../../auth/AuthProvider';

const Logo = () => {
  const { user, setIsActive } = useAuth();
  return (
    <a
      href="/"
      onClick={() => {
        setIsActive('home');
        sessionStorage.removeItem('propertiesQuery');
      }}
    >
      <div
        className="
      text-primary dark:text-slate-50 py-2
      font-bold
      inline-block
      cursor-pointer
      min-h-full"
      >
        {!user && 'HomeSpace'}
        {user && `${user.firstname} ${user.lastname}`}
      </div>
    </a>
  );
};

export default Logo;

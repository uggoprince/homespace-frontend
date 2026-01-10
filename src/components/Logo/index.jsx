import { useAuth } from '../../auth/AuthProvider';

const Logo = () => {
  const { user } = useAuth();
  return (
    <a href="/">
      <div
        className="
      text-primary dark:text-primary2 py-2
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

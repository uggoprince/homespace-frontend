import Routes from './routes';
import AuthProvider from './auth/AuthProvider';
import { ThemeProvider } from './contexts/ThemeContext';

const App = () => (
  <div className="font-sans">
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </div>
);

export default App;

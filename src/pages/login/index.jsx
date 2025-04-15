import { Component } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from './loginForm';
import { BaseLayout } from '../../layouts/base-layout';

class Login extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <BaseLayout>
        <Header />
        <LoginForm />
        <Footer />
      </BaseLayout>
    );
  }
}

export default Login;

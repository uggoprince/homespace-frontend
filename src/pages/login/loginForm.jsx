import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import TextField, { PasswordTextField } from '../../components/Input/textField';
import InputContainer from '../../components/Input/inputContainer';
import Button from '../../components/Button';
import { LOGIN_USER_QUERY_STRING } from '../../data/user/queryString';
import Alert, { notify } from '../../components/Alert';
import { useAuth } from '../../auth/AuthProvider';
import useForm from '../../components/Form/useForm';
import Form from '../../components/Form';
import { signIn } from '../../data/user/fieldProcessor';
import { formErrorHandler } from '../../data/errorHandler';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const { errors, setErrors } = useForm();
  let alertLoadingId;
  const [login, { loading, error, data }] = useMutation(LOGIN_USER_QUERY_STRING,
    {
      errorPolicy: 'all',
    });
  useEffect(() => {
    if (loading) {
      alertLoadingId = notify('Signing In...', 1);
    }
    if (data) {
      toast.remove(alertLoadingId);
      const { token, user } = data.login;
      loginUser(token, user);
    }
    if (error) {
      toast.remove(alertLoadingId);
      formErrorHandler(error, setErrors, notify);
    }
  });

  const auth = (e) => {
    signIn(e, login);
  };

  return (
    <div className="flex flex-col justify-center flex-1 flex-shrink w-full h-full overflow-y-auto page-content">
      <div className="container flex flex-col justify-around h-full">
        <Form submithandler={auth} method="POST" id="loginForm" formclass="loginForm">
          <div className="w-full">
            <span>Login</span>
          </div>
          <div className="w-full overflow-y-auto flex flex-col gap-2 py-3">
            <InputContainer>
              <TextField
                name="email"
                label="Email"
                type="email"
                error={errors.email}
                required
              />
            </InputContainer>
            <InputContainer>
              <PasswordTextField
                name="password"
                label="Password"
                error={errors.password}
                required
              />
            </InputContainer>
          </div>
          <InputContainer>
            <Button id="loginButton" type="submit" text="Login" disable={loading} />
          </InputContainer>
        </Form>
      </div>
      <Alert />
    </div>
  );
};

export default LoginForm;

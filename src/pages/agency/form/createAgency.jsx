/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/Form';
import TextField, { SelectField, TextArea } from '../../../components/Input/textField';
import useForm from '../../../components/Form/useForm';
import Container, { container as Container2 } from '../../../components/Input/inputContainer';
import Button from '../../../components/Button';
import { fetchApi, mutateApi } from '../../../Utils/Api';
import { formErrorHandler } from '../../../data/errorHandler';
import { SignOutToLogin } from '../../../auth/signout';
import { createTheAgency } from '../../../data/agency/fieldProcessor';
import { CREATE_AGENCY } from '../../../data/agency/queryString';
import Alert, { notify } from '../../../components/Alert';
// import { PATHS } from '../../../Utils/paths';
import { useAuth } from '../../../auth/AuthProvider';
import { updateLocalStorage } from '../../../Utils/LocalStorage';
import { Group } from '../../../components/Form/group';
import { getCountries, getStates } from 'country-state-picker';

export default (props) => {
  const {
    handleClose, modalIsOpen, // setReFetchMyAgencies, doneRefetching,
  } = props;
  const [country, setCountry] = useState(null);
  const [states, setStates] = useState(null);
  const [countryIndex, setCountryIndex] = useState(null);
  const { errors, setErrors } = useForm();
  const navigate = useNavigate();
  const [createAgency, { loading, error, data }] = mutateApi(CREATE_AGENCY);
  const { updateUser, setIsActive } = useAuth();
  const [countries, setCountries] = useState([]);
  // const [newAgencyId, setNewAgencyId] = useState(null);
  let alertLoadingId;
  useEffect(() => {
    if (loading) {
      alertLoadingId = notify('Saving agency...', 1);
    }
    if (error) {
      toast.remove(alertLoadingId);
      formErrorHandler(error, setErrors, notify);
    }
    if (data && data.createAgency) {
      const { id } = data.createAgency;
      // setNewAgencyId(id);
      // setReFetchMyAgencies(true);
      updateLocalStorage('user', { profile: { hasAgency: true } });
      updateUser();
      toast.remove(alertLoadingId);
      notify('Agency created!', 3);
      handleClose();
      setIsActive('dashboard/agency');
      navigate('/dashboard/agency');
    }
  }, [loading, error, data]);
  useEffect(() => {
    if (modalIsOpen) {
      if (countries.length < 1) {
        setCountries(getCountries());
      }
    }
  });
  useEffect(() => {
    if (country) {
      const countryCode = countries[countryIndex].code;
      const states = getStates(countryCode);
      setStates(states);
    }
  }, [country]);
  if (error && error.message === 'Your session expired. Sign in again.') {
    return <SignOutToLogin />;
  }
  const createIt = (e) => {
    createTheAgency(e, createAgency);
  };
  return (
    <div className="container content-center h-full flex-1">
      <div className="w-full h-full">
        <Form
          submithandler={createIt}
          method="POST"
          id="createAgencyForm"
          formclass="createAgencyForm flex flex-col gap-3 max-h-full"
        >
          <div className="w-full overflow-y-scroll flex flex-col gap-2 py-3 max-h-[100%]">
            <Group>
              <Container2 classlist="">
                <TextField name="name" label="Name" type="text" error={errors.name} required />
              </Container2>
              <Container2 classlist="">
                <TextField name="username" label="@UserName" type="text" error={errors.username} required />
              </Container2>
            </Group>
            <Container>
              <TextArea name="about" label="About" type="text" error={errors.about} required />
            </Container>
            <Group>
              <Container2 classlist="">
                <SelectField
                  extraFunction={setCountry}
                  getIndex={setCountryIndex}
                  name="country"
                  label="Country"
                  options={countries?.map((country) => country?.name)}
                  error={errors.country}
                />
              </Container2>
              <Container2 classlist="">
                <SelectField
                  name="state"
                  label="State"
                  options={states?.map((state) => state)}
                  error={errors.state}
                />
              </Container2>
            </Group>
            <Group>
              <Container2 classlist="">
                <TextField name="address" label="Address" type="text" error={errors.address} required />
              </Container2>
              <Container2 classlist="">
                <TextField name="phoneNumber" label="Phone Number" type="text" error={errors.phoneNumber} required />
              </Container2>
            </Group>
            <Container>
              <TextField name="email" label="Email" type="text" error={errors.email} required />
            </Container>
            <Group>
              <Container2 classlist="">
                <TextField name="whatsapp" label="WhatsApp Number" type="text" error={errors.whatsapp} />
              </Container2>
              <Container2 classlist="">
                <TextField name="facebook" label="Facebook" type="text" error={errors.facebook} />
              </Container2>
            </Group>
            <Group>
              <Container2 classlist="">
                <TextField name="instagram" label="Instagram" type="text" error={errors.instagram} />
              </Container2>
              <Container2 classlist="">
                <TextField name="twitter" label="Twitter" type="text" error={errors.twitter} />
              </Container2>
            </Group>
          </div>
          <Container classlist="mb-6">
            <Button id="createAgencyButton" type="submit" text="Create Agency" />
          </Container>
        </Form>
      </div>
      <Alert custom />
    </div>
  );
};

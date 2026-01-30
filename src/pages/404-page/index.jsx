import Header from '../../components/Header';
import { BaseLayout } from '../../layouts/base-layout';
import NotFoundContent from './content';

const PageNotFound = ({ type = 'page', onRetry }) => (
  <BaseLayout className="w-full min-ht-vh relative">
    <Header />
    <NotFoundContent type={type} onRetry={onRetry} />
  </BaseLayout>
);

export default PageNotFound;

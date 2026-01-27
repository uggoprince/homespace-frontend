import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import Header from '../../components/Header';
import LandingPage from '../landing';
import HomeBody from './body';
import Properties from '../../data/property/PropertiesAndDetailsBox';
import '../style.css';
import Search from '../search';
import { BaseLayout } from '../../layouts/base-layout';
import { setNewState } from '../../Utils/Store';

const Home = (props) => {
  const {
    children, qEmpty, start, q,
  } = props;
  const { token } = useAuth();
  const [searchParams] = useSearchParams();

  if (!token && qEmpty === true) {
    const hasQuery = searchParams.has('q');
    if (hasQuery) {
      const qStrValue = searchParams.get('q');
      const startParam = Number.parseInt(searchParams.get('start'), 10) || 0;
      setNewState({ type: 'SEARCH_PROPERTIES', q: qStrValue, start: startParam });
      return <Search />;
    }
    return <LandingPage />;
  }
  if (!token && qEmpty === false) {
    return <Search />;
  }
  return children;
};

class HomePage extends Component {
  componentDidMount() {
    // prepareSearchPageSearch();
  }

  render() {
    const { property } = this.props;
    const { q, propsSearchOffset } = this.props;
    const qEmpty = q === undefined;
    return (
      <Home qEmpty={qEmpty} start={propsSearchOffset} q={q}>
        <BaseLayout className="min-h-svh">
          <Header search={q} offset={propsSearchOffset} />
          <Properties property={property} number={2}>
            {/* <HeaderBottomMargin /> */}
            <HomeBody qEmpty={qEmpty} />
          </Properties>
        </BaseLayout>
      </Home>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(HomePage);

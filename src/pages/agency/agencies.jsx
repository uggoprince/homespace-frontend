/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import Agencies from '../../data/agency/Agencies';
import AgenciesView from '../../data/agency/AgenciesView';
import { GET_AGENCIES } from '../../data/agency/queryString';
import { BaseLayout } from '../../layouts/base-layout';

class AgenciesPage extends Component {
  componentDidMount() {}

  render() {
    const { w } = this.props;
    return (
      <BaseLayout className="min-h-svh">
        <Header />
        <AgenciesView>
          {/* <HeaderBottomMargin /> */}
          <Agencies query={GET_AGENCIES} queryName="getAgencies" />
        </AgenciesView>
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AgenciesPage);

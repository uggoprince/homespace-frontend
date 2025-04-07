/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, { HeaderBottomMargin } from '../../components/Header';
import Agencies from '../../data/agency/Agencies';
import AgenciesView from '../../data/agency/AgenciesView';
import { GET_AGENCIES } from '../../data/agency/queryString';

class AgenciesPage extends Component {
  componentDidMount() {}

  render() {
    const { w } = this.props;
    return (
      <div className="w-full min-ht-vh flex flex-col relative">
        <Header />
        <AgenciesView>
          {/* <HeaderBottomMargin /> */}
          <Agencies query={GET_AGENCIES} queryName="getAgencies" />
        </AgenciesView>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AgenciesPage);

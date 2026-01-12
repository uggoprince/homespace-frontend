/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import AgencyBody from './AgencyBody';
import { BaseLayout } from '../../layouts/base-layout';

class AgencyPage extends Component {
  componentDidMount() {}

  render() {
    const { w } = this.props;
    return (
      <BaseLayout css="w-full min-ht-vh relative">
        <Header />
        <AgencyBody />
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(AgencyPage);

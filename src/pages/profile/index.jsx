import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header';
import { ProfileBody } from './body';
import { BaseLayout } from '../../layouts/base-layout';

class Profile extends Component {
  componentDidMount() {}

  render() {
    return (
      <BaseLayout css="min-h-svh">
        <Header />
        <ProfileBody />
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Profile);

/* eslint-disable react/no-unused-state */
import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Menu from './menu';
import { BaseLayout } from '../../layouts/base-layout';

class DashboardPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <BaseLayout css="min-h-svh">
        <Header />
        <div className="w-full page-content">
          <div className="flex flex-row justify-between fixed w-full">
            <div className={`h-screen box-border
              w-auto border
              border-gray-300
              border-r
              border-l-0
              border-t-0
              border-b-0
              px-2`}
            >
              <Menu />
            </div>
            <div className="box-border flex-auto h-screen overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(DashboardPage);

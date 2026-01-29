import { Component } from 'react';
import { connect } from 'react-redux';
import { BaseLayout } from '../../layouts/base-layout';
import Header from '../../components/Header';
import PropertyBody from './body';

class PropertyPage extends Component {
  componentDidMount() {}

  render() {
    return (
      <BaseLayout className="">
        <Header />
        <PropertyBody />
      </BaseLayout>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(PropertyPage);

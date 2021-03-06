import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';
import { getAllUsers } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import Table from './TableComponent';

class Dashboard =({ getCurrentProfile, auth, profile }) => {

  useEffect(() => {
    getCurrentProfile();
  }, []);

  const { user } = this.props.auth;
  const { profile, loading } = this.props.profile;

  let dashboardContent;

  if (profile === null || loading) {
    dashboardContent = <Spinner />;
  } else {
    dashboardContent = (
      <div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <Table
          list={profile}
        />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboardContent}

          </div>
        </div>
      </div>
    </div>
  );

}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(
  Dashboard
);

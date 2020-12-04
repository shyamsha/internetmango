// Imports
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

// UI Imports
import { Grid, GridCell } from "../../ui/grid";


// App Imports
import Loading from "../common/Loading";
import EmptyMessage from "../common/EmptyMessage";
import AdminMenu from "./common/Menu";
import { getUsers } from '../users/api/actions'


// Component
class User extends PureComponent {
  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getUsers());
  }

  // Runs on client only
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { isLoading, users } = this.props.users;
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Users - Admin - Users</title>
        </Helmet>

        {/* Top menu bar */}
        <AdminMenu />

        {/* Page Content */}
        <div>

          {/* Show users */}
          <Grid alignCenter={true} style={{ padding: "1em" }}>
            <GridCell>
              <table className="striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="6">
                        <Loading message="loading crates..." />
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map(
                      ({
                        id,
                        name,
                        email,
                        createdAt,
                        updatedAt,
                      }) => (
                        <tr key={id}>
                          <td>{name}</td>

                          <td>{email}</td>

                          <td>
                            {new Date(parseInt(createdAt)).toDateString()}
                          </td>

                          <td>
                            {new Date(parseInt(updatedAt)).toDateString()}
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <EmptyMessage message="No crates to show." />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </GridCell>
          </Grid>
        </div>
      </div>
    );
  }
}

// Component Properties
User.propTypes = {
  users: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
};

// Component State
function userState(state) {
  return {
    users:state.users
  };
}

export default connect(userState,{getUsers})(User);

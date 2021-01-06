import React from 'react';

import { Switch, Route, Link, Redirect } from "react-router-dom";

import UserList from '../userList';

import MesageList from '../message';

import '../App.css';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('email');
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn
    }
  }


  render() {

    if (this.state.loggedIn === false) {
      return <Redirect to='/' />
    }
    return (


      <div>


        <header
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#430C3F',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-around',



          }}
        >
          <div>
            {/* <h1>HOME</h1> */}
          </div>
          <div>
            <Link
              to='/logout'
              style={{
                fontSize: '30px',
                textDecoration: 'none',
                border: '3px solid black',
                backgroundColor: 'black',
                borderRadius: '80px',
                color: 'white'
              }}>
              Logout</Link>
          </div>
        </header>


        <Switch>
              <>
          <div className="container" >
            <h3 className=" text-center" > <b style={{ backgroundColor: '#3F0E40', color: 'white' }}>Messenger</b>        </h3>


            <div className="messaging">
              <div className="inbox_msg">
                <div className="inbox_people">


                  {/* LIST */}

                  <Route path='/admin/messages/' component={UserList} />
                  {/* <UserList/> */}

                </div>


                {/* MESSAGES LIST */}
                <div className="mesgs">


                  <Route path='/admin/messages/:id' component={MesageList} />


                </div>
              </div>

            </div>

          </div>
          </>

        </Switch>

      </div>

    )
  }
}
export default Admin;
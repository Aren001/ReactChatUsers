import React from 'react';
import axios from 'axios';


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            list: [],
            mesaGes: {},
            auth: {},
            nameCompany: '',
            inserUsers: [],

            but: false,
            obj: {
                auth_email: localStorage.getItem('email'),
                receiver_id: ''
            },
            search: '',

            col: true,
            seen: true,
            active: null,
        }

        this.loadList = this.loadList.bind(this);
        this.historClick = this.historClick.bind(this);
       
        this.insertUsers = this.insertUsers.bind(this);
        this.handleSearchKeyUp = this.keyUpHandler.bind(this, 'search');


    }

    componentDidMount() {
        // setInterval(this.loadList, 2000);

        this.loadList();
        // this.insertUsers(); //insertic heto karam chgrem




        // console.log(window.location,'href')
        //    console.log(this.props,'props')

    }

    insertUsers() {
        axios.get('https://www.webwork-tracker.com/chat-api/users?user_id=66289')
            .then(resp => {

                console.log(resp, 'LoadUserInsert')
                axios.post('http://127.0.0.1:8000/api/insert-users', { users: resp.data.users }).then((res) => {
                    console.log(res, 'insert');
                })
                this.setState({
                    inserUsers: resp.data.users,
                    nameCompany: resp.data.team_name,
                    auth:resp.data.auth_user

                })
            }).catch(err => console.log(err))
    }





    loadList() {
        if (this.state.obj.auth_email != null) {
            axios.get('http://127.0.0.1:8000/api/users?email=' + this.state.obj.auth_email)
                .then(resp => {
                    console.log(resp, 'LoadUser')
                    this.setState({
                        list: resp.data.users,
                        mesaGes: resp.data.messages,
                        auth: resp.data.auth_user

                    })
                })
        }
    }



    historClick(id) {
        this.props.history.push(`/admin/messages/${id}`);

        this.setState({
            col: false,
            seen: false,
            active: id,


        })

    }

    //Search


    keyUpHandler(refName, e) {

        console.log(e.target.value,'valueE');
        axios.get(`http://127.0.0.1:8000/api/search?search=` + e.target.value).then(resp => {

            // console.log(resp,'searchCons')

                this.setState({
                    list: resp.data,
                    col: true,
                    active: null,
                })

        })
    }



    render() {

        let defaultPng = 'https://simg.nicepng.com/png/small/73-730154_open-default-profile-picture-png.png';

        let myStile = {

            backgroundColor: '#3F0E40',
            position: 'absolute',
            marginLeft: '350px',
            width: '650px',
            height: '545px',
            color: 'white',
            bottom: '-15px'
        }

        return (
            <div>
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h4>  {this.state.auth.name} <span style={{color:'green'}}>✔️ ONLINE</span> <b style={{ color: 'white' }} ></b> </h4>
                    </div>

                </div>
                <div className="headind_srch">
                    {/* SEARCH */}
                    <div className="srch_bar">
                        <div className="stylish-input-group">
                            <input
                                type="text"
                                className="search-bar"
                                placeholder="Search "
                                name='search'
                                ref='search'
                                // value={this.state.search}
                                // onChange={this.onSearch}
                                onKeyUp={this.handleSearchKeyUp}
                            />

                        </div>
                    </div>


                </div>

                <div className="inbox_chat">

                    {this.state.col ? <div style={myStile} >   <h1 style={{ textAlign: 'center', marginTop: '200px' }}>☜ Choose Your Friend</h1>  </div> : null}
                    {
                        this.state.list.map(item => {
                            var classList = 'chat_list ' + (this.state.active === item.id ? 'active' : '');
                            return (
                                // Change if hase alternative way, dont use classname duplicate
                                <div
                                    // className={this.state.active==item.id ? "chat_list active" : "chat_list "  } 
                                    className={classList}
                                    key={item.id}
                                    onClick={() => this.historClick(item.id)}
                                >

                                    <div className="chat_people"  >

                                        <div className="chat_img">
                                            <img src={item.img!=='default.png' ? `https://www.webwork-tracker.com/avatars/${item.img}` : defaultPng} />

                                        </div>
                                        <div className="chat_ib">
                                            <h5> {item.name} {item.lastname}
                                                {/* ONLINE OFLINE */}
                                                {/* {this.state.obj.auth_email === item.email ? <span className="chat_date" style={{ color: 'green' }}> <b>Online</b></span> : <span className="chat_date" ><b> OFline </b></span>} */}
                                            </h5>
                                            {
                                                this.state.seen ? <b style={{ color: 'white' }}> {
                                                    this.state.mesaGes[item.id]
                                                }</b> : null
                                            }



                                        </div>


                                    </div>


                                </div>


                            )
                        })
                    }

                </div>

            </div>
        )
    }
}
export default UserList;


// onSearch(e) {
//     this.setState({
//         [e.target.name]: e.target.value
//     })
//     axios.get('http://127.0.0.1:8000/api/search?search=' + this.state.search).then(resp => {
//         console.log(resp, 'search');

//         if (this.state.search !== '' ) {
//             this.setState({
//                 list: resp.data,
//                 col: true,
//                 active: null,
//             })
//         } else {

//             this.loadList();

//         }

//     })

// }
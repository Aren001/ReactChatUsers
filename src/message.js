import React from 'react';

import axios from 'axios';

import Loading from './Loading/loading';



class MesageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            mesages: [],
            list: [],

            addMes: {

                email: '',
                creator_id: '',
                receiver_id: '',
                seen: '',
                input: '',

            },

         
        }
        this.loadMesage = this.loadMesage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        

    }

    /////////////////
    componentDidMount() {
        const Id = this.props.match.params.id;
        // console.log(Id, 'id')
        this.loadMesage(Id);
        // setInterval(this.loadMesage(Id), 2000);

        this.loadList();
        console.log(this.props, 'props')

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname !== nextProps.location.pathname) {
            //  new User id 
            const Id = nextProps.match.params.id;
            console.log(this.props);

            this.loadMesage(Id);
        }
    }


    //////////////

    //GET MESSAGES
    loadMesage(id) {
        
        // const Id = this.props.match.params.id;
        this.setState({
            loading:true
        })
        axios.get(`http://127.0.0.1:8000/api/messages/${id}/?email=` + localStorage.getItem('email'))
            .then(resp => {
                console.log(resp, "messagesResp")
                this.setState({
                    mesages: resp.data,
                  
                    addMes: {
                        email: localStorage.getItem('email'),
                        creator_id: '',
                        receiver_id: this.props.match.params.id,
                        seen: 0,
                        input: '',
                    },
                    loading:false,
                })

            })
    }
    //GET USERS
    loadList = () => {
        axios.get('http://127.0.0.1:8000/api/users?email='+localStorage.getItem('email'))
            .then(resp => {
                console.log(resp,'creat');
                this.setState({
                    list: resp.data.users,
                    team_id:resp.data.team_id

                })
            })
    }

    //ADD MESSAGE
    handleChange(e){
        e.preventDefault();
        const mes = {
            email: localStorage.getItem('email'),
            receiver_id: this.props.match.params.id,
            message: this.state.addMes.input,
        };

        axios.post('http://127.0.0.1:8000/api/messages/add', mes)
            .then(resp => {
                // console.log(resp,'ADD');
                this.loadMesage(this.props.match.params.id);
            })
    }

  
    

   

    //CONVER TIME
    convert = (a) => {
        a = new Date(String(a));
        return a.toLocaleString();;
    }

    //DELETE MESSAGES
    deleteMes(id) {
        axios.delete(`http://127.0.0.1:8000/api/messages/delete/${id}`)
            .then(resp => {
                // console.log(resp,'del')
        const Id = this.props.match.params.id;
        this.loadMesage(Id);
            })
    }



    render() {
        let defaultPng = 'https://simg.nicepng.com/png/small/73-730154_open-default-profile-picture-png.png';

        if(this.state.loading){
            return <Loading/>
        }


        return (
            <div >
        
               <div className='authName'>sssssssssssssssssss</div>
                <div className='msg_history'>
                
                    
               
                           
                            {
                                this.state.mesages.map(item => {
                                    // console.log(item)


                                    return (
                                        <div key={item.id}>
                                            
                                            <div className={item.receiver_id === Number(this.props.match.params.id) ? 'outgoing_msg': "incoming_msg" }>
                                                
                                                <div className={item.receiver_id === Number(this.props.match.params.id) ? "sent_msg" : "received_msg"  }>
                                                    

                                                <div 
                                                    className="incoming_msg_img"
                                                    className={item.receiver_id === Number(this.props.match.params.id) ?  "none"  : "incoming_msg_img" }
                                                    >   
                                                    {/* IMG */}
                                                         {this.state.list.map(e => { 
                                                        if(e.id===item.creator_id){
                                                        // console.log(e.img,e.name,'e')
                                                        return <img key={e.id} src={e.img!=='default.png' ? `https://www.webwork-tracker.com/avatars/${e.img}` : defaultPng} alt={e.id} /> 
                                                        }
                                                        })}  </div>


                                                    <div className="received_withd_msg">
                                                       

                                                        <p onDoubleClick={() => this.deleteMes(item.id)} className='mesHov'> {item.message} </p>
                                                        <div className='delete'>⚠️DoubleClick DELETE MESSAGES</div>

                                                        
                                                        <span className="time_date"> {this.convert(item.created_at)} </span></div>
                                                       
                                                </div>
                                            </div>
                                  
                                        </div>
                                    )

                                })

                            }

                           
                   </div> 
                   <div className="type_msg">
                                <div className="input_msg_write">
                                    <form onSubmit={this.handleChange}>
                                        <input
                                            type="text"
                                            className="write_msg"
                                            placeholder="Type a message"
                                            value={this.state.addMes.input}
                                            onChange={(e) => {
                                                let { addMes } = this.state;
                                                addMes.input = e.target.value;
                                                this.setState({ addMes })
                                            }}
                                        />
                                    <button
                                            className="msg_send_btn"
                                            type="submit"
                                            // onClick={this.addMessage}
                                        >S</button>  
                                         
                                    </form>
                                    
                                </div>
                                
                            </div>
                            
                   
            </div>
        )
    }

}
export default MesageList;
import React from "react";
import logo from './logo.svg';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {Header,Menu} from './Header'
import {TodoList} from './TodoList'

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[
            {
                text:"Home",
                link:"/home"
            },
            {
                text:"Login",
                link:"/login"
            },
            {
                text:"Users",
                link:"/users"
            },
            {
                text:"TodoList",
                link:"/todolist"
            }
        ]
    }
    }

    toggleActive=(text)=>{
        
        this.state.items.forEach((item)=>item.active=false);
        let item = this.state.items.find(x=>x.text==text);
        item.active = !item.active
        this.setState({items:this.state.items});
    }


    render(){
        return <Router>
            <Header title="ReactJs Application" logo={logo} menu={this.state.items} toggleActive={this.toggleActive} />
            <Switch>
                <Route path="/users" >
                    <UserList />
                </Route>
                <Route path="/login" >
                    <Login />
                </Route>
                <Route path="/todolist" >
                    <TodoList />
                </Route>
                <Route path="/" >
                    <Home />
                </Route>
            </Switch>
        </Router>
    }
}


class Home extends React.Component{
    render(){
        return <div>Welcome to home page</div>;
    }
}

class UserList extends React.Component{

    constructor(){
        super();
        this.state={
            users:[],
            loading:false
        };
    }

    async componentDidMount(){
        this.setState({loading:true});
        setTimeout(async ()=>{

        
        let res= await fetch("https://reqres.in/api/users?page=2",{
            method:"GET",
            headers:{
                "content-type":"application/json"
            }
        });
        let resJson = await res.json();
        this.setState({users:resJson.data,loading: false});
    },5000)
    }

    render(){
        return <div>
            {!this.state.loading ? this.state.users.map((item)=>{
                return <UserView key={item.id}  user={item} />
            }): "Loading Users"}
        </div>
    }
}

class Login extends React.Component{
    
    constructor(){
        super();
        this.state={
            username:"",
            email:"",
            password:""
        }
    }

    setInputValue=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    login=async ()=>{
        let user = {
            email:this.state.email,
            password:this.state.password
        }
        let res= await fetch("https://reqres.in/api/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(user)
        });
        let resJson = await res.json();
        if(resJson.token){
            alert("Login success");
        }else{
            alert(resJson.error)
        }
    }

    render(){
        return <div>
            <h1>Login</h1>
            Username:<input type="text" value={this.state.username} onChange={this.setInputValue} name="username" /><br/>
            Password:<input type="password" value={this.state.password} onChange={this.setInputValue} name="password" /><br/>
            Email:<input type="email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})} name="email" /><br/>
            <button onClick={this.login}>Login</button>
        </div>
    }
}

class UserView extends React.Component{
    constructor(){
        super();
        
    }

    render(){
        return <div>
            <img src={this.props.user.avatar} style={{width:100,height:100}} /><br/>
            <span>{this.props.user.first_name} {this.props.user.last_name}</span>
            <div>Email : {this.props.user.email}</div>
        </div>
    }
}


export default App;
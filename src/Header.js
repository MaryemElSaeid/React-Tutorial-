import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import { buildQueries } from '@testing-library/dom';




class Header extends React.Component{

    render(){
        let h1Style={
            display:"inline-block"
        }

        return <div>
            <h1 style={h1Style} >{this.props.title}</h1>
            <Menu items={this.props.menu} toggleActive={this.props.toggleActive} />
        </div>
    }
}

Header.defaultProps ={
    title:"Website Title"
}

Header.propTypes = {
    title:PropTypes.string
}

class Menu extends React.Component{

    constructor(props){
        super();
        
    }

    render(){
        return <div>
            {this.props.items.map((item,i)=>{
                return <Link key={item.text} style={{fontSize:"30px",color:"black"}} onClick={()=>this.props.toggleActive(item.text)} to={item.link} > {item.text} </Link>
            })}
        </div>
    }
}

Menu.defaultProps={
    items:[]
}

export {Header,Menu};

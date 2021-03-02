
import React from 'react';
import { Fragment } from 'react';
import './App.css';
import Input from './Input/Input';
import Output from './Output/Output';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { Button } from '@material-ui/core';



const cred_data = [
  {
    username: 'SAustin',
    password: 'Stunner99'
  },
  {
    username: 'Rockie',
    password: 'RockJ99'
  },
  {
    username: 'Kurtle',
    password: 'Angle99'
  }
];
const REST_API_URL = 'http://localhost:8080/api/wrestlers';
class App extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = { 
      username : '', 
      password : '',
      data : [{
        username: 'SAustin',
        password: 'Stunner99'
      },
      {
        username: 'Rockie',
        password: 'RockJ99'
      },
      {
        username: 'Kurtle',
        password: 'Angle99'
      }],
      wrestlers : [],
      wrestler_data : { 
        id : null,
        name : null,
        mail : null,
        city : null
      },
      valid : false,
      id: null,
      name:null,
      mail:null,
      city:null
    };
  }
  componentDidMount()
  {
    this.setState({data : cred_data});
    axios.get(REST_API_URL).then((response) => {
      this.setState({wrestlers : response.data})
    } );

  }
  handleChange = (event) => {
    if(event.target.name === 'id')
    {
      this.setState({id : event.target.value});
    }
    else if(event.target.name === 'name')
    {
      this.setState({name : event.target.value});
    }
    else if(event.target.name === 'mail')
    {
      this.setState({mail : event.target.value});
    }
    else
    {
      this.setState({city : event.target.value});
    }
    
  }
  handleSubmit = (event) =>
  {
    event.preventDefault();
    var flag= 0;
    for(var i=0;i<this.state.data.length;i++)
    {
      if(this.state.data[i].username === this.state.username && this.state.data[i].password === this.state.password)
      {
        flag = 1;
        break;
      }
      continue;
    }
    if(flag === 1)
    {
      alert('Login access cleared');
      this.setState({valid : true});
    }
    else
    {
      alert('invalid credentials');
    }
  }
  handleCallback = () =>
  {
    alert('CALLBACK!');
  }
  handleAdd = () =>
  {
    alert('Add');
    const data = {
      name : this.state.name,
      mail : this.state.mail,
      city : this.state.city
    }
    axios.post(REST_API_URL, data).then(
      response => {
        console.log(response.data);
      }
    );
    
  }
  handleSearch = () =>
  {
    alert('search');
    const URL = REST_API_URL + '/'+ this.state.id;
    axios.get(URL).then(
      response => {
        console.log(response.data);
      }
    )
  }
  handleUpdate = () =>
  {
    alert('update');
    const data = {
      id : this.state.id,
      name : this.state.name,
      mail : this.state.mail,
      city : this.state.city
    }
    axios.put(REST_API_URL, data).then(
      response => {
        console.log(response.data);
      }
    );
  }
  handleDelete = () =>
  {
    alert('delete');
    const URL = REST_API_URL + '/'+ this.state.id;
    axios.delete(URL)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  render(){
  return (<div>
    <h1 className="text-center">Roster</h1>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <td>Id</td>
          <td>Name</td>
          <td>Mail</td>
          <td>City</td>
        </tr>
      </thead>
      <tbody>
        {
          this.state.wrestlers.map((wrestler) => 
          <tr key={wrestler.id}>
            <td>{wrestler.id}</td>
            <td>{wrestler.name}</td>
            <td>{wrestler.mail}</td>
            <td>{wrestler.city}</td>
          </tr>
          )
        }
      </tbody>
    </table>
   
    <Fragment>
      <div className="form-group row">
        <div className="col-sm-4"></div>
        <div className="col-sm-3">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" className="form-control form-control-lg" 
          name="id" value={this.state.id} onChange={this.handleChange} />
          </div>
      </div>
      <div className="form-group row">
      <div className="col-sm-4"></div>
        <div className="col-sm-3">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="form-control form-control-lg" 
          name="name" value={this.state.name} onChange={this.handleChange} />
          </div>
      </div>
      <div className="form-group row">
      <div className="col-sm-4"></div>
        <div className="col-sm-3">
          <label htmlFor="mail">Mail</label>
          <input type="text" id="mail" className="form-control form-control-lg" 
          name="mail" value={this.state.mail} onChange={this.handleChange} />
          </div>
      </div>
      <div className="form-group row">
      <div className="col-sm-4"></div>
        <div className="col-sm-3">
          <label htmlFor="city">City</label>
          <input type="text" id="city" className="form-control form-control-lg" 
          name="city" value={this.state.city} onChange={this.handleChange} />
          </div>
      </div>
    </Fragment>
    <div className="row">
    <div className="col-sm-1"></div>
    <div className="col-sm-1">
      <button className="btn btn-success btn-lg btn-block active" onClick={this.handleAdd}>Add</button>
    </div>
    <div className="col-sm-1"></div>
    <div className="col-sm-1">
      <button className="btn btn-primary btn-lg btn-block active" onClick={this.handleSearch}>Search</button>
    </div>
    <div className="col-sm-1"></div>
    <div className="col-sm-1">
      <button className="btn btn-dark btn-lg btn-block active" onClick={this.handleUpdate}>Update</button>
    </div>
    <div className="col-sm-1"></div>
    <div className="col-sm-1">
      <button className="btn btn-warning btn-lg btn-block active" onClick={this.handleDelete}>Delete</button>
    </div>
    </div>
   
  </div>);
}
}

export default App;

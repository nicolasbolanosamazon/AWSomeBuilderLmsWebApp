import React from "react";
import './admin.css'
import { useNavigate } from 'react-router-dom';

class AdminComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            items: [],
            name: '',
            description: ''
        };
    
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/tenant_managment/get_tenants'
        let token = 'Bearer ' + localStorage.getItem('id_token')
        return fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": token
          }
        })
        .then((res) => res.json())
        .then(
        (result) => {
            this.setState({
            isLoaded: true,
            items: result['Items']
            });
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isLoaded: false
        })
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/onboard_tenant'
        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tenantName : this.state.name,
                tenantDescription: this.state.description
            })
        }).then((res) => {
            this.getData()
            alert('Tenant Succesfully Registered')
        })
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name === 'TenantName'){
            this.setState({
                name: value
            })
        }else{
            this.setState({
                description: value
            })
        }
        
    }

    handleNavigate = (id) => {
        this.props.navigate('/tenantDetail', { state : {tenantId: id}})
    }

    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let renderedItems = items.map((row, index) =>{
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{row.tenant_id}</td>
                        <td>{row.tenantName}</td>
                        <td>{row.tenantDescription}</td>
                        <td>{row.isActive? 'Active' : 'Disabled'}</td>
                        <td><button class="btn btn-primary" onClick={() => this.handleNavigate(row.tenant_id)}>View Detail</button></td>
                    </tr>
                )
            })
            return(
                <div>
                    <h1>Welcome to Ocktank LMS Admin Portal</h1>
                    <div>
                        <table class="table caption-top table-striped">
                        <caption>List of Tenants</caption>
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col">Detail</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {renderedItems}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h3>Register a new Tenant</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label for="InputTenantName">Tenant Name</label>
                                <input type="text" name="TenantName" class="form-control" id="InputTenantName" aria-describedby="Name" placeholder="Enter tenant name" onChange={this.handleChange}/>
                                <small id="Name" class="form-text text-muted">This name will be used in your costs reports.</small>
                            </div>
                            <div class="form-group">
                                <label for="InputTenantDescription">Tenant Description</label>
                                <input type="text" name="TenantDescription" class="form-control" id="InputTenantDescription" aria-describedby="Description" placeholder="Enter tenant description" onChange={this.handleChange}/>
                                <small id="Description" class="form-text text-muted">Any relvant information!.</small>
                            </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            )
        }
        
        
    }
}

function Admin(props) {
    let navigate = useNavigate();
    return <AdminComponent {...props} navigate={navigate} />
}

export default Admin;
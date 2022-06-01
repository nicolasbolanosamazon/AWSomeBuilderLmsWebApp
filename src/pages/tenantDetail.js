import React from "react";
import { useLocation } from 'react-router-dom';

class TenantDetailComponent extends React.Component{
    constructor(props){
        super(props);
        const {tenantId} = this.props.state
        this.state = {
            id: tenantId,
            error: undefined,
            isLoaded: false,
            tenantInfo: undefined,
            newTenantInfo: undefined,
            editTenant: false,
            secretURL: '',
            users: [],
            newUser: undefined
        }

        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/tenant_managment/get_tenant/' + this.state.id
        return fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then((res) => res.json())
        .then(
        (result) => {
            const tenant = result['Item']
            const credsArr = tenant.dbCredentialsARN.split(':')
            const credsURL = ['https://', credsArr[3], '.console.aws.amazon.com/secretsmanager/home?region=', credsArr[3], '#!/secret?name=', this.state.id].join().replaceAll(',','')
            this.setState({
                tenantInfo: {
                    tenantName: tenant.tenantName,
                    dbCredentialsARN: tenant.dbCredentialsARN,
                    isActive: tenant.isActive,
                    tenantDescription: tenant.tenantDescription,
                    tenant_id: tenant.tenant_id
                },
                newTenantInfo: {
                    tenantName: tenant.tenantName,
                    dbCredentialsARN: tenant.dbCredentialsARN,
                    isActive: tenant.isActive,
                    tenantDescription: tenant.tenantDescription,
                    tenant_id: tenant.tenant_id
                },
                secretURL: credsURL
            });
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        ).then(() =>{
            let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/user_manager/get_users/' + this.state.id
            fetch(url, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
              })
              .then((res) => res.json())
              .then(
                (result) => {
                    this.setState({
                    isLoaded: true,
                    users: result['Users'],
                    newUser:{
                        email: '',
                        full_name: '',
                        role: ''
                    }
                    });
                },
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
                    });
                }
              );
        });
    }

    handleChange = (event) => {
        switch(event.target.name){
            case 'TenantName':
                this.setState(prevState => ({
                    newTenantInfo: {
                        ...prevState.newTenantInfo,
                        tenantName: event.target.value
                    }
                }));
                break;
            case 'TenantDescription':
                this.setState(prevState => ({
                    newTenantInfo: {
                        ...prevState.newTenantInfo,
                        tenantDescription: event.target.value
                    }
                }));
                break;
            case 'TenantActive':
                let info = this.state.newTenantInfo
                info.isActive = event.target.checked
                this.setState(({newTenantInfo}) =>({newTenantInfo: info}))
                break;
            case 'UserEmail':
                this.setState(prevState => ({
                    newUser: {
                        ...prevState.newUser,
                        email: event.target.value
                    }
                }));
                break;
            case 'UserFullName':
                this.setState(prevState => ({
                    newUser: {
                        ...prevState.newUser,
                        full_name: event.target.value
                    }
                }));
                break;
            case 'UserRole':
                this.setState(prevState => ({
                    newUser: {
                        ...prevState.newUser,
                        role: event.target.value
                    }
                }));
                break;
        }
    }

    handleTenantSubmit = (event) => {
        event.preventDefault();
        this.setState({
            isLoaded: false,
            editTenant: false
        })
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/tenant_managment/update_tenant'
        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tenant_id: this.state.id,
                tenantName : this.state.newTenantInfo.tenantName,
                tenantDescription: this.state.newTenantInfo.tenantDescription,
                isActive : this.state.newTenantInfo.isActive
            })
        }).then((res) => {
            this.getData()
            alert('Tenant Succesfully Updated')
        })
    }

    handleUserSubmit = (event) => {
        event.preventDefault()
        this.setState({
            isLoaded: false
        })
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/user_manager/create_user'
        fetch(url, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tenant_id : this.state.id,
                userEmail: this.state.newUser.email,
                full_name: this.state.newUser.full_name,
                role: this.state.newUser.role
            })
        }).then((res) => {
            this.getData()
            alert('User Succesfully Registered')
        })
    }



    render(){
        const {id, error, isLoaded, tenantInfo, editTenant, secretURL, newTenantInfo, users} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let renderedUsers = users.map((user, index) =>{
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.Username}</td>
                        <td>{user.Attributes[0].Value}</td>
                        <td>{user.Attributes[3].Value}</td>
                        <td>{user.Attributes[4].Value}</td>
                        <td>{user.Enabled? 'Enabled' : 'Disabled'}</td>
                        <td>{user.UserStatus}</td>
                    </tr>
                )
            })
            return(
                <div>
                    <h1>Welcome to {tenantInfo.tenantName}</h1>
                    <div>
                        <h3>Tenant Information</h3>
                        <hr/>
                        <form onSubmit={this.handleTenantSubmit}>
                            <fieldset disabled={editTenant? '': 'disbaled'}>
                                <h5>Tenant Id: {id}</h5>
                                <div class="form-group">
                                    <label for="InputTenantName">Tenant Name</label>
                                    <input type="text" name="TenantName" class="form-control" id="InputTenantName" aria-describedby="Name" placeholder={newTenantInfo.tenantName} onChange={this.handleChange}/>
                                    <small id="Name" class="form-text text-muted">This name will be used in your costs reports.</small>
                                </div>
                                <div class="form-group">
                                    <label for="InputTenantName">Tenant Description</label>
                                    <input type="text" name="TenantDescription" class="form-control" id="InputTenantName" aria-describedby="Name" placeholder={newTenantInfo.tenantDescription} onChange={this.handleChange}/>
                                </div>
                                <a href={secretURL}>Database Credentials</a>
                                <div class="form-check">
                                    <input type="checkbox" name="TenantActive" class="form-check-input" id="Check1" checked={newTenantInfo.isActive} onChange={(event) => {this.handleChange(event)}}/>
                                    <label class="form-check-label" for="Check1">Is Active</label>
                                </div>
                                <button type="submit" class="btn btn-success">Update Tenant</button>
                                
                            </fieldset>
                        </form>
                        <br/>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="editCheck" checked={editTenant} onChange={(event) => {this.setState({editTenant: event.currentTarget.checked})}}/>
                            <label class="form-check-label" for="editCheck">
                                Edit Tenant
                            </label>
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <h4>Tenant Users</h4>
                        <div>
                            <table class="table caption-top table-striped">
                            <caption>List of Tenant Users</caption>
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Is Enabled</th>
                                    <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    {renderedUsers}
                                </tbody>
                            </table>
                            <br/>
                            <hr/>
                        </div>
                    </div>
                    <div>
                        <h3>Create new user</h3>
                        <form onSubmit={this.handleUserSubmit}>
                            <div class="form-group">
                                <label for="InputUserEmail">User Email</label>
                                <input type="email" name="UserEmail" class="form-control" id="InputUserEmail" aria-describedby="UserEmail" placeholder="Enter user email" onChange={this.handleChange}/>
                                <small id="Email" class="form-text text-muted">Email must not already exist.</small>
                            </div>
                            <div class="form-group">
                                <label for="InputUserFullName">User Full Name</label>
                                <input type="text" name="UserFullName" class="form-control" id="UserFullName" aria-describedby="UserFullName" placeholder="Enter user full name" onChange={this.handleChange}/>
                            </div>
                            <div class="form-group">
                                <label for="InputUserRole">User Role</label>
                                <select id="InputUserRole" name='UserRole' class="form-control" onChange={this.handleChange}>
                                    <option selected>Choose...</option>
                                    <option>Student</option>
                                    <option>Teacher</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

function TenantDetail(props) {
    const {state} = useLocation()
    return <TenantDetailComponent {...props} state={state}/>
}

export default TenantDetail;
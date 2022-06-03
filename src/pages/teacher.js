import React from "react";
import { useNavigate } from "react-router-dom";

class TeacherComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: undefined,
            isLoaded: false,
            courses: [],
            tokenDecoded: undefined
        };
    }

    componentDidMount(){
        if(localStorage.getItem('id_token') != null){
            this.setState({
                tokenDecoded: this.parseJwt(localStorage.getItem('id_token'))
            })
        }
        this.getCourses()
    }

    getCourses() {
        let url = 'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/lms/course_manager/get_courses'
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
              courses: result['Courses']
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

    parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    render(){
        const { error, isLoaded, courses, tokenDecoded } = this.state;
        if (tokenDecoded == null){
            console.log(localStorage.getItem('id_token'))
            console.log(tokenDecoded)
            return <div>You must be logged in to access this page</div>
        }
        if(tokenDecoded['custom:tenant_user_role'] != 'Teacher'){
            return <div>This user doesn't have a Teacher role. Access Denied</div>
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let renderedItems = courses.map((row, index) =>{
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{row.course_id}</td>
                        <td>{row.teacher_id}</td>
                        <td>{row.course_name}</td>
                        <td>{row.course_description}</td>
                        <td><button class="btn btn-primary" onClick={() => this.handleNavigate(row.course_id)}>View Detail</button></td>
                    </tr>
                )
            })
            return(
                <div>
                    <h1>Welcome to Ocktank LMS Teacher Portal</h1>
                    <div>
                    <table class="table caption-top table-striped">
                            <caption>List of Courses</caption>
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Course ID</th>
                                    <th scope="col">Teacher ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Detail</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    {renderedItems}
                                </tbody>
                            </table>
                    </div>
                </div>
            )
        }
    }
}

function Teacher(props){
    let navigate = useNavigate();
    return <TeacherComponent {...props} navigate={navigate} />
}

export default Teacher;
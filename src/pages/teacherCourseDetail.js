import React from "react";
import { useLocation } from "react-router-dom";

class TeacherCourseDetailComponent extends React.Component {
    constructor(props){
        super(props);
        const {courseId} = this.props.state
        this.state = {
            id: courseId,
            error: undefined,
            isLoaded: false,
            students: [],
            courseInfo: undefined
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        let url =  'https://h0e50dpirb.execute-api.us-east-1.amazonaws.com/dev/lms/course_manager/get_course/' + this.state.id
        let token = 'Bearer ' + localStorage.getItem('id_token')
        return fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
          }
        })
        .then((res) => res.json())
        .then(
            (result) => {
                let course = result['course']
                this.setState({
                    courseInfo: result['course'],
                    /*
                    courseInfo: {
                        id: course['course_id'],
                        teacher_id: course['teacher_id'],
                        course_name: course['course_name'],
                        course_description: course['course_description']
                    }
                    */
                    students: result['students'],
                    isLoaded: true
                })
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    render(){
        const {id, error, isLoaded, courseInfo, students} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            let renderedStudents = students.map((user, index) =>{
                return (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{user.user_id}</td>
                        <td>{user.full_name}</td>
                        <td>{user.email}</td>
                        <td>{user.grade}</td>
                        <td><button class="btn btn-primary" onClick={() => {}}>Grade Student</button></td>
                    </tr>
                )
            })
            return(
                <div>
                     <h1>Welcome to Course: {courseInfo.course_name}</h1>
                     <div>
                        <table class="table caption-top table-striped">
                        <caption>List of Students</caption>
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Student user ID</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Grade</th>
                                <th scope="col">Update Grade</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                {renderedStudents}
                            </tbody>
                        </table>
                    </div>

                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function TeacherCourseDetail(props){
    const {state} = useLocation()
    return <TeacherCourseDetailComponent {...props} state={state}/>
}

export default TeacherCourseDetail;
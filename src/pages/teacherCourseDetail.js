import React from "react";

class TeacherCourseDetailComponent extends React.Component {
    constructor(props){
        super(props);
        const {courseId} = this.props.state
        this.state = {
            id: courseId,
            error: undefined,
            isLoaded: false
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
                //TODO
            }
        )
    }
}
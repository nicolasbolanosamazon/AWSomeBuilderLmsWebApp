import React from "react";
import { useNavigate } from "react-router-dom";

class StudentComponent extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){

    }

    render(){
        return(
            <>
                <h1>Hello Students</h1>
            </>
        )
    }
}

function Student(props){
    let navigate = useNavigate();
    return <StudentComponent {...props} navigate={navigate} />
}

export default Student;
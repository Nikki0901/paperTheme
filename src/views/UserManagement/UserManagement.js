import React  from 'react';
import MaterialTable from 'material-table';
import axios from "axios";



const columns = [
    {
      title:"ID", field:"id",
      cellStyle: {
        // backgroundColor: '#039be5',
        // color: '#FFF',
      },
      width: "6%"
    },
    {
        title:"Name", field:"name",
        width: "24%"
    },
    {
        title:"Email", field:"email",
        width: "25%"
    },
    {
        title:"Body", field:"body",
        width: "45%"
    },
]

class UserManagement extends React.Component {
  constructor(){
    super();
    this.state={
      dataItem:[]
    }
  }

  componentDidMount(){
    this.getData();
  }

  getData(){
    axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then(res =>{
      // console.log(res.data);  
      this.setState({dataItem:res.data})
    })
    .catch((e)=>{
      console.log(e)
    })
  }

    render(){
      console.log(this.state.dataItem);
      return (
        <div className="content">
            <MaterialTable
             title="User List" 
            data={this.state.dataItem}
            columns={columns}
            // options={{              
            //   headerStyle: { backgroundColor: "black", color: "white" }
            // }}
            />
       
        </div>
    );
  }
   
}

export default UserManagement;

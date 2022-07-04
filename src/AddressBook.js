
import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import ModalForm from "./ModalForm";
import DataTable from "./DataTable";

class AddressBook extends React.Component {
    constructor(props) {
        super();
        
        this.state = {people: null};  
    }

    componentDidMount(){
        fetch("http://localhost:8080/people")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    people: result,
                    isLoaded: true,
                });
            },
            (error) => {
                this.setState({
                isLoaded: false,
                error
                });
            }
        )
    }
  
    render() {
        const { error, isLoaded, people } = this.state;
        
        
        if (error) {
            return <div>Error: {error.message}</div>;
            
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return (
                <Container className="App">
                    <Row>
                    <Col>
                        <h1 style={{margin: "20px 0"}}>People</h1>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        <DataTable people={people} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                        {/* <CSVLink
                        filename={"db.csv"}
                        color="primary"
                        style={{float: "left", marginRight: "10px"}}
                        className="btn btn-primary"
                        data={this.state.items}>
                        Download CSV
                        </CSVLink> */}
                        <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState} />
                    </Col>
                    </Row>
                </Container>
               
            );
            }
    }
  }

  export default AddressBook;
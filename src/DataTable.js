import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from './ModalForm'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Сигурни ли сте, че желаете да изтриете записа?')
    if(confirmDelete){
      fetch('http://localhost:8080/people/' + id, {
      method: 'delete'
      
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  render() {

    const people = this.props.people.map(person => {
      return (
        <tr key={person.id}>
          <th scope="row">{person.id}</th>
          <td>{person.fullName}</td>
          <td>{person.pin}</td>
          <td>
            <div style={{width:"400px"}}>
              <ModalForm buttonLabel="Редактиране" person={person} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(person.id)}>Изтриване</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>PIN</th>
          </tr>
        </thead>
        <tbody>
          {people}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    fullName: '',
    pin: '',
    mails: '',
    addresses: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8080/people', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: this.state.fullName,
        pin: this.state.pin,
        mails: this.state.mails,
        addresses: this.state.addresses
      })
    })
      .then(response => response.json())
      .then(person => {
        if(Array.isArray(person)) {
          this.props.addItemToState(person[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:8080/people', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        fullName: this.state.fullName,
        pin: this.state.pin,
        mails: this.state.mails,
        addresses: this.state.addresses
      })
    })
      .then(response => response.json())
      .then(person => {
        if(Array.isArray(person)) {
          this.props.updateState(person[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.person){
      const { id, fullName, pin, mails, addresses } = this.props.person
      this.setState({ id, fullName, pin, mails, addresses })
    }
  }

  render() {

    return (
      <Form onSubmit={this.props.person ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="fullName">Full Name</Label>
          <Input type="text" name="fullName" id="fullName" onChange={this.onChange} value={this.state.fullName === null ? '' : this.state.fullName} />
        </FormGroup>
        <FormGroup>
          <Label for="last">PIN</Label>
          <Input type="text" name="pin" id="pin" onChange={this.onChange} value={this.state.pin === null ? '' : this.state.pin}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.props.person.mails[0].email == undefined ? '' : this.props.person.mails[0].email}  />
        </FormGroup>
        <FormGroup>
          <Label for="emailType">Email Type</Label>
          <Input type="text" name="emailType" id="emailType" onChange={this.onChange} value={this.props.person.mails[0].emailType === null ? '' : this.props.person.mails[0].emailType } />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" onChange={this.onChange} value={this.props.person.addresses[0].addrInfo  === null ? '' : this.props.person.addresses[0].addrInfo} />
        </FormGroup>
        <FormGroup>
          <Label for="addressType">Address Type</Label>
          <Input type="text" name="addressType" id="addressType" onChange={this.onChange} value={this.props.person.addresses[0].addrType  === null ? '' : this.props.person.addresses[0].addrType}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
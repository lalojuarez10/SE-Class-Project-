// Guest checkout component
// Modal to be displayed after customer hits the checkout Button

import React, { Component } from 'react';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Form,
  FormGroup,
  Input
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGuestItems } from '../actions/guestItemActions';
import { loadGuest } from '../actions/guestActions';
import PropTypes from 'prop-types';

class GuestCheckoutModal extends Component {
  // State of the component
  state = {
    modal: false
  }

  // Prop-types to document the intended types of properties passed to components
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    loadGuest: PropTypes.func.isRequired
  }

  // Toggle the modal to open and close
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  // For user input on the UI
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.toggle();
  }

  componentDidMount() {
    this.props.getGuestItems(this.props.guest.guest.guest._id);
    console.log(this.props.guest.guest.guest._id);
  }

  render() {
    return (
      <Container>
        <Button
          color="dark"
          style={{ marginTop: '2rem' }}
          block
          onClick={this.toggle}
        >
          Proceed to Checkout
          </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}> Checkout</ModalHeader>
          <ModalBody>
            <Label>Reivew Items</Label>
            <ListGroup>
              <TransitionGroup className="guest-checkout-list">
                {this.props.item.items.map(({ _id, name }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      {name}
                    </ListGroupItem>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
            <Container>
              Enter Shipping Address Information
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="name"> Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Label for="name"> Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Label for="name"> Street Address </Label>
                  <Input
                    type="streetAddres"
                    name="streetAddress"
                    id="streetAddress"
                    placeholder="streetAddress"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Label for="name"> City</Label>
                  <Input
                    type="city"
                    name="city"
                    id="city"
                    placeholder="city"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Label for="name"> State</Label>
                  <Input
                    type="state"
                    name="state"
                    id="state"
                    placeholder="state"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Label for="name"> Zip Code</Label>
                  <Input
                    type="zipcode"
                    name="zipcode"
                    id="zipcode"
                    placeholder="zipcode"
                    className="mb-3"
                    onChange={this.onChange}>
                  </Input>
                  <Button
                    color="dark"
                    style={{ marginTop: '2rem' }}
                    block>
                    Place your order
                    </Button>
                </FormGroup>
              </Form>
            </Container>
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  item: state.guestItems,
  guest: state.guest
})

export default connect(mapStateToProps, { getGuestItems, loadGuest })(GuestCheckoutModal);
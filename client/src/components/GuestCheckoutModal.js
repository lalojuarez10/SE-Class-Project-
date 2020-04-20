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
  Input,
  Alert
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getGuestItems } from '../actions/guestItemActions';
import { loadGuest } from '../actions/guestActions';
import PropTypes from 'prop-types';
import ShippingAddressModal from './ShippingAddressModal';

const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

let websiteKey = "18911612130131961";
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);

let client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

class GuestCheckoutModal extends Component {
  // State of the component
  state = {
    modal: false,
    name: '',
    email: '',
    streetAddres: '',
    cityAddress: '',
    stateAddress: '',
    zipcode: '',
    correctAddress: true
  };

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

  updateCorrectAddress = (solidAddress) => {
    this.setState({
      correctAddress: solidAddress
    });

    if (this.correctAddress) {
      this.toggle();
    }
  }

  // For user input on the UI
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    let solidAddress = true;
    const { name, email, streetAddress, cityAddress, stateAddress, zipcode } = this.state;
    let fullAddress = streetAddress + ", " + cityAddress;
    console.log(fullAddress);
    let lookup = new Lookup(streetAddress + ", " + cityAddress);


    client.send(lookup)
      .then(handleSuccess)
      //.then(this.updateCorrectAddress(solidAddress))
      .catch(handleError);


    async function handleSuccess(response) {

      console.log(response.result);

      response.result != null ?
        solidAddress = true : solidAddress = false;
    }

    async function handleError(response) {
      console.log(response);
      solidAddress = false;
    }

    sleep(10000);
    console.log(solidAddress);
    this.updateCorrectAddress(solidAddress);
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
              <ShippingAddressModal />
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
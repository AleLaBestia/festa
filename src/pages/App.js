import React from "react";
import Card from "react-credit-cards";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../components/utils";
import "react-credit-cards/es/styles-compiled.css";
import { ToastContainer, toast } from 'react-toastify';
import Footer from "../components/Footer"
import Header from "../components/Header";


export default class PaymentForm extends React.Component {

  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  };
  
  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };
 
  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
    const { router } = this.props
    return (
        <>
       <Header/>
      <div key="Payment" className="max-w-screen-2xl h-[80vh] mx-auto grid  bg-white shadow-2xl p-11 w-96 mt-10 mb-10 ">

          <p className="text-center h1 font-extrabold text-color-yellow-300 mb-5"><span className="text-yellow-400">Pay</span>ments</p>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
            className="ml-96 place-items-center"
          />

          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group  mt-2">
              <input
                type="tel"
                name="number"
                className="form-control w-full "
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="form-group   mt-2">
              <input
                type="text"
                name="name"
                className="form-control  w-full"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="content-start  mt-2 ">
                
              <div className=" mt-2">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="content-start">
                <div className="col-6 mt-2">
                    <input
                    type="password"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                    />
                </div>
              </div>
            </div>
            

            <a href="/">
            <div className="">

              <button className="btn btn-primary button mt-3 w-full btn-block align-center justify-center rounded-lg">PAY</button>
              
            </div>
            </a>
          </form>
          <ToastContainer />
      </div>
      <Footer/>
      </>
    );
  }
}

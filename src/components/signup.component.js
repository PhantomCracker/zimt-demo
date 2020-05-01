import React, { Component } from "react";
import ZIMTHubSDK from '@zimt/sdk';
import

const sdk = new ZIMTHubSDK({
    api: {
        core: "https://hub.zi.mt",
    },
    privateKey: "0xcbcc3b8cf1b0a8f56a418b8c636b00030c59bd974770627205e4fd04a274d381",
    apiKey: "0xb7CDD913b870a46B305b8c6e8B9EB46744f56F6F"
});

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            organization: '',
            personalName: '',
            password: '',
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeOrganization = this.handleChangeOrganization.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value,
            emailError: '',
        });
    }
    handleChangeOrganization(event) {
        this.setState({
            organization: event.target.value,
        });
    }
    handleChangeName(event) {
        this.setState({
            personalName: event.target.value,
        });
    }
    handleChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const accountExist = await this.checkIfTheUserExist(this.state.email);
        console.log(accountExist.response);
        if(accountExist.response === true) {
            this.setState({
                emailError: "This email is already in use"
            })
        }
        else {
            sdk.organizations.create({
              "organization": {
                "name": this.state.organization
              },
              "account": {
                "full_name": this.state.personalName,
                "email": this.state.email,
                "address": "0x4DC2f66Ea6f7Cd898342378e514cBDAD9dE5CC1B",
                "security": {
                  "token": this.state.password
                }
              }
            });
        }
    }

    async checkIfTheUserExist(email) {
        return await sdk.accounts.exists({ address: "0x627969CD9Ef88bA7e61694947020540d7eD0001d", email: email });
    }
    async checkMe() {
        const result = await sdk.accounts.me();
        console.log(result);
    }

    render() {
        return (
            <form className="m-auto mt-5 pt-5" style={{maxWidth: "500px"}}
                  onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <h5 onClick={() => this.checkMe()}>Check me</h5>

                <div className="form-group">
                    <label>Organization name</label>
                    <input type="text" className="form-control" placeholder="Organization name"
                           value={this.state.organization} onChange={this.handleChangeOrganization} />
                </div>

                <div className="form-group">
                    <label>Your name</label>
                    <input type="text" className="form-control" placeholder="Your name"
                           value={this.state.personalName} onChange={this.handleChangeName} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           value={this.state.email} onChange={this.handleChangeEmail} />
                    <p>{this.state.emailError}</p>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           value={this.state.password} onChange={this.handleChangePassword} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            </form>
        );
    }
}
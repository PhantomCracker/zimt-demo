import React, { Component } from "react";
import ZIMTHubSDK from '@zimt/sdk';

const sdk = new ZIMTHubSDK({
    api: {
        core: "https://hub.zi.mt",
    },
    privateKey: "0xcbcc3b8cf1b0a8f56a418b8c636b00030c59bd974770627205e4fd04a274d381",
    apiKey: "0xb7CDD913b870a46B305b8c6e8B9EB46744f56F6F"
});


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            organization: '',
        };
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeOrganization = this.handleChangeOrganization.bind(this);
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
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Organization name</label>
                    <input type="text" className="form-control" placeholder="First name"
                           value={this.state.organization} onChange={this.handleChangeOrganization} />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChangeEmail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="rememberMe" />
                        {/*<label className="custom-control-label" htmlFor="rememberMe">Remember me</label>*/}
                    </div>
                </div>

                <button className="btn btn-primary btn-block">Submit</button>
            </form>
        );
    }
}
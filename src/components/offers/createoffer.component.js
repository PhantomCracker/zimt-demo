import React, { Component } from "react";
import ZIMTHubSDK from '@zimt/sdk';
import { withRouter } from 'react-router-dom';

const sdk = new ZIMTHubSDK({
    api: {
        core: "https://hub.zi.mt",
    },
    privateKey: "0xcbcc3b8cf1b0a8f56a418b8c636b00030c59bd974770627205e4fd04a274d381",
    apiKey: "0xb7CDD913b870a46B305b8c6e8B9EB46744f56F6F"
});

export default class CreateOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offerName: '',
            activePrice: '',
            category: '',
            validity: '',
            commission: '',
            overprice: '',
            paymentDay: '',
        };
        this.handleChangeOfferName = this.handleChangeOfferName.bind(this);
        this.handleChangeActivePrice = this.handleChangeActivePrice.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeValidity = this.handleChangeValidity.bind(this);
        this.handleChangeCommission = this.handleChangeCommission.bind(this);
        this.handleChangeOverprice = this.handleChangeOverprice.bind(this);
        this.handleChangePaymentDay = this.handleChangePaymentDay.bind(this);
    }

    handleChangeOfferName(event) {
        this.setState({
            offerName: event.target.value,
        });
    }
    handleChangeActivePrice(event) {
        this.setState({
            activePrice: event.target.value,
        });
    }
    handleChangeCategory(event) {
        this.setState({
            category: event.target.value,
        });
    }
    handleChangeValidity(event) {
        this.setState({
            validity: event.target.value,
        });
    }
    handleChangeCommission(event) {
        this.setState({
            commission: event.target.value,
        });
    }
    handleChangeOverprice(event) {
        this.setState({
            overprice: event.target.value,
        });
    }

    handleChangePaymentDay(event) {
        this.setState({
            paymentDay: event.target.value,
        });
    }


    async createOffer(event) {
        event.preventDefault();
        const createAsset = await sdk.assets.create(sdk.assets.generateAsset());
        const generateEvent = await sdk.events.generateEvent(createAsset.response.id, {
            type: "info",
            name: this.state.offerName,
            properties: {
                activePrice: this.state.activePrice,
                category: this.state.category,
                validity: this.state.validity,
                commission: this.state.commission,
                overprice: this.state.overprice,
                paymentDay: this.state.paymentDay
            }
        });
        const createEvent = await sdk.events.createEvent(generateEvent.meta.asset_id, generateEvent);
        console.log(createEvent.meta.message);
        this.props.history.push('/offers');
    }

    render() {
        return (
            <form className="m-auto mt-5 pt-5" style={{maxWidth: "500px"}}
                  onSubmit={(event) => this.createOffer(event)}>
                <h3>Create offer</h3>
                <p onClick={() => console.log(this.state)}> Check state </p>

                <div className="form-group">
                    <label>Offer name</label>
                    <input type="text" className="form-control" placeholder="Offer name"
                           value={this.state.offerName} onChange={this.handleChangeOfferName} />
                </div>

                <div className="form-group">
                    <label>Active price</label>
                    <input type="number" className="form-control" placeholder="Price"
                           value={this.state.activePrice} onChange={this.handleChangeActivePrice} />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <input type="text" className="form-control" placeholder="Category"
                           value={this.state.email} onChange={this.handleChangeCategory} />
                    <p>{this.state.emailError}</p>
                </div>

                <div className="form-group">
                    <label>Validity</label>
                    <input type="text" className="form-control" placeholder="Validity"
                           value={this.state.validity} onChange={this.handleChangeValidity} />
                </div>

                <div className="form-group">
                    <label>Commission</label>
                    <input type="text" className="form-control" placeholder="Commission"
                           value={this.state.commission} onChange={this.handleChangeCommission} />
                </div>

                <div className="form-group">
                    <label>Overprice</label>
                    <input type="text" className="form-control" placeholder="Overprice"
                           value={this.state.overprice} onChange={this.handleChangeOverprice} />
                </div>

                <div className="form-group">
                    <label>Payment Day</label>
                    <input type="date" className="form-control"
                           value={this.state.paymentDay} onChange={this.handleChangePaymentDay} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Create offer</button>
            </form>
        );
    }
}
import React, { Component } from "react";
import ZIMTHubSDK from '@zimt/sdk';

const sdk = new ZIMTHubSDK({
    api: {
        core: "https://hub.zi.mt",
    },
    privateKey: "0xcbcc3b8cf1b0a8f56a418b8c636b00030c59bd974770627205e4fd04a274d381",
    apiKey: "0xb7CDD913b870a46B305b8c6e8B9EB46744f56F6F"
});

export default class Dashboard extends Component {

    async getUser() {
        const result = await sdk.accounts.me();
        return result.response.data.full_name;
    }

    async getOffers() {
        const allAssets = await sdk.assets.getMany();
        let offers = [];
        for(let i = 0; i < allAssets.response.length; i++) {
            offers.push(await sdk.assets.get(allAssets.response[i].id, { info: true }))
        }
        let offersProperties = [];
        offers.map(offer => {
            if(offer.response.info.data != undefined) {
                offer = offer.response.info.data;
                offersProperties.push(offer);
            }
        });
        console.log(offersProperties);
        return offersProperties;
    }

    async componentDidMount() {
        await this.getOffers();
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Offers list</h2>
                {/*{this.getOffers()}*/}
            </div>
        );
    }
}
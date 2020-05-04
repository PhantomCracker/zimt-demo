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

    async getAssets() {
        const allAssets = await sdk.assets.getMany();
        console.log(allAssets);
    }

    render() {
        return (
            <div>
                <h2>Offers dashboard is coming soon</h2>
                <p onClick={() => this.getAssets()} >Check all assets</p>
            </div>
        );
    }
}
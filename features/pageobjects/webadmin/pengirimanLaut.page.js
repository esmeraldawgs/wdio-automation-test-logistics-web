const utils = require("../commonfeature/utils");
const { Key } = require('webdriverio');

class SeaShipping {

    get seaShippingButton() { return $('/html/body/div[1]/div[2]/div/div/div/div/header/div/button[2]'); }
    get orderIdInListing() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div[1]/div[1]/div[1]/div').$('b'); }
    get searchOrderInput() { return $('/html/body/div[3]/div[3]/div/div[3]/div[1]/div[1]/input'); }
    get orderSelectionCheckbox() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div/div[1]/div[1]/span/input'); }
    get continueButton() { return $('/html/body/div[3]/div[3]/div/div[4]/button'); }
    get orderIdInDetail() { return $('/html/body/div[4]/div[3]/div/div[3]/div[2]/div/div[1]').$('b'); }
    get continueButtonInDetail() { return $('/html/body/div[3]/div[3]/div/div[4]/button[2]'); }
    get transporterName() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div[2]/div/div/div/div[2]').$('b'); }
    get createTripButton() { return $('/html/body/div[4]/div[3]/div/div[4]/button[2]'); }
    get confirmCreateTripButton() { return $('/html/body/div[5]/div[3]/div/div/div[3]/button[2]'); }
    get alertMessage() { return $('/html/body/div[1]/div[1]/div/div/div[1]').$('[role="alert"]'); }
    get shipperNameInDetail() { return $('/html/body/div[4]/div[3]/div/div[3]/div[1]/div/div[1]/div/div[2]/p[2]'); }
    get tripIdInDetail() { return $('/html/body/div[4]/div[3]/div/div[3]/div[1]/div/div[1]/div/div[1]/b[2]'); }
    get pageHeaderTitle() { return $('//*[@id="root"]/div[2]/div/div/div/div/header/div/div/div[2]/h5'); }

    async createSeaTrip(orderId, transporterName) {
        await this.seaShippingButton.waitForExist({ timeout: 70000 });
        await this.seaShippingButton.click();
        await this.orderIdInListing.waitForExist({ timeout: 70000 });

        let listData;
        do {
            listData = await this.orderIdInListing.getText();
        } while (listData.length < 2);

        await this.searchOrderInput.setValue(orderId);
        await this.orderSelectionCheckbox.waitForExist({ timeout: 70000 });
        await this.orderSelectionCheckbox.click();
        await this.continueButton.click();

        await this.continueButtonInDetail.waitForDisplayed();
        await this.continueButtonInDetail.click();
        await browser.pause(5000);

        await this.transporterName.waitForExist({ timeout: 90000 });
        do {
            listData = await this.transporterName.getText();
        } while (listData.length < 2);

        await this.transporterName.waitForClickable();
        await this.transporterName.click();

        await browser.pause(5000);
        await this.createTripButton.click();
        await this.confirmCreateTripButton.waitForDisplayed();
        await this.confirmCreateTripButton.click();
        await this.pageHeaderTitle.waitForExist({ timeout: 70000 });
    }

    async checkToastMessage() {
        await this.alertMessage.waitForExist();
        await browser.waitUntil(async () => {
            const msg = await this.alertMessage.getText();
            return msg !== "";
        }, { timeout: 10000, timeoutMsg: 'Message did not appear within the time limit' });

        return await this.alertMessage.getText();
    }
}

module.exports = new SeaShipping();

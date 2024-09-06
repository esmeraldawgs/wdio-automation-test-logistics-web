const utils = require("../commonfeature/utils");
const { Key } = require('webdriverio');

class LandShipping {

    // Elements on the page for land shipping
    get landShippingButton() { return $('/html/body/div[1]/div[2]/div/div/div/div/header/div/button[2]'); }
    get orderIdInListing() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div[1]/div[1]/div[1]/div').$('b'); }
    get searchOrderInput() { return $('/html/body/div[3]/div[3]/div/div[3]/div[1]/div[1]/input'); }
    get orderSelectionCheckbox() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div/div[1]/div[1]/span/input'); }
    get continueButton() { return $('/html/body/div[3]/div[3]/div/div[4]/button'); }
    get orderIdInDetail() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div/div[1]').$('/html/body/div[3]/div[3]/div/div[3]/div[2]/div/div[1]/b'); }
    get continueButtonInDetail() { return $('/html/body/div[3]/div[3]/div/div[4]/button[2]'); }
    get transporterName() { return $('/html/body/div[3]/div[3]/div/div[3]/div[2]/div[2]/div/div/div/div[2]').$('b'); }
    get createTripButton() { return $('/html/body/div[3]/div[3]/div/div[4]/button[2]'); }
    get confirmCreateTripButton() { return $('/html/body/div[4]/div[3]/div/div/div[3]/button[2]'); }
    get alertMessage() { return $('/html/body/div/div[1]/div').$('[role="alert"]'); }
    get shipperNameInDetail() { return $('/html/body/div[3]/div[3]/div/div[3]/div[1]/div/div[1]/div/div[2]').$('/html/body/div[3]/div[3]/div/div[3]/div[1]/div/div[1]/div/div[2]/p[2]'); }
    get tripIdInDetail() { return $('/html/body/div[3]/div[3]/div/div[3]/div[1]/div/div[1]/div/div[1]/b[2]'); }
    get pageHeaderTitle() { return $('//*[@id="root"]/div[2]/div[2]/div/div/div/header/div/div/div[2]/h5'); }

    // Method to create a land shipping trip
    async createLandTrip(orderId, transporterName) {
        await this.landShippingButton.waitForExist({ timeout: 70000 });
        await this.landShippingButton.waitForDisplayed();
        await this.landShippingButton.waitForClickable();
        await this.landShippingButton.click();
        
        await this.orderIdInListing.waitForExist({ timeout: 70000 });
        await this.orderIdInListing.waitForDisplayed();
        
        let data;
        do {
            data = await this.orderIdInListing.getText();
        } while (data.length < 2);
        
        await this.searchOrderInput.setValue(orderId);
        await this.orderSelectionCheckbox.waitForExist({ timeout: 70000 });
        await this.orderSelectionCheckbox.click();
        await this.continueButton.click();

        await this.shipperNameInDetail.waitForExist({ timeout: 70000 });
        do {
            data = await this.shipperNameInDetail.getText();
        } while (data.length < 2);

        await this.orderIdInDetail.waitForExist({ timeout: 70000 });
        do {
            data = await this.orderIdInDetail.getText();
        } while (data.length < 2);

        const tripId = await this.tripIdInDetail.getText();
        await utils.writeFile(tripId);

        await browser.pause(5000);
        await this.continueButtonInDetail.click();

        await this.transporterName.waitForExist({ timeout: 90000 });
        do {
            data = await this.transporterName.getText();
        } while (data.length < 2);

        console.log("Loading transporter list...");

        const recommendedTransporters = await $('/html/body/div[3]/div[3]/div/div[3]/div[2]').$$('b');

        recommendedTransporters.forEach(async (element) => {
            let transporterText = await element.getText();
            if (transporterText === transporterName) {
                await element.click();
            }
        });

        await browser.pause(5000);
        await this.createTripButton.click();
        await this.confirmCreateTripButton.waitForDisplayed();
        await this.confirmCreateTripButton.click();
        await this.pageHeaderTitle.waitForExist({ timeout: 70000 });
        await this.pageHeaderTitle.waitForDisplayed();
    }

    // Method to check for toast messages
    async checkForToastMessage() {
        await this.alertMessage.waitForExist();
        await this.alertMessage.waitForDisplayed();
        await browser.waitUntil(async () => {
            const message = await this.alertMessage.getText();
            return message !== "";
        }, { timeout: 10000, timeoutMsg: 'No message appeared within the timeout' });
        
        const message = await this.alertMessage.getText();
        return message;
    }

}

module.exports = new LandShipping();

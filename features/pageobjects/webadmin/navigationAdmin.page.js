const { Key } = require('webdriverio');
const utils = require("../commonfeature/utils");

class AdminNavigation {

    // Sidebar elements
    get sidebarToggleBtn() { return $('/html/body/div/div[2]/header/button'); }
    get sidebarMenu() { return $('/html/body/div/div[2]/div[1]/div/div'); }
    get deliveryButton() { return $('/html/body/div[2]/div[2]/div/button[4]'); }
    get searchInputField() { return $('//*[@id="root"]/div[2]/header/div[2]/div/div/div/input'); }

    // Listing and trip details
    get dashboardOrderId() { return $('/html/body/div[1]/div[2]/div/div/div/div/div[2]/div[2]/button[1]/div[1]/div[1]/div[2]/div/b'); }
    get landShippingTripId() { return $('/html/body/div[1]/div[2]/div/div/div/div/div[2]/div[2]/button[1]/div[1]/div[1]/div[2]/div/b'); }
    get landShippingTitle() { return $('/html/body/div[1]/div[2]/div/div/div/div/header/div/div/div[2]/h5'); }
    get seaShippingTripId() { return $('//*[@id="root"]/div[2]/div/div/div/div/div[3]/a[1]/div[1]/div[2]/b[1]'); }
    get seaShippingTitle() { return $('//*[@id="root"]/div[2]/div/div/div/div/header/div/div/div[2]/h5'); }

    // Method to toggle the sidebar menu
    async toggleSidebar() {
        await this.sidebarToggleBtn.waitForClickable();
        await this.sidebarToggleBtn.click();
        await this.sidebarMenu.waitForDisplayed();
    }

    // Method to wait until the dashboard is fully loaded
    async waitForDashboardLoad() {
        let displayedOrderId;
        do {
            await this.dashboardOrderId.waitForExist();
            displayedOrderId = await this.dashboardOrderId.getText();
        } while (displayedOrderId.length < 2);
        console.log("Dashboard loaded with Order ID:", displayedOrderId);
    }

    // Navigate to "Pengiriman Darat" (Land Shipping)
    async navigateToLandShipping() {
        await this.waitForDashboardLoad();
        await this.searchInputField.waitForExist({ timeout: 70000 });
        await this.searchInputField.setValue("Pengiriman Darat");
        await browser.pause(5000);
        await browser.keys(Key.Enter);
        await this.landShippingTitle.waitForExist({ timeout: 70000 });
        await this.landShippingTitle.waitForDisplayed();
    }

    // Navigate to "Pengiriman Laut" (Sea Shipping)
    async navigateToSeaShipping() {
        await this.waitForDashboardLoad();
        await this.searchInputField.waitForExist({ timeout: 70000 });
        await this.searchInputField.setValue("Pengiriman Laut");
        await browser.pause(5000);
        await browser.keys(Key.Enter);
        await this.seaShippingTitle.waitForExist({ timeout: 70000 });
        await this.seaShippingTitle.waitForDisplayed();
    }

}

module.exports = new AdminNavigation();

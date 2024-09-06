const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/loginpage/login.page.js');
const NavigationAdmin = require('../../pageobjects/webadmin/navigationAdmin.page.js');
const Common = require('../../pageobjects/commonfeature/common.js');
const PengirimanLaut = require('../../pageobjects/webadmin/pengirimanLaut.page.js');

Given(/^The admin is on the "Pengiriman Laut" page, logged in with account: "([^"]*)" - "([^"]*)". Scenario : WAL001$/, async (email, password) => {
    // Open login page and perform login
    await LoginPage.openLoginPage();
    await LoginPage.loginToWebAdmin(email, password);
    
    // Navigate to the Pengiriman Laut page
    await NavigationAdmin.goto_create_trip_laut();
});

When(/^The admin selects an order and assigns "([^"]*)" as the transporter to create a trip. Scenario : WAL001$/, async (transporterName) => {
    // Read order ID from the file
    const orderId = await Common.readFile();
    
    // Create a trip with the provided transporter name
    await PengirimanLaut.createTripLaut(orderId, transporterName);
});

Then(/^Validate that the trip was created successfully.$/, async () => {
    // Check for the toast message after trip creation
    const toastMessage = await PengirimanLaut.checkToastMessage();
    
    // Validate that the message is as expected
    expect(toastMessage).toEqual('Berhasil membuat pesanan', 'The success message did not match the expected result');
});

const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/loginpage/login.page.js');
const NavigationAdmin = require('../../pageobjects/webadmin/navigationAdmin.page.js');
const Common = require('../../pageobjects/commonfeature/common.js');
const PengirimanDarat = require('../../pageobjects/webadmin/pengirimanDarat.page.js');

Given(/^The admin is on the "Pengiriman Darat" page, using account: "([^"]*)" - "([^"]*)". Scenario : WA001$/, async (email, password) => {
    // Open login page and perform login
    await LoginPage.openLoginPage();
    await LoginPage.loginToWebAdmin(email, password);
    
    // Navigate to the Pengiriman Darat page
    await NavigationAdmin.goto_create_trip_darat();
});

When(/^The admin selects an order and assigns "([^"]*)" as transporter to create a trip. Scenario : WA001$/, async (transporterName) => {
    // Read order ID from a file
    const orderId = await Common.readFile();
    
    // Create a trip with the provided transporter name
    await PengirimanDarat.createTripDarat(orderId, transporterName);
});

Then(/^Validate that the trip was created successfully$/, async () => {
    // Check for the toast message after trip creation
    const toastMessage = await PengirimanDarat.checkToastMessage();
    
    // Validate that the message is as expected
    expect(toastMessage).toEqual('Berhasil membuat pesanan', 'The toast message did not match the expected result');
});

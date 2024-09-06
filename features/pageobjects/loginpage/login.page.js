const { browser } = require('@wdio/globals');

class AuthPage {

    // Selector untuk input email pada halaman login
    get emailField() {
        return $('//*[@id="root"]/div[2]/form/div/div[2]/div[1]/input');
    }

    // Selector untuk input password pada halaman login
    get passwordField() {
        return $('//*[@id="root"]/div[2]/form/div/div[2]/div[2]/input');
    }

    // Selector untuk tombol submit pada halaman login
    get loginButton() {
        return $('//*[@id="root"]/div[2]/form/div/button');
    }

    // Selector untuk teks header dashboard user
    get dashboardHeaderUser() {
        return $('//*[@id="root"]/div[2]/main/div/header/div/div[1]/div[2]/h5');
    }

    // Selector untuk teks header dashboard admin
    get dashboardHeaderAdmin() {
        return $('/html/body/div/div[2]/div[2]/div/div/header/div/div[1]/div[2]/h5');
    }

    // Metode untuk membuka halaman login
    async navigateToLoginPage() {
        await browser.url('https://aldalogistics.dev.co.id/#/login');
        await browser.maximizeWindow();
    }

    // login
    async login(email, password) {
        await this.emailField.waitForExist();
        await this.emailField.setValue(email);

        await this.passwordField.waitForExist();
        await this.passwordField.setValue(password);

        await this.loginButton.waitForExist();
        await this.loginButton.click();
        await this.dashboardHeaderAdmin.waitForDisplayed({ timeout: 30000 });
    }

}

module.exports = new AuthPage();

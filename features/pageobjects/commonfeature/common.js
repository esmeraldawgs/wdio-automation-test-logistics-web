const { browser } = require('@wdio/globals')
const fs = require('fs');
const filePath = 'features/pageobjects/commonfeature/dataTest.txt';
const logsFilePath = 'features/pageobjects/commonfeature/logs.txt';


class Common{
      
    get notesModal() {
        return $("/html/body/div[3]/div[3]/div");
    }
    get btnNotes(){
        return $('/html/body/div[3]/div[3]/div/div[2]/button[2]')
    }
    get btn_sidebar(){
        return $('//*[@id="root"]/div[2]/header/button[1]');
    }
    get sideBarParent(){
        return $('//*[@id="root"]/div[2]/div/div/div');
    }
    get dashboard() {
        return $('//*[@id="root"]/div[2]/div/div/div/button[1]');
      }
    
    async saveLogs(dataLog){
        try {
            // Write to the file
            const timestamp = Date.now();
            const timestampString1 = timestamp.toString();
            const data = "[" + timestampString1 + "] " + dataLog
            fs.writeFileSync(logsFilePath, "dataLog" , 'utf8');
            console.log('Data has been written to the file:', filePath);
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    async saveIdOrder(idOrder, idTrip){
        const data = {
            [idOrder] : idTrip
        }
        const jsonData = JSON.stringify(data, null, 2)
        return jsonData;
    }

    async writeFile(dataToWrite) {
        try {
            // Write to the file
            fs.writeFileSync(filePath, dataToWrite, 'utf8');
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    }

    async readFile() {
        try {
            // Read from the file
            const dataRead = fs.readFileSync(filePath, 'utf8');
            return dataRead;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    }

    async skipNotes(){
        if(await this.notesModal.isExisting()){
            await this.notesModal.waitForDisplayed();
            await this.btnNotes.click();
            await this.btnNotes.click();
          }
    }


    async goToPesananDarat(){
        await this.btn_sidebar.click();
        await this.sideBarParent.waitForDisplayed({timeout:50000});
        await this.searchElementByText("Pesanan", "Pesanan Darat")
        await $('//*[@id="root"]/div[2]/main/div/div[3]').waitForDisplayed();
    }

    async searchElementByText(text1, text2){
        const page =  await this.sideBarParent.$(`//*[text()='${text1}']`);
        await page.waitForClickable();
        page.click();
        if (text2){
            this.searchElementByText(text2,"")
        }
    }

    getDate(req){
        let dateData = "";
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const year = tomorrow.getFullYear();
        
        if (req === "jadwalKapal_ETD"){
            dateData = month + day + year}
        
        else if (req === "jadwalKapal_ETA"){
            let convert = parseInt(day, 10);
            let result = convert + 1;
            let dayPlusOne = result.toString();
            dateData =  month + dayPlusOne + year}
        
        else if (req === "dayOnly"){ dateData = day} 
        else{ dateData = month + day + year }
        return dateData
    }

    getDay(){
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const day = String(tomorrow.getDate()).padStart(2, '0');
        return day
    }
    
    async waitDataToLoad(locator){
        let element;
        let data;
        do {
            element = await $(locator);
            data = await element.getText();
        } while (data.length < 2);
    }
}

module.exports = new Common();
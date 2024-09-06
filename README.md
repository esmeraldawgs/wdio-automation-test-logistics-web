# Web Logistics Automation Testing using WebDriverIO

## Description

This project is an automation testing suite for a Web Logistics using WebDriverIO and Cucumber. It covers creating trips for **Land Delivery** and **Sea Delivery** and validating the success of the trip creation process.

## Project Structure

- `features/` : Contains Gherkin feature files.
- `pageobjects/` : Contains page object files.
- `stepDefinitions/` : Contains step definitions for Gherkin scenarios.
- `commonfeature/` : Contains utility and common functions.

## Installation

1. **Clone the Repository**  
   Clone this repository to your local machine:
   ```bash
   git clone https://github.com/esmeraldawgs/wdio-automation-test-logistics-web.git
   cd repository

2. **Install Dependencies**
   Install the required dependencies:
   `npm install`

3. **Configure WebDriverIO**
   Adjust the wdio.conf.js configuration file according to your environment. Ensure it is set up for your desired browser and environment settings.
   
4. **Running Tests**
   To execute the tests, use the following command:
   `npx wdio run wdio.conf.js`

Feature: Feature create trip darat in web admin

@buatTripDarat
Scenario Outline: WA001 - Create Trip Darat and select first recomendation transporter
    Given The admin on the pengiriman darat page. Login Account : "<email>" - "<password>". Scenario : WA001
    When The admin select an order and "<transporter>" to make a trip. Scenario : WA001
    Then Validate create trip is succsesfully.
        Examples:
            |email                         |password     |transporter           |
            |esmeraldadmin@gmail.com |admin123          |ALDA TRANSPORTER      |
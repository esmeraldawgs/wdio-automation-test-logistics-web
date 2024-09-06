Feature: Feature create trip laut in web admin

@buatTripLaut
Scenario Outline: WAL001 - Create Trip Laut and select first recomendation transporter
    Given The admin on the pengiriman laut page. Login Account : "<email>" - "<password>". Scenario : WAL001
    When The admin select an order and "<transporter>" to make a trip. Scenario : WAL001
    Then Validate create trip is successfully.
        Examples:
            |email                         |password     |transporter           |
            |esmeraldadmin@gmail.com |123          |ALDA TRANSPORTER      |
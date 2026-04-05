Feature: Go to the cinema booking tests

    Scenario: Should book two seats
      Given user is on the cinema page
      When user clicks on Monday button
      When user clicks on Stalker session time
      When user clicks on two free seats
      When user clicks on the booking button
      Then user sees "Получить код бронирования" button
    
    Scenario: Should book a VIP seat
      Given user is on the cinema page
      When user clicks on Monday button
      When user clicks on The Witcher VIP session time
      When user clicks on a free seat
      When user clicks on the booking button
      Then user sees "Получить код бронирования" button
    
    Scenario: Should NOT book a taken seat
      Given user is on the cinema page
      When user clicks on Monday button
      When user clicks on Stalker session time
      When user clicks on a taken seat
      Then booking button is disabled

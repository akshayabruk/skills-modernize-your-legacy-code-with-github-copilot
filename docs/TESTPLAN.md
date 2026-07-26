# Business Test Plan for the COBOL Account Management Application

This test plan documents the current business logic and implementation behavior of the account management application so it can be reviewed with business stakeholders and later translated into unit and integration tests for a Node.js implementation.

## Scope

The current application supports:
- Viewing the current account balance
- Crediting funds to the account
- Debiting funds from the account
- Exiting the application

## Test Case Table

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-001 | Launch the application and verify the main menu is displayed | The application is compiled and executable | 1. Start the application. 2. Observe the initial screen. | The application displays the account management menu with options 1 to 4 and prompts the user to enter a choice. | | | |
| TC-002 | View the current balance | The application is running and the account balance is initialized to 1000.00 | 1. Start the application. 2. Select option 1 for View Balance. | The application displays the current balance as 1000.00. | | | |
| TC-003 | Credit funds to the account | The application is running and the current balance is known | 1. Start the application. 2. Select option 2 for Credit Account. 3. Enter a valid amount such as 250.00. | The application updates the balance to 1250.00 and displays a confirmation message with the new balance. | | | |
| TC-004 | Debit funds from the account when sufficient funds are available | The application is running and the current balance is sufficient for the debit | 1. Start the application. 2. Select option 3 for Debit Account. 3. Enter a valid debit amount such as 100.00. | The application subtracts the amount and displays the new balance. | | | |
| TC-005 | Prevent a debit that exceeds the available balance | The application is running with a balance lower than the requested debit amount | 1. Start the application. 2. Select option 3 for Debit Account. 3. Enter an amount greater than the current balance, for example 2000.00. | The application displays an insufficient funds message and does not reduce the balance. | | | |
| TC-006 | Verify the initial balance is set correctly | The application has not yet processed any transactions | 1. Start the application. 2. Select option 1 for View Balance. | The initial balance displayed is 1000.00. | | | |
| TC-007 | Exit the application from the main menu | The application is running | 1. Start the application. 2. Select option 4 for Exit. | The application displays a goodbye message and terminates. | | | |
| TC-008 | Validate invalid menu option handling | The application is running | 1. Start the application. 2. Enter an invalid option such as 5. | The application displays an invalid choice message and continues to prompt for input. | | | |
| TC-009 | Verify that crediting funds preserves the previous balance and adds the new amount correctly | The application is running and the balance is known | 1. Start the application. 2. Select option 2 for Credit Account. 3. Enter 50.00. 4. Select option 1 for View Balance. | The displayed balance increases from the previous value by 50.00. | | | |
| TC-010 | Verify that debiting funds preserves the previous balance and subtracts the new amount correctly | The application is running and the balance is sufficient | 1. Start the application. 2. Select option 3 for Debit Account. 3. Enter 75.00. 4. Select option 1 for View Balance. | The displayed balance decreases from the previous value by 75.00. | | | |
| TC-011 | Verify transaction behavior after multiple sequential operations | The application is running and multiple transactions are possible | 1. Start the application. 2. Credit 100.00. 3. Debit 50.00. 4. View the balance. | The final displayed balance reflects both transactions in the correct order and equals the original balance plus 50.00. | | | |
| TC-012 | Validate that the application uses a single persisted balance across operations | The application is running and multiple actions are performed in one session | 1. Start the application. 2. Credit funds. 3. View the balance. 4. Debit funds. 5. View the balance again. | The balance shown after each action reflects the updated state from the previous operation. | | | |
| TC-013 | Verify behavior when a zero amount is entered for credit | The application is running | 1. Start the application. 2. Select option 2 for Credit Account. 3. Enter 0.00. | The application accepts the transaction and leaves the balance unchanged, unless the implementation explicitly rejects zero values. | | | |
| TC-014 | Verify behavior when a zero amount is entered for debit | The application is running | 1. Start the application. 2. Select option 3 for Debit Account. 3. Enter 0.00. | The application accepts the transaction and leaves the balance unchanged, unless the implementation explicitly rejects zero values. | | | |
| TC-015 | Verify that the application loops back to the menu after completing a transaction | The application is running | 1. Start the application. 2. Perform a credit or debit operation. 3. Observe the next screen. | The application returns to the main menu so the user can choose another action. | | | |

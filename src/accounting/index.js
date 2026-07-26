const readline = require('readline');

const INITIAL_BALANCE = 1000.0;

function createAccountService(initialBalance = INITIAL_BALANCE) {
  let currentBalance = initialBalance;

  return {
    readBalance() {
      return currentBalance;
    },
    writeBalance(newBalance) {
      currentBalance = newBalance;
    }
  };
}

function executeOption(option, amount, service) {
  switch (option) {
    case '1':
      return service.readBalance();
    case '2': {
      const newBalance = service.readBalance() + amount;
      service.writeBalance(newBalance);
      return newBalance;
    }
    case '3': {
      if (service.readBalance() >= amount) {
        const newBalance = service.readBalance() - amount;
        service.writeBalance(newBalance);
        return newBalance;
      }
      return 'Insufficient funds for this debit.';
    }
    case '4':
      return 'EXIT';
    default:
      return 'Invalid choice, please select 1-4.';
  }
}

function createApp({ input = process.stdin, output = process.stdout } = {}) {
  const rl = readline.createInterface({ input, output });
  const service = createAccountService();

  function displayMenu() {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');
  }

  function prompt(question) {
    return new Promise((resolve) => {
      rl.question(question, resolve);
    });
  }

  async function handleSelection(selection) {
    switch (selection) {
      case '1':
        console.log(`Current balance: ${service.readBalance().toFixed(2)}`);
        break;
      case '2': {
        const amountInput = await prompt('Enter credit amount: ');
        const amount = Number(amountInput);

        if (!Number.isFinite(amount)) {
          console.log('Invalid amount.');
          break;
        }

        const newBalance = service.readBalance() + amount;
        service.writeBalance(newBalance);
        console.log(`Amount credited. New balance: ${newBalance.toFixed(2)}`);
        break;
      }
      case '3': {
        const amountInput = await prompt('Enter debit amount: ');
        const amount = Number(amountInput);

        if (!Number.isFinite(amount)) {
          console.log('Invalid amount.');
          break;
        }

        if (service.readBalance() >= amount) {
          const newBalance = service.readBalance() - amount;
          service.writeBalance(newBalance);
          console.log(`Amount debited. New balance: ${newBalance.toFixed(2)}`);
        } else {
          console.log('Insufficient funds for this debit.');
        }
        break;
      }
      case '4':
        console.log('Exiting the program. Goodbye!');
        rl.close();
        return 'EXIT';
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }

    return null;
  }

  async function run() {
    while (true) {
      displayMenu();
      const selection = await prompt('Enter your choice (1-4): ');
      const result = await handleSelection(selection);
      if (result === 'EXIT') {
        break;
      }
    }
  }

  return { run, service };
}

if (require.main === module) {
  const app = createApp();
  app.run().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = {
  INITIAL_BALANCE,
  createAccountService,
  executeOption,
  createApp
};

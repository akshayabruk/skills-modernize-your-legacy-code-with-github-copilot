const assert = require('assert');
const { createAccountService, executeOption, INITIAL_BALANCE } = require('../index');

describe('accounting business logic', () => {
  let service;

  beforeEach(() => {
    service = createAccountService();
  });

  it('returns the initial balance when the view option is selected', () => {
    assert.strictEqual(executeOption('1', 0, service), INITIAL_BALANCE);
  });

  it('credits funds and updates the balance', () => {
    const before = service.readBalance();
    const result = executeOption('2', 250, service);

    assert.strictEqual(result, before + 250);
    assert.strictEqual(service.readBalance(), before + 250);
  });

  it('debits funds when sufficient funds are available', () => {
    const before = service.readBalance();
    const result = executeOption('3', 100, service);

    assert.strictEqual(result, before - 100);
    assert.strictEqual(service.readBalance(), before - 100);
  });

  it('rejects a debit that exceeds the available balance', () => {
    const result = executeOption('3', 100000, service);

    assert.strictEqual(result, 'Insufficient funds for this debit.');
    assert.strictEqual(service.readBalance(), INITIAL_BALANCE);
  });

  it('handles invalid menu options', () => {
    const result = executeOption('9', 0, service);

    assert.strictEqual(result, 'Invalid choice, please select 1-4.');
  });

  it('applies multiple transactions in sequence', () => {
    executeOption('2', 100, service);
    executeOption('3', 50, service);

    assert.strictEqual(service.readBalance(), INITIAL_BALANCE + 50);
  });
});

// ======================================
// Local Storage Functions
// ======================================

const STORAGE_KEY = "bankAccountData";

// Save Account
function saveAccount() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      balance: myAccount.balance,
      transactions: myAccount.transactions,
    })
  );
}

// Load Account
function loadAccount() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const data = JSON.parse(savedData);

    myAccount.balance = data.balance;
    myAccount.transactions = data.transactions;
  }
}

// Clear Account (Optional)
function clearAccount() {
  localStorage.removeItem(STORAGE_KEY);
}
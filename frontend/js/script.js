// ======================================
// Bank Account Management - API Version
// ======================================

// Backend API URL
const API_URL = "http://localhost:5000/api/account";

// Current account
let currentAccount = null;

// ======================================
// Select HTML Elements
// ======================================

const balance = document.getElementById("balance");
const totalDeposits = document.getElementById("totalDeposits");
const totalWithdrawals = document.getElementById("totalWithdrawals");

const depositAmount = document.getElementById("depositAmount");
const withdrawAmount = document.getElementById("withdrawAmount");

const depositBtn = document.getElementById("depositBtn");
const withdrawBtn = document.getElementById("withdrawBtn");

const depositList = document.getElementById("depositList");
const withdrawList = document.getElementById("withdrawList");

const history = document.getElementById("transactionHistory");
const transactionCount = document.getElementById("transactionCount");
const accountHolder = document.getElementById("accountHolder");
const createAccountBtn = document.getElementById("createAccountBtn");

const toast = document.getElementById("toast");

// ======================================
// Toast Notification
// ======================================

function showToast(message, success = true) {
  toast.innerText = message;

  toast.style.background = success ? "#00c853" : "#d32f2f";

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ======================================
// Create Bank Account
// ======================================

async function createAccount() {

  const name = accountHolder.value.trim();

  if (!name) {
    showToast("Please enter account holder name.", false);
    return;
  }

  try {

    createAccountBtn.disabled = true;
    createAccountBtn.innerText = "Creating...";

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        accountHolder: name
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Account creation failed");
    }

    currentAccount = data.account;

    accountHolder.value = "";

    showToast("Account created successfully.", true);

    await loadTransactions();
    updateDashboard();

  } catch (error) {

    console.error("Create Account Error:", error);

    showToast(error.message, false);

  } finally {

    createAccountBtn.disabled = false;
    createAccountBtn.innerText = "Create Account";
  }
}
// ======================================
// Load Account From Backend
// ======================================

async function loadAccount() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const data = await response.json();

    console.log("Accounts from backend:", data.accounts);

    if (!data.accounts || data.accounts.length === 0) {
      showToast("No bank account found.", false);
      return;
    }

    // This dashboard currently works with one account.
    // We use the first account returned by MongoDB.
    currentAccount = data.accounts[0];

    console.log("Current account:", currentAccount);

    await loadTransactions();

    updateDashboard();

  } catch (error) {
    console.error("API Error:", error);

    showToast("Unable to connect to backend.", false);
  }
}

// ======================================
// Load Transactions From Backend
// ======================================

async function loadTransactions() {
  try {
    const response = await fetch(
      `${API_URL}/${currentAccount._id}/transactions`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }

    const data = await response.json();

    currentAccount.transactions = data.transactions || [];

    console.log("Transactions from backend:", currentAccount.transactions);

  } catch (error) {
    console.error("Transaction API Error:", error);

    currentAccount.transactions = [];

    showToast("Unable to load transaction history.", false);
  }
}

// ======================================
// Update Dashboard
// ======================================

function updateDashboard() {
  if (!currentAccount) {
    return;
  }

  // Current Balance
  balance.innerText = "$" + currentAccount.balance;

  let depositTotal = 0;
  let withdrawTotal = 0;

  depositList.innerHTML = "";
  withdrawList.innerHTML = "";

  // Calculate totals
  for (const transaction of currentAccount.transactions) {

    if (transaction.type === "deposit") {

      depositTotal += Number(transaction.amount);

      depositList.innerHTML += `
        <li>
          💰 $${transaction.amount}
        </li>
      `;
    }

    if (
      transaction.type === "withdraw" ||
      transaction.type === "withdrawal"
    ) {

      withdrawTotal += Number(transaction.amount);

      withdrawList.innerHTML += `
        <li>
          💸 $${transaction.amount}
        </li>
      `;
    }
  }

  totalDeposits.innerText = "$" + depositTotal;
  totalWithdrawals.innerText = "$" + withdrawTotal;

  transactionCount.innerText =
    currentAccount.transactions.length;

  updateTransactionHistory();
}

// ======================================
// Update Transaction History
// ======================================

function updateTransactionHistory() {

  history.innerHTML = "";

  if (
    !currentAccount ||
    currentAccount.transactions.length === 0
  ) {
    history.innerHTML = `
      <p class="empty">No transactions yet.</p>
    `;

    return;
  }

  currentAccount.transactions.forEach((transaction) => {

    const card = document.createElement("div");

    const type =
      transaction.type === "withdrawal"
        ? "withdraw"
        : transaction.type;

    card.classList.add("transaction");
    card.classList.add(type);

    const transactionDate = transaction.createdAt
      ? new Date(transaction.createdAt).toLocaleString()
      : new Date().toLocaleString();

    if (type === "deposit") {

      card.innerHTML = `
        <div>
          <strong>💰 Deposit</strong><br>
          <small>${transactionDate}</small>
        </div>

        <h3 style="color:#00ff88;">
          +$${transaction.amount}
        </h3>
      `;

    } else {

      card.innerHTML = `
        <div>
          <strong>💸 Withdraw</strong><br>
          <small>${transactionDate}</small>
        </div>

        <h3 style="color:#ff5b5b;">
          -$${transaction.amount}
        </h3>
      `;
    }

    history.appendChild(card);
  });
}

// ======================================
// Deposit Money
// ======================================

async function depositMoney() {

  const amount = Number(depositAmount.value);

  if (!amount || amount <= 0) {
    showToast(
      "Deposit amount must be greater than zero.",
      false
    );

    return;
  }

  if (!currentAccount) {
    showToast("Account is not loaded.", false);
    return;
  }

  try {

    depositBtn.disabled = true;
    depositBtn.innerText = "Processing...";

    const response = await fetch(
      `${API_URL}/${currentAccount._id}/deposit`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          amount: amount
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Deposit failed");
    }

    showToast(data.message, true);

    depositAmount.value = "";

    // Refresh account + transactions
    await loadAccount();

  } catch (error) {

    console.error("Deposit Error:", error);

    showToast(error.message, false);

  } finally {

    depositBtn.disabled = false;
    depositBtn.innerText = "Deposit";
  }
}

// ======================================
// Withdraw Money
// ======================================

async function withdrawMoney() {

  const amount = Number(withdrawAmount.value);

  if (!amount || amount <= 0) {
    showToast(
      "Withdrawal amount must be greater than zero.",
      false
    );

    return;
  }

  if (!currentAccount) {
    showToast("Account is not loaded.", false);
    return;
  }

  try {

    withdrawBtn.disabled = true;
    withdrawBtn.innerText = "Processing...";

    const response = await fetch(
      `${API_URL}/${currentAccount._id}/withdraw`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          amount: amount
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Withdrawal failed");
    }

    showToast(data.message, true);

    withdrawAmount.value = "";

    // Refresh account + transactions
    await loadAccount();

  } catch (error) {

    console.error("Withdraw Error:", error);

    showToast(error.message, false);

  } finally {

    withdrawBtn.disabled = false;
    withdrawBtn.innerText = "Withdraw";
  }
}

// ======================================
// Deposit Button
// ======================================

depositBtn.addEventListener("click", depositMoney);

// ======================================
// Withdraw Button
// ======================================

withdrawBtn.addEventListener("click", withdrawMoney);

// ======================================
// Enter Key - Deposit
// ======================================

depositAmount.addEventListener("keypress", function (e) {

  if (e.key === "Enter") {
    depositMoney();
  }

});

// ======================================
// Enter Key - Withdraw
// ======================================

withdrawAmount.addEventListener("keypress", function (e) {

  if (e.key === "Enter") {
    withdrawMoney();
  }

});
createAccountBtn.addEventListener("click", createAccount);

// ======================================
// Start Application
// ======================================

loadAccount();
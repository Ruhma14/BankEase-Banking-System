// ======================================
// Bank Account Class (Original Logic)
// ======================================

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      return "Deposit amount must be greater than zero.";
    }

    this.transactions.push({
      type: "deposit",
      amount: amount,
    });

    this.balance += amount;

    return `Successfully deposited $${amount}. New balance: $${this.balance}`;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      return "Insufficient balance or invalid amount.";
    }

    this.transactions.push({
      type: "withdraw",
      amount: amount,
    });

    this.balance -= amount;

    return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    let deposits = [];

    for (let transaction of this.transactions) {
      if (transaction.type === "deposit") {
        deposits.push(transaction.amount);
      }
    }

    return `Deposits: ${deposits.join(",")}`;
  }

  listAllWithdrawals() {
    let withdrawals = [];

    for (let transaction of this.transactions) {
      if (transaction.type === "withdraw") {
        withdrawals.push(transaction.amount);
      }
    }

    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

// ======================================
// Create Account
// ======================================

const myAccount = new BankAccount();

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

const toast = document.getElementById("toast");

// ======================================
// Toast Notification
// ======================================

function showToast(message, success = true) {
  toast.innerText = message;

  if (success) {
    toast.style.background = "#00c853";
  } else {
    toast.style.background = "#d32f2f";
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ======================================
// Update Dashboard
// ======================================

function updateDashboard() {
  balance.innerText = "$" + myAccount.balance;

  let depositTotal = 0;
  let withdrawTotal = 0;

  depositList.innerHTML = "";
  withdrawList.innerHTML = "";

  for (let transaction of myAccount.transactions) {
    if (transaction.type === "deposit") {
      depositTotal += transaction.amount;

      depositList.innerHTML += `
                <li>
                    💰 $${transaction.amount}
                </li>
            `;
    }

    if (transaction.type === "withdraw") {
      withdrawTotal += transaction.amount;

      withdrawList.innerHTML += `
                <li>
                    💸 $${transaction.amount}
                </li>
            `;
    }
  }

  totalDeposits.innerText = "$" + depositTotal;
  totalWithdrawals.innerText = "$" + withdrawTotal;

  transactionCount.innerText = myAccount.transactions.length;
}

// ======================================
// Update Transaction History
// ======================================

function updateTransactionHistory() {
  history.innerHTML = "";

  if (myAccount.transactions.length === 0) {
    history.innerHTML = `<p class="empty">No transactions yet.</p>`;

    return;
  }

  // Show newest transaction first
  const reversed = [...myAccount.transactions].reverse();

  reversed.forEach((transaction) => {
    const card = document.createElement("div");

    card.classList.add("transaction");

    card.classList.add(transaction.type);

    const time = new Date().toLocaleString();

    if (transaction.type === "deposit") {
      card.innerHTML = `
                <div>
                    <strong>💰 Deposit</strong><br>
                    <small>${time}</small>
                </div>

                <h3 style="color:#00ff88;">
                    +$${transaction.amount}
                </h3>
            `;
    } else {
      card.innerHTML = `
                <div>
                    <strong>💸 Withdraw</strong><br>
                    <small>${time}</small>
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
// Deposit Button
// ======================================

depositBtn.addEventListener("click", () => {
  const amount = Number(depositAmount.value);

  const message = myAccount.deposit(amount);

  if (message.startsWith("Successfully")) {
    showToast(message, true);

    depositAmount.value = "";

    updateDashboard();

    updateTransactionHistory();
  } else {
    showToast(message, false);
  }
});

// ======================================
// Withdraw Button
// ======================================

withdrawBtn.addEventListener("click", () => {
  const amount = Number(withdrawAmount.value);

  const message = myAccount.withdraw(amount);

  if (message.startsWith("Successfully")) {
    showToast(message, true);

    withdrawAmount.value = "";

    updateDashboard();

    updateTransactionHistory();
  } else {
    showToast(message, false);
  }
});

// ======================================
// Allow Pressing Enter
// ======================================

depositAmount.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    depositBtn.click();
  }
});

withdrawAmount.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    withdrawBtn.click();
  }
});

// ======================================
// Initial Dashboard
// ======================================

updateDashboard();

updateTransactionHistory();

using System;

namespace Task_5
{
    public class BankAccount
    {
        private readonly string _accountNumber;
        private decimal _balance;

        public BankAccount(string accountNumber, decimal initialBalance)
        {
            this._accountNumber = accountNumber;
            this._balance = initialBalance;
        }

        public string GetAccountNumber()
        {
            return this._accountNumber;
        }

        public decimal GetBalance()
        {
            return this._balance;
        }

        public void Deposit(decimal amount)
        {
            if (amount < 0)
            {
                throw new ArgumentException("Deposit amount must be positive");
            }

            this._balance += amount;
        }

        public bool Withdraw(decimal amount)
        {
            if (amount < 0)
            {
                throw new ArgumentException("Withdrawal amount must be positive");
            }

            if (this._balance < amount) return false;
            this._balance -= amount;
            return true;

        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            var account1 = new BankAccount("1234567890", 5000m);
            var account2 = new BankAccount("0987654321", 10000m);
            
            Console.WriteLine($"Initial balance of account {account1.GetAccountNumber()}: {account1.GetBalance()}");
            Console.WriteLine($"Initial balance of account {account2.GetAccountNumber()}: {account2.GetBalance()}");
            
            account1.Deposit(2000m);
            account2.Deposit(5000m);
            
            Console.WriteLine($"Balance of account {account1.GetAccountNumber()} after deposit: {account1.GetBalance()}");
            Console.WriteLine($"Balance of account {account2.GetAccountNumber()} after deposit: {account2.GetBalance()}");
            
            var withdrawal1 = account1.Withdraw(3000m);
            var withdrawal2 = account2.Withdraw(16000m);
            
            Console.WriteLine($"Balance of account {account1.GetAccountNumber()} after withdrawal: {account1.GetBalance()}, withdrawal status: {withdrawal1}");
            Console.WriteLine($"Balance of account {account2.GetAccountNumber()} after withdrawal: {account2.GetBalance()}, withdrawal status: {withdrawal2}");
        }
    }
}
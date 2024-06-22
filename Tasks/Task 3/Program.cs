using System;

namespace Task_3
{
    public class Employee
    {
        private string _name;
        private string _lastname;
        private string _street;
        private string _city;

        protected void Read()
        {
            Console.WriteLine("Enter name:");
            _name = Console.ReadLine();

            Console.WriteLine("Enter lastname:");
            _lastname = Console.ReadLine();

            Console.WriteLine("Enter street:");
            _street = Console.ReadLine();

            Console.WriteLine("Enter city:");
            _city = Console.ReadLine();
        }

        protected void Show()
        {
            Console.WriteLine($"Name: {_name}");
            Console.WriteLine($"Lastname: {_lastname}");
            Console.WriteLine($"Street: {_street}");
            Console.WriteLine($"City: {_city}");
        }
    }
    
    public class HR : Employee
    {
        private string _education;
        private string _businessRole;

        public void Read1()
        {
            Read();
            Console.WriteLine("Enter education:");
            _education = Console.ReadLine();
            Console.WriteLine("Enter business role:");
            _businessRole = Console.ReadLine();
        }

        public void Show1()
        {
            Show();
            Console.WriteLine($"Education: {_education}");
            Console.WriteLine($"Business Role: {_businessRole}");
        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            var hrEmployee = new HR();
            hrEmployee.Read1();
            hrEmployee.Show1();
        }
    }
}

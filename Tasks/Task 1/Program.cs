using System;

namespace Task_1
{
    public class Rectangle
    {
        private double _a;
        private double _b;
        private double _surfaceArea;

        public void read_data()
        {
            Console.WriteLine("Enter the value of side a:");
            _a = Convert.ToDouble(Console.ReadLine());

            Console.WriteLine("Enter the value of side b:");
            _b = Convert.ToDouble(Console.ReadLine());
        }

        public void process_data()
        {
            _surfaceArea = _a * _b;
        }

        public void show_results()
        {
            Console.WriteLine($"Value of side a: {_a:F2}");
            Console.WriteLine($"Value of side b: {_b:F2}");
            Console.WriteLine($"Surface area: {_surfaceArea:F2}");
        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            var rectangle = new Rectangle();
            rectangle.read_data();
            rectangle.process_data();
            rectangle.show_results();
        }
    }
}

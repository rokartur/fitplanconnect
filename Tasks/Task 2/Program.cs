using System;

namespace Task_2
{
    public class NumberSorter
    {
        private int[] _numbers;

        public void read_data()
        {
            _numbers = new int[6];
            Console.WriteLine("Enter six numbers to sort:");
            for (var i = 0; i < 6; i++)
            {
                Console.WriteLine($"Enter number {i + 1}:");
                _numbers[i] = Convert.ToInt32(Console.ReadLine());
            }
        }

        public void process_data()
        {
            Array.Sort(_numbers);
        }

        public void show_results()
        {
            Console.WriteLine("Sorted numbers:");
            foreach (var number in _numbers)
            {
                Console.WriteLine(number);
            }
        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            var sorter = new NumberSorter();
            sorter.read_data();
            sorter.process_data();
            sorter.show_results();
        }
    }
}

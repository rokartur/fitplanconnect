using System;

namespace Task_6
{
    public interface IVehicle
    {
        string Make { get; set; }
        string Model { get; set; }
        int Year { get; set; }
        void Start();
        void Stop();
    }
    
    public class Car : IVehicle
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        
        public int NumberOfDoors { get; set; }
        
        public void Start()
        {
            Console.WriteLine("Car started");
        }

        public void Stop()
        {
            Console.WriteLine("Car stopped");
        }
        
        public void OpenTrunk()
        {
            Console.WriteLine("Trunk opened");
        }
    }
    
    public class Bus : IVehicle
    {
        public string Make { get; set; }
        public string Model { get; set; }
        public int Year { get; set; }
        public int Capacity { get; set; }

        public void Start()
        {
            Console.WriteLine("Bus started");
        }

        public void Stop()
        {
            Console.WriteLine("Bus stopped");
        }
        
        public void OpenDoors()
        {
            Console.WriteLine("Doors opened");
        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            IVehicle car = new Car
            {
                Make = "Koenigsegg",
                Model = "Jesko",
                Year = 2021,
                NumberOfDoors = 2
            };

            IVehicle bus = new Bus
            {
                Make = "Mercedes",
                Model = "Sprinter",
                Year = 2018,
                Capacity = 30
            };

            car.Start();
            ((Car)car).OpenTrunk();
            car.Stop();

            Console.WriteLine();

            bus.Start();
            ((Bus)bus).OpenDoors();
            bus.Stop();
        }
    }
}
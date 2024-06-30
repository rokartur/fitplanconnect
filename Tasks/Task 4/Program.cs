using System;
using System.Collections.Generic;

namespace Task_4
{
    public abstract class Device
    {
        protected string Name { get; set; }
        protected string Model { get; set; }

        protected Device(string name, string model)
        {
            Name = name;
            Model = model;
        }

        public abstract void DisplayInfo();
    }
    
    public class Laptop : Device
    {
        public Laptop(string name, string model) : base(name, model)
        {
        }

        public override void DisplayInfo()
        {
            Console.WriteLine($"Laptop: {Name}, Model: {Model}");
        }
    }

    public class Desktop : Device
    {
        public Desktop(string name, string model) : base(name, model)
        {
        }

        public override void DisplayInfo()
        {
            Console.WriteLine($"Desktop: {Name}, Model: {Model}");
        }
    }
    
    internal abstract class Program
    {
        public static void Main()
        {
            var devices = new List<Device>
            {
                new Laptop("Apple", "MacBook Pro"),
                new Desktop("Lenovo", "ThinkCentre"),
                new Laptop("Lenovo", "ThinkPad"),
                new Laptop("Asus", "ZenBook"),
                new Desktop("Dell", "OptiPlex")
            };

            foreach (var device in devices)
            {
                device.DisplayInfo();
            }
        }
    }
}
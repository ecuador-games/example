using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace example.API.Models
{
    public class ApiResponse
    {
        public string Code { get; set;}

        public string Message { get; set;}
        public dynamic Payload { get; set;}
    }
}
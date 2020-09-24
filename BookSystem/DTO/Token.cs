using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DTO
{
    public class TokenDTO
    {
        public int UserId { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string Token { get; set; }
        public bool IsValid { get; set; }
    }
}

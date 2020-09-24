using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.Business
{
   public static class Utils
    {
        public static string Hash256(string value)
        {
            var sha1 = SHA256.Create();
            var inputBytes = Encoding.ASCII.GetBytes(value);
            var hash = sha1.ComputeHash(inputBytes);
            var sb = new StringBuilder();
            for (var i = 0; i < hash.Length; i++) { sb.Append(hash[i].ToString("X2")); }
            return sb.ToString();
        }
    }
}

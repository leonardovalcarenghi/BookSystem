using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DataBase
{
    public static class _DataBase
    {
        public static string ConnectionString { get { return @"Data Source=localhost\SQLEXPRESS;Initial Catalog=BookSystem;Integrated Security=true;"; } }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystemException
{
    public class AppException : Exception
    {
        public AppExceptionResponse Response { get; set; }
        public AppException(string message, string code = "") => this.Response = new AppExceptionResponse { Message = message, Code = code };
    }

    public class AppExceptionResponse
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }

}

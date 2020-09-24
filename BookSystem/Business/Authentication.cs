using BookSystemException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace BookSystem.Business
{
    /// <summary>
    /// Autenticação.
    /// </summary>
    public class Authentication
    {

        public static void ValidateToken()
        {
            try
            {
                string token = HttpContext.Current.Request.Headers["Authentication"];
                if (string.IsNullOrEmpty(token)) { throw new AppException("Usuário não autenticado."); }

                /* to do: consultar no banco se token existe e está vinculado à algum usuário e se está dentro de periodo de vigencia */



            }
            catch (AppException AppEx) { throw AppEx; }
            catch (Exception Ex) { throw Ex; }
        }


      

    }
}

using BookSystem.DTO;
using BookSystemException;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookSystem.API.Controllers
{
    public class UserController : ApiController
    {

        [HttpPost]
        [Route("user/login")]
        public HttpResponseMessage Login([FromBody] UserDTO user)
        {
            try
            {
                string token = BookSystem.Business.User.Login(user.Email, user.Password);
                return Request.CreateResponse(HttpStatusCode.OK, token);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

        public HttpResponseMessage Get()
        {
            try
            {
                BookSystem.Business.Authentication.ValidateToken();
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

        public HttpResponseMessage New()
        {
            try
            {
                BookSystem.Business.Authentication.ValidateToken();
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }
    }
}

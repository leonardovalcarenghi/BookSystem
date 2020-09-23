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
        public HttpResponseMessage Login()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

        public HttpResponseMessage Get()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

        public HttpResponseMessage New()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }
    }
}

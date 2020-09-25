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
    public class BooksController : ApiController
    {

        [HttpGet]
        [Route("book/get/{id}")]
        public HttpResponseMessage Get([FromUri] int id)
        {
            try
            {
                BookSystem.Business.Authentication.ValidateToken();
                BookDTO book = BookSystem.Business.Books.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, book);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Response); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }


        [HttpPost]
        [Route("books/get")]
        public HttpResponseMessage GetAll([FromBody]string search)
        {
            try
            {
                BookSystem.Business.Authentication.ValidateToken();
                List<BookDTO> listOfBooks = BookSystem.Business.Books.GetAll(search);
                return Request.CreateResponse(HttpStatusCode.OK, listOfBooks);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Response); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

        [HttpPost]
        [Route("book/rent")]
        public HttpResponseMessage Rent([FromBody] int id)
        {
            try
            {
                BookSystem.Business.Authentication.ValidateToken();
                BookSystem.Business.Books.Rent(id);
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Response); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

    }
}

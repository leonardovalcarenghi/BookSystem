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
                BookDTO book = BookSystem.Business.Books.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, book);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }


        [HttpGet]
        [Route("books/get")]
        public HttpResponseMessage GetAll()
        {
            try
            {
                List<BookDTO> listOfBooks = BookSystem.Business.Books.GetAll();
                return Request.CreateResponse(HttpStatusCode.OK, listOfBooks);
            }
            catch (AppException AppEx) { return Request.CreateResponse(HttpStatusCode.BadRequest, AppEx.Message); }
            catch (Exception Ex) { return Request.CreateResponse(HttpStatusCode.InternalServerError, Ex.Message); }
        }

    }
}

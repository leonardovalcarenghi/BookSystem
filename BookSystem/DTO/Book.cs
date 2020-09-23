using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookSystem.DTO
{
   public class BookDTO
    {
        /// <summary>
        /// Id do livro.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nome do livro.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Nome do(s) autor(es) do livro.
        /// </summary>
        public string Author { get; set; }
        /// <summary>
        /// URL da Imagem de capa do livro
        /// </summary>
        public string ImageURL { get; set; }
    }
}

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

        /// <summary>
        /// Descriçao do livro.
        /// </summary>
        public string Description { get; set; }


        /// <summary>
        /// Editora.
        /// </summary>
        public string Publisher { get; set; }

        /// <summary>
        /// Categoria
        /// </summary>
        public string Category { get; set; }

        /// <summary>
        /// Ano de lançamento
        /// </summary>
        public string Year { get; set; }

        /// <summary>
        /// Número de Páginas
        /// </summary>
        public int Pages { get; set; }

        /// <summary>
        /// Livro está disponível para locação.
        /// </summary>
        public bool Available { get; set; }





    }
}

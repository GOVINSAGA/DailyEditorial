using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class AuthorArticleDto
    {
        public string Headline { get; set; }
        public string SubHeading { get; set; }
        public string ArticleContent { get; set; }
        public byte CategoryId { get; set; }
        public int EditorId { get; set; }
        public int MediaId { get; set; }
        public int AuthorId { get; set; }
    }
}

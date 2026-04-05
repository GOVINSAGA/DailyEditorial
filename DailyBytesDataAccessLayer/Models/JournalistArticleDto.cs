using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class JournalistArticleDto
    {
        [Key]
        public byte ArticleId { get; set; }
        public string Headline { get; set; }
        public string SubHeading { get; set; }
        public string ArticleContent { get; set; }
        public string Status { get; set; }
        public string Feedback { get; set; }
        public decimal? Rating { get; set; }
        public byte? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? MediaId { get; set; }
        public string MediaName { get; set; }
        public int AuthorId { get; set; }
        public string AuthorFirstName { get; set; }
        public string AuthorLastName { get; set; }
        public string AuthorUsername { get; set; }
        public int? EditorId { get; set; }
        public string EditorFirstName { get; set; }
        public string EditorLastName { get; set; }
        public int? ChiefEditorId { get; set; }
        public string ChiefEditorFirstName { get; set; }
        public string ChiefEditorLastName { get; set; }
        public byte? ImageId { get; set; }
        public string ImagePath { get; set; }
        public string ImageName { get; set; }
        public string ImageContentType { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class SendArticleForReviewDTO
    {
        public int ArticleId { get; set; }
        public int AuthorId { get; set; }

        public int EditorId { get; set; }
    }
}

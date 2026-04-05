using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class FeedbackDto
    {
        public int ArticleId { get; set; }

        public string Feedback {  get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class ArticleCategory
{
    public byte CategoryId { get; set; }

    public string CategoryName { get; set; } = null!;

    public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
}

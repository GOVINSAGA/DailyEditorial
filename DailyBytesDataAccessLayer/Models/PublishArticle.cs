using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class PublishArticle
{
    public byte PublishId { get; set; }

    public byte? ArticleId { get; set; }

    public string IsPublished { get; set; } = null!;

    public virtual Article? Article { get; set; }
}

using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class Medium
{
    public int MediaId { get; set; }

    public string MediaName { get; set; }

    public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
}

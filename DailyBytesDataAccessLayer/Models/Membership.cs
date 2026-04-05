using System;
using System.Collections.Generic;

namespace DailyBytesDataAccessLayer.Models;

public partial class Membership
{
    public byte MembershipId { get; set; }

    public string MembershipName { get; set; } = null!;

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}

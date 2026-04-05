using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class MembershipSelectionDto
    {
        public int UserId { get; set; }
        public string MembershipName { get; set; } = null!;
    }
}
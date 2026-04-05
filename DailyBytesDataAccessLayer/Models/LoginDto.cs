using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyBytesDataAccessLayer.Models
{
    public class LoginDto
    {
        public string EmailId { get; set; } = null!;

        public string Password { get; set; } = null!;
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }

    }
}

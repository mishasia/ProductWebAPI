using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProductWebAPI.Models
{
    public class ProductContext:DbContext
    {
        public DbSet<Product> Products { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Bogus;
using Bogus.DataSets;

namespace ProductWebAPI.Models
{
    public class ProductDbInitializer : DropCreateDatabaseAlways<ProductContext>
    {
        
        protected override void Seed(ProductContext db)
        {
            var faker = new Faker();
            for (int i = 0; i < 20; i++)
            {
                db.Products.Add(new Product { Name = faker.Commerce.ProductName(), Description = faker.Commerce.ProductAdjective(), Price = faker.Commerce.Price(), PictureUrl = faker.Internet.Url() });
            }
           /* db.Products.Add(new Product { Name = faker.Commerce.ProductName(), Description = faker.Commerce.ProductAdjective(), Price = faker.Commerce.Price(), PictureUrl = faker.Internet.Url() });
            db.Products.Add(new Product { Name = faker.Commerce.ProductName(), Description = faker.Commerce.ProductAdjective(), Price = faker.Commerce.Price(), PictureUrl = faker.Internet.Url() });
            db.Products.Add(new Product { Name = faker.Commerce.ProductName(), Description = faker.Commerce.ProductAdjective(), Price = faker.Commerce.Price(), PictureUrl = faker.Internet.Url() });
            */
            base.Seed(db);
        }
    }
}
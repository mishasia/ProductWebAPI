using ProductWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProductWebAPI.Controllers
{
    
    public class ValuesController : ApiController
    {
        ProductContext db = new ProductContext();
        // GET api/values
        public IEnumerable<Product> GetProducts()
        {
            return db.Products;
        }

        // GET api/values/5
        public Product GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            return product;
        }

        // POST api/values
        [HttpPost]
        public void CreateProduct([FromBody]Product product)
        {
            db.Products.Add(product);
            db.SaveChanges();
        }

        // PUT api/values/5
        [HttpPut]
        public void EditProduct(int id, [FromBody]Product product)
        {
            if (id == product.Id)
            {
                db.Entry(product).State = EntityState.Modified;

                db.SaveChanges();
            }
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            Product product = db.Products.Find(id);
            if (product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
            }
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

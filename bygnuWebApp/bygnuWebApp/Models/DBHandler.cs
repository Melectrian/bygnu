using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using bygnuWebApp.Models;
using System.Data.Entity;

namespace bygnuWebApp.Models
{
    public class DBHandler
    {

        public static ICollection<category> getCategoryList()
        {
            using (var db = new bygnuEntities()) {

                return db.category.ToList();

            }
        }

        public static  IList<product> getProductList(int starting, int limit, string category)
        {

            using (var db = new bygnuEntities())
            {

               return db.product
                    .Include("category")
                    .OrderBy(x => x.name)
                    .Where(x => x.category.name.Equals(category))
                    .Skip(starting)
                    .Take(limit)
                    .ToList();

            }
        }

        public static IList<product> searchProducts(string searchStr)
        {
            using (var db = new bygnuEntities())
            {
                return db.product
                    .OrderBy(x => x.name)
                    .Where(x => x.name.Contains(searchStr))
                    .ToList();
            }
        }

        public static IList<product> getTopOffers()
        {
            using ( var db = new bygnuEntities())
            {
                return db.product
                    .OrderBy(x => x.name)
                    .Where(x => x.isTopOffer == true)
                    .Take(2)
                    .ToList();
            }
        }

        public static IList<product> getDiscounted()
        {
            using (var db = new bygnuEntities())
            {
                return db.product
                    .OrderBy(x => x.name)
                    .Where(x => x.isDiscounted == true)
                    .Take(6)
                    .ToList();
            }
        }

        public static AspNetUsers getProfile(string userID)
        {
            using (var db = new bygnuEntities())
            {
                return db.AspNetUsers.Find(userID);
            }
        }

        public static void updateProfile(AspNetUsers user)
        {
            using (var db = new bygnuEntities())
            {
                AspNetUsers UserRecord = db.AspNetUsers.Find(user.Id);

                UserRecord.FirstName = user.FirstName;
                UserRecord.LastName = user.LastName;
                UserRecord.Email = user.Email;
                UserRecord.PhoneNumber = user.PhoneNumber;
                UserRecord.CompanyName = user.CompanyName;

                db.SaveChanges();

            }
        }

        public static void newOrder()
        {

        }

    }
}
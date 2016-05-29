using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using bygnuWebApp.Models;

namespace bygnuWebApp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            ViewBag.categoryList = DBHandler.getCategoryList();

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        public ActionResult Category(string category)
        {
            ViewBag.search = false;
            ViewBag.category = category;
            return View();
        }

        [HttpPost]
        public JsonResult Show(JsonShow js)
        {
            List<object> data = new List<object>();

            foreach(product p in DBHandler.getProductList(js.skip, 5, js.category))
            {
                data.Add(new { p.name, p.description, p.price });
            }

            return Json(data);
        }

        [HttpPost]
        public ActionResult Search(string searchStr)
        {

            ViewBag.search = true;
            ViewBag.searchStr = searchStr;
            return View("Category");
        }

        public ActionResult Delivery()
        {
            return View();
        }

        public ActionResult Cart()
        {
            return View();
        }
    }
}
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using bygnuWebApp.Models;

namespace bygnuWebApp.Controllers
{
    [Authorize]
    public class ManageController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ManageController()
        {
        }

        public ManageController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult EditProfile()
        {
            return View(DBHandler.getProfile(User.Identity.GetUserId()));

        }

        [HttpPost]
        public ActionResult EditProfile(AspNetUsers user)
        {

            if(ModelState.IsValid)
            {
                user.Id = User.Identity.GetUserId();
                DBHandler.updateProfile(user);

                return Redirect("Index");
            }

            return View();
        }


        public ActionResult OrderHistory()
        {
            return View();
        }

        public ActionResult History()
        {
            return View();
        }

        [HttpGet]
        public ActionResult CheckOut()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CheckOut(FormCollection fc)
        {

            string a = fc["id"];
            string b = fc["qty"];

            order newOrder = new order();
            newOrder.userID = User.Identity.GetUserId();
            newOrder.date = DateTime.Now;

            string[] aa = a.Split(',');
            string[] ba = b.Split(',');

            for (int i= 0; i < aa.Length; i++) {

                orderProduct op = new orderProduct();

                op.productID = Convert.ToInt32(aa[i]);
                op.quantity = Convert.ToInt32(ba[i]);

                newOrder.orderProduct.Add(op);

            }

            return View();
        }
    }
}
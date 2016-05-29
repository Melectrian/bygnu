using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(bygnuWebApp.Startup))]
namespace bygnuWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

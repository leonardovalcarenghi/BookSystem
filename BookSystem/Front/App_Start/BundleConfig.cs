using System.Web;
using System.Web.Optimization;

namespace Front
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {


            //bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/bootstrap.css", "~/Content/site.css"));



            // PLUGINS //

            // Font Awesome CSS:
            bundles.Add(new StyleBundle("~/plugins/font-awesome/css").Include(
                "~/plugins/font-awesome/css/font-awesome.min.css"
              ));


            // Bootstrap CSS:
            bundles.Add(new StyleBundle("~/plugins/bootstrap/css").Include(
                "~/plugins/bootstrap/css/bootstrap.min.css",
                "~/plugins/bootstrap/css/bootstrap-reboot.min.css",
                "~/plugins/bootstrap/css/bootstrap-grid.min.css"
              ));

            // Bootstrap JS:
            bundles.Add(new ScriptBundle("~/plugins/bootstrap/js").Include(
                "~/plugins/bootstrap/js/bootstrap.min.js",
                "~/plugins/bootstrap/js/bootstrap.bundle.min.js"
                ));


            // jQuery:
            bundles.Add(new ScriptBundle("~/plugins/jquery/js").Include(
              "~/plugins/jquery/js/jquery.min.js"
              ));


            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include("~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include("~/Scripts/jquery.validate*"));

            //// Use a versão em desenvolvimento do Modernizr para desenvolver e aprender. Em seguida, quando estiver
            //// pronto para a produção, utilize a ferramenta de build em https://modernizr.com para escolher somente os testes que precisa.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/modernizr-*"));

            //


        }
    }
}

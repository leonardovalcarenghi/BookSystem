using System.Web;
using System.Web.Optimization;

namespace Front
{
    public class BundleConfig
    {
        // Para obter mais informações sobre o agrupamento, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            // SCRIPTS //

            bundles.Add(new ScriptBundle("~/Content/js").Include(
             "~/Content/js/utils.js",
             "~/Content/js/requestXHR.js"
             ));

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


            // STYLES //
            bundles.Add(new StyleBundle("~/Content/css/").Include(
              "~/Content/css/_layout.css"
            ));



        

        }
    }
}

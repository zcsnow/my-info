using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common.com;
using System.IO;
using System.Text;
using Manage.BLL;
using System.Threading;

namespace Manage.Web.CompanyProject.Geelyszhongqiu
{
    /// <summary>
    /// CreateHtml 的摘要说明
    /// </summary>
    public class CreateHtml : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            Stream s = context.Request.InputStream;
        TRYIMAGE:
            string imagesname = DateTime.Now.Ticks + ".png";
            string savefile = AppDomain.CurrentDomain.BaseDirectory + "CompanyProject\\Geelyszhongqiu\\CHtml\\" + imagesname;
            if (File.Exists(savefile))
            {
                Thread.Sleep(5);
                goto TRYIMAGE;
            }
            ImageHalps.CreateBate64Image(s, savefile, 2);

            string baifen = context.Request["baifen"].ToString();
            string htmlname = DateTime.Now.Ticks.ToStr();
            string ModelPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "CompanyProject\\Geelyszhongqiu\\share.html");
        TRYIFILE:
            string SavePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "CompanyProject\\Geelyszhongqiu\\Chtml\\" + htmlname + ".html");
            if (File.Exists(SavePath))
            {
                Thread.Sleep(5);
                goto TRYIFILE;
            }
            StreamReader sr = new StreamReader(ModelPath, Encoding.UTF8);
            string htmlcontent = sr.ReadToEnd();
            sr.Close();
            sr.Dispose();
            htmlcontent = htmlcontent.Replace("{$baifenbi}", baifen).Replace("$YuanImage", imagesname).Replace("{$htmlname}", htmlname);
            StreamWriter sw = new StreamWriter(SavePath, false, Encoding.UTF8);
            sw.Write(htmlcontent);
            sw.Close();
            sw.Dispose();
            context.Response.Write("Chtml\\" + htmlname + ".html");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
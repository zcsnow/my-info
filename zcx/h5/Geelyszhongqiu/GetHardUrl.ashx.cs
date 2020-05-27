using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common.Tools;
using Manage.Model;
using System.IO;
using Manage.BLL;
using Common.com;
using System.Drawing;

namespace Manage.Web.CompanyProject.Geelyszhongqiu
{
    /// <summary>
    /// GetHardUrl 的摘要说明
    /// </summary>
    public class GetHardUrl : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string openid = context.Request["newweixinOpenID"];
            WeixinUserInfo model = RedisManage.Int.GetUserInfo(openid);
            string handurl = string.Format("/Photo/{0}.jpg", openid);
            string handurlPaht = context.Server.MapPath("~" + handurl);

            if (model != null && !model.headimgurl.IsNull())
            {
                if (File.Exists(handurlPaht))
                {
                    context.Response.Write(handurl);
                    return;
                }
                Image _image = HttpUtils.Ins.DownPic(model.headimgurl);
                _image.Save(handurlPaht);
                return;
            }
            context.Response.Write(handurl);
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
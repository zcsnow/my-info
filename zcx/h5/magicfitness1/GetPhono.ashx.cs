using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common.Tools;
using Manage.Model;
using System.IO;
using Common.com;
using System.Drawing;
using Manage.BLL;

namespace Manage.Web.CompanyProject.magicfitness
{
    /// <summary>
    /// GetPhono 的摘要说明
    /// </summary>
    public class GetPhono : IHttpHandler
    {
        /// <summary>
        /// 获取微信头像
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string openid = context.Request["newweixinOpenID"].ToStr();
            WeixinUserInfo model = RedisManage.Int.GetUserInfocalendar(openid);
            string handurl = string.Format("Photo/magicfitness/{0}.jpg", openid);
            string handurlPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, handurl);
            if (model != null && !model.headimgurl.IsNull())
            {
                if (!File.Exists(handurlPath))
                {
                    Image _image = HttpUtils.Ins.DownPic(model.headimgurl);
                    _image.Save(handurlPath);
                }
            }
            context.Response.Write("/" + handurl + "|" + model.nickname);
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
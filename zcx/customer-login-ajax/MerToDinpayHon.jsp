<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
	String username = (String)session.getAttribute("username");
	if(username == null || username.equals("")){
		
	}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="utf-8" />
		<meta name="renderer" content="webkit" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
		<title>选择银行卡支付</title>
		<link rel="stylesheet" href="css/base.css" />
        <link rel="stylesheet" href="css/payBank.css" />
  		<link rel="shortcut icon" href="img/logo.ico" type="image/x-icon" />
	</head>
	<body>
		<div class="header-box">
            <div class="bank-list-box clr">
              	<div class="logo"><img src="bankImg/logo.jpg" /></div>
            	<div class="welcome-txt">欢迎使用online payment system</div>
                <div class="red-line"></div>
            </div>
		</div>
		<div class="floor1 bank-list-box">
        	<h3 class="clr"><em>您的款项将安全到达有关银行。银行卡和公司相关资料已使用256位元加密。</em><span>如对本笔订单有疑问，请向商家咨询。</span></h3>
            <div class="pay-order-info">
            	<p><strong>您的商户：</strong><span class="bold">HONFX GLOBAL LIMITED</span></p>
                <p><strong>订单号码：</strong><span class="red"><%=request.getAttribute("order_id") %></span><strong>支付币种：</strong><span class="red">CNY</span></p>
                <p><strong>订单金额：</strong><span class="red bold"><%=request.getAttribute("money") %> CNY</span></p>
            </div>
		</div>
        <div class="floor2 bank-list-box">
                <h3><em>银行卡支付</em></h3>
                <h4>选择您的银行</h4>
				<form name="payment" method="post" action="http://deposit.paylomo.net/pay.php">
					<input type="hidden" name="version" value="<%=request.getAttribute("version") %>" />
					<input type="hidden" name="sign_type" value="<%=request.getAttribute("sign_type") %>" />
					<input type="hidden" name="mid" value="<%=request.getAttribute("mid") %>" />
					<input type="hidden" name="return_url" value="<%=request.getAttribute("return_url") %>" />
					<input type="hidden" name="notify_url" value="<%=request.getAttribute("notify_url") %>" />
					<input type="hidden" name="order_id" value="<%=request.getAttribute("order_id") %>" />
					<input type="hidden" name="order_time" value="<%=request.getAttribute("order_time") %>" />
					<input type="hidden" name="order_amount" value="<%=request.getAttribute("order_amount") %>" />
					<input type="hidden" name="signature" value="<%=request.getAttribute("signature") %>" />
        		<div class="select-box clr">
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank1" value="1" checked="checked">
                        <label for="bank1"><img src="bankImg/bank1.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank2" value="2">
                        <label for="bank2"><img src="bankImg/bank2.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank3" value="3">
                        <label for="bank3"><img src="bankImg/bank3.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank4" value="4">
                        <label for="bank4"><img src="bankImg/bank4.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank5" value="5">
                        <label for="bank5"><img src="bankImg/bank5.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank6" value="6">
                        <label for="bank6"><img src="bankImg/bank6.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank7" value="8">
                        <label for="bank7"><img src="bankImg/bank7.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank8" value="9">
                        <label for="bank8"><img src="bankImg/bank8.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank9" value="10">
                        <label for="bank9"><img src="bankImg/bank9.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank10" value="11">
                        <label for="bank10"><img src="bankImg/bank10.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank11" value="12">
                        <label for="bank11"><img src="bankImg/bank11.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank12" value="14">
                        <label for="bank12"><img src="bankImg/bank12.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank13" value="15">
                        <label for="bank13"><img src="bankImg/bank13.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank14" value="16">
                        <label for="bank14"><img src="bankImg/bank14.jpg" /></label>
                    </div>
                    <div class="select-p select-p-inline">
                        <input class="select-input-radio" type="radio" name="f_bank_id" id="bank15" value="17">
                        <label for="bank15"><img src="bankImg/bank15.jpg" /></label>
                    </div>
                    <div class="clr"></div>
                    
                    <button type="submit" class="select-bank-btn">立即支付</button>
                </div>
        		</form>
		</div>
        <div class="floor3 bank-list-box">
        	<h3>QA:常见问题</h3>
            <div class="QA-box">
            	1、银行卡支付需要开通网上银行？<br />
                答：需要。<br />
                2、银行卡支付支持哪些类型的卡？<br />
                答：借记卡，信用卡。<br />
                3、银行卡网银支付时，出现无法支付的情况，怎么办？<br />
                答：出现无法支付通常有如下几个原因：<br />
                &nbsp;&nbsp;&nbsp;&nbsp;1）浏览器不兼容，请切换浏览器，建议使用IE浏览器；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;2）支付达到支付上限，支付上限请核实本人银行查询核准；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;3）查看是否安装银行控件网银安全组件，是否按照提示操作网银；<br />
                &nbsp;&nbsp;&nbsp;&nbsp;4）更多其他问题，请电话咨询本人持卡银行。<br />
            </div>
		</div>
		<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
        <script type="text/javascript" src="js/payBank.js"></script>
	</body>
</html>

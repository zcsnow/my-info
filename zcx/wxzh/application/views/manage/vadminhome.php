<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<?php 
$logined=$_SESSION['logined'];
if(isset($logined)&&$logined===true);
else
	header(site_url("cindex"));
foreach($css_files as $file): ?>
<link type="text/css" rel="stylesheet" href="<?php echo $file; ?>" />
<?php endforeach; ?>
<?php foreach($js_files as $file): ?>
<script src="<?php echo $file; ?>"></script>
<?php endforeach; ?>
<style type='text/css'>
body{font-family: Arial;font-size: 14px;}
a {color: blue;text-decoration: none;font-size: 14px;}
a:hover{text-decoration: underline;}
</style>
</head>
<body>
	<div>
		<a href='<?php echo site_url('cadmin/item_manage')?>'>文章列表</a> |
		<!--<a href='<?php echo site_url('cadmin/list_manage')?>'>列表配置</a> |
		<a href='<?php echo site_url('cadmin/analyze_manage')?>' target='_blank'>analyze</a> |-->
		<a href='<?php echo site_url('cadmin/logout')?>'>退出</a> |
	</div>
	<div style='height:20px;'></div>  
    <div>
		<?php echo $output; ?>
    </div>
</body>
</html>

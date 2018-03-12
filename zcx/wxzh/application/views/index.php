<!DOCTYPE html> 
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<title>微信公共账号</title>
<link rel="stylesheet" type="text/css" href="<?php echo base_url('application/css/common.css?1'); ?>" />
</head>
<body>
    <section class="main clearfix">
        <h2 class="all_title">
            一条 | 总目录
        </h2>
		<ul class="three-list clearfix">
        <?php foreach ($zh_info as $value){ ?>
			
			<li><a href="<?php echo $value->imgHref?>"><img src="<?php echo $value->imgSrc ?>"></a></li>
			
        <?php } ?>
		</ul>
    </section>
<script type="text/javascript" src='<?=base_url('application/js/jquery-1.7.js')?>'></script>
<script type="text/javascript">

</script>
</body> 
</html>

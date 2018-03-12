<html>
<head>

<meta charset='utf-8'>
<style>
body{font-family: "微软雅黑"}
	table{border: none;border-collapse: collapse;}
	table tr th{width:80px;height: 50px;background-color: steelblue;color:white;border:1px solid #000;font-size: 18px;}
	table tr td{width:80px;height: 40px;text-align: center;border:1px solid #000;}
</style>
</head>
<body>
<input type='hidden' valu='{id_topic}' />
<div>
</div>
<?php for ($i=0;$i<10;$i++){ ?>
<h2 style="font-size:24px;color:red;">==>><?php echo $items[$i][0]['cdate']; ?></h2>
<div>
	<table>
	<thead>
		<tr>
			<th>小时</th>
			<?php for($j=0;$j<24;$j++) { ?>
			<th><?php echo $j;?></th>
			<?php }?>
		<tr>
	</thead>
	<tbody>
		<tr>
			<td>点击</td>
			<?php for($j=0;$j<24;$j++) { ?>
			<td><?php foreach($items[$i] as $key=>$value){
					if($value['chour']==$j)
					{
						echo $value['count'];
					}
				}?>
			</td>
			<?php }?>
		</tr>
	</tbody>
	<table>
</div>
<?php }?>
<script src="<?php echo base_url('application/js/jquery-1.7.js'); ?>" type="text/javascript" ></script>
</body>
</html>

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
<input type='hidden' valu='2' />
<div>
</div>
<h2 style="font-size:24px;color:red;">==>><?php echo $items[$i][0]['cdate']; ?></h2>
<?php //print_r($items)?>
<div>
<?php foreach($items as $key => $value):?>
<h2><?=$key?></h2>
	<table>
	<thead>
		<tr>
		<?php foreach($value as $key => $data):?>
		<th><?=$data['listId']?></th>
		<?php endforeach;?>
		<tr>
	</thead>
	<tbody>
		<tr>
		<?php foreach($value as $key => $data):?>
		<td><?=$data['sum(count)']?></td>
		<?php endforeach;?>
		</tr>
	</tbody>
	<table>
<?php endforeach;?>
</div>
<script src="<?php echo base_url('application/js/jquery-1.7.js'); ?>" type="text/javascript" ></script>
</body>
</html>

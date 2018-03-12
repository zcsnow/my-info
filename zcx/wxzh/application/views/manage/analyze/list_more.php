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
<div id="container" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
<input type='hidden' valu='{id_topic}' />
<div>
</div>
<?php for ($i=0;$i<10;$i++){ ?>
<h2 style="font-size:24px;color:red;">==>><?php echo $lists[$i][0]['cdate']; ?></h2>
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
			<td>进入</td>
			<?php for($j=0;$j<24;$j++) { ?>
			<td><?php foreach($lists[$i] as $key=>$value){
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
<script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>
<script type='text/javascript'>
$(document).ready(function()
	{
		var chart = new Highcharts.Chart({
	chart: {
		renderTo: 'container',
		type: 'line',
		marginRight: 130,
		marginBottom: 25
	},

	xAxis: {
		categories: [<?php for($i=0;$i<24;$i++){echo $i.',';}?>]
	},
	yAxis: {
		title: {
			text: '{test_id}'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	},
	tooltip: {
		formatter: function() {
				return '<b>'+ this.series.name +'</b><br/>'+
				this.x +': '+ this.y +'';
		}
	},
	legend: {
		layout: 'vertical',
		align: 'right',
		verticalAlign: 'top',
		x: -10,
		y: 100,
		borderWidth: 0
	},
	series: [

	<?php foreach ($lists as $key => $value){ $tag=0;?>
	{
		name: "<?php echo $value[0]['cdate']; ?>",
		data: [<?php
				for($i=0;$i<23;$i++)
				{

				}
			?>]
	},
	<?php }?>
	]

});
	});
</script>
</body>
</html>

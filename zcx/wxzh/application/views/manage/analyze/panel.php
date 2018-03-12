<html>
<head>
	<meta charset="utf-8">
	<style type="text/css">
body{font-family: "微软雅黑"}
	table{border: none;border-collapse: collapse;}
	table tr th{width:80px;height: 50px;background-color: lightblue;color:grey;border:1px solid #000;font-size: 18px;}
	table tr td{width:80px;height: 40px;text-align: center;border:1px solid #000;}
	</style>
</head>
<body>
	<?php //print_r($listData);?>
	<hr>
		<h2>==> 列表相关</h2>
	<hr />
		<table>
			<thead>
				<tr>
					<th>列表 </th>
					<th>帐号配置</th>
					<?php for($i=0;$i<10;$i++):?>
						<th><?php echo date('Y-m-d',strtotime("-$i day"))?></th>	
					<?php endfor;?>
					<th>详情</th>
				</tr>
			<thead>
			<tbody>
				<?php foreach($lists as $key=>$value):?>
				<tr>
					<td><?=$value['listId'];?></td>
					<td><?=$value['listItems']?></td>
					<?php
						foreach($listData as $key => $tp)
						{
							if($key==$value['listId'])
							{
								foreach ($tp as $key => $v)
								{
									$sum = 0;
									foreach ($v as $key => $count)
									{
										$sum += $count['count'];
									}
									echo "<td>$sum</td>";
								}
							}
						}
					?>
					<td><a href='list_more/<?=$value['listId']?>' target='_blank'>详细</a></td>
				</tr>
				<?php endforeach;?>
			<tbody>
		</table>
	<hr>
		<h2>==>帐号</h2>
	<hr>
		<table>
			<thead>
				<tr>
					<th>帐号</th>
					<th>标题</th>
					<?php for($i=0;$i<10;$i++):?>
						<th><?php echo date('Y-m-d',strtotime("-$i day"))?></th>	
					<?php endfor;?>
					<th>详情</th>
					<th>流量分析</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach($items as $key=>$value):?>
				<tr>
					<td><?=$value['id'];?></td>
					<td><?=$value['title'];?></td>
					<?php
						//print_r($itemData);
						foreach($itemData as $key => $tp)
						{
							if($key==$value['id'])
							{
								foreach ($tp as $key => $v)
								{
									$sum = 0;
									foreach ($v as $key => $count)
									{
										$sum += $count['count'];
									}
									echo "<td>$sum</td>";
								}
							}
						}
					?>
					<td><a href="item_more/<?=$value['id']?>" target='_blank'>详细</a></td>
					<td><a href="item_ana/<?=$value['id']?>" target='_blank'>展开</a></td>
				</tr>
				<?php endforeach;?>
			</tbody>
		</table>
</body>
</html>

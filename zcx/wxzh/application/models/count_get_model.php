<?php
class Count_get_model extends CI_Model
{
	public function get_list_day($list=-1, $cdate='2010-01-01', $ctype='type')
	{
		$queryString = "select * from count_common
						where ctype='$ctype'
						and listId=$list
						and cdate='$cdate'
						order by chour asc";

		return $this->db->query($queryString)->result_array();
	}

	public function get_items_day($item=-1, $cdate='2010-01-01', $ctype='type')
	{
		$queryString = "select * from count_common
						where ctype='$ctype'
						and tipId=$item
						and cdate='$cdate'
						order by chour asc";

		return $this->db->query($queryString)->result_array();
	}

	public function get_count_ana($id_list, $id_item, $cdate='2010-01-01')
	{
		$queryString="select listId,cdate,sum(count) from count_common
						where listId=$id_list
						and	tipId=$id_item
						and	cdate='$cdate'
						and	ctype='tip'";
		//echo $queryString;
		$result=$this->db->query($queryString)->result_array()[0];
		if (!empty($result['sum(count)']))
		{
			return $result;
		}
	}

}


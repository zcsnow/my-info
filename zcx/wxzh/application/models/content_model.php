<?php
class Content_model extends CI_Model{
	
	public function get_item()
	{
		$res = $this->db->order_by('id', 'DESC')->get('item');
		return $data = $res->result();
	}
   
   
}


<?php
class List_model extends CI_Model{
  	public $date_now;
	public $chour;

	public function __construct()
	{
		parent::__construct();
		$this->date_now = date('Y-m-d');
		$this->chour = explode(':',date('H:i:s'))[0]+0;
	}

	public function test()
	{
		echo 'hello world';
	}

	public function get_items()
	{
		$queryString = "select * from item";
		return $this->db->query($queryString)->result_array();
	}

	/*public function get_items_id($id_list=-1)
	{
		$queryString = "select listItems from list_page
						where listId=$id_list";

		$result = $this->db->query($queryString)->result_array();
		if(!empty($result))
		{
			return $items = explode(',', $result[0]['listItems']);
		}
	}

	public function get_lists()
	{
		$queryString = "select * from list_page";
		return $this->db->query($queryString)->result_array();
	}*/

}


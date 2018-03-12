<?php
class Count_set_model extends CI_Model{
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

	public function add_count_list($id_list, $id_tip=0, $type)
	{
		$queryString = "select * from count_common 
				where listId = $id_list and 
					tipId = $id_tip and
					cdate ='$this->date_now' and
					chour = '$this->chour'";
		$result = $this->db->query($queryString)->result_array();

		if(empty($result))
		{
			$queryString = "insert into count_common 
					(listId,tipId,cdate,chour,ctype,count)
					values ($id_list,$id_tip,'$this->date_now',$this->chour,'$type',1)";
			$this->db->query($queryString);
		}else
		{
			$queryString = "update count_common 
					set count=count+1
					where listId = $id_list and 
					tipId = $id_tip and
					cdate ='$this->date_now' and
					chour = '$this->chour'";
			$this->db->query($queryString);
		}
	}

}


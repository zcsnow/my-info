<?php
class Cadmin extends CI_Controller{

	public function __construct(){
		parent::__construct();
		$this->load->library('grocery_CRUD');
	}
	public function index(){
		$this->load->view('manage/vlogin');
	}

	public function login(){
		$name= $this->input->post('txtName');
		$passwd= $this->input->post('txtPasswd');
		//if($name==='bingfengtianxia'&&$passwd='!c$+12bife384'){
		if($name==='wxzh'&&$passwd='123456'){

			$_SESSION['logined']=true;
			$this->output_view((object)array('output' => '' , 'js_files' => array() , 'css_files' => array()));
		}else{
			$this->load->view('manage/vlogin',null);
		}
	}

	function output_view($output = null)
	{
		$this->load->view('manage/vadminhome',$output);
	}

	function check_login(){
		$logined=$_SESSION['logined'];
		if($logined&&$logined==true)
		return true;
		else
		return false;
	}
	
    function logout(){
		$this->session->sess_destroy();
		$this->load->view('manage/vlogin',null);
	}
	
	function item_manage(){
		if(!$this->check_login()){
			$this->load->view('manage/vlogin',null);
			return;
		}
		try{
			$crud = new grocery_CRUD();
			//$crud->set_theme('flexigrid');
			$crud->set_theme('datatables');
			$crud->set_table('item');
			$crud->set_subject('文章列表');
			$crud->required_fields('id');
			$crud->columns('id','imgSrl','imgHref');
			$output = $crud->render();
			$this->output_view($output);
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}

	/*public function list_manage()
	{
		$crud = new grocery_CRUD();
		$crud->set_theme('datatables');
		$crud->set_table('list_page');
		$crud->columns('listId','listUrl','listItems');
		$output = $crud->render();
		$this->output_view($output);
	}
	
	public function analyze_manage()
	{
		$this->load->model('count_get_model');
		$this->load->model('list_model');

		$count_get = new count_get_model();
		$list = new list_model();

		$days = $this->_gen_days(10);
		$lists = $list->get_lists();
		$items = $list->get_items();

		foreach($lists as $key => $value)
		{
			foreach ($days as $key => $day)
			{
				$data['listData'][$value['listId']][]=$count_get->get_list_day($value['listId'], $day,'list');
			}
		}

		foreach($items as $key => $value)
		{
			//echo $value['id'];
			foreach ($days as $key => $day)
			{
				$data['itemData'][$value['id']][]=$count_get->get_items_day($value['id'], $day,'tip');
			}
		}

		//print_r($data['lists']);
		$data['lists'] = $lists;
		$data['items'] = $items;

		$this->load->view('manage/analyze/panel',$data);
	}*/

	public function list_more($id_list=-1)
	{
		$this->load->model('count_get_model');

		$count_get = new count_get_model();

		$days = $this->_gen_days(10);

		foreach($days as $key => $day)
		{
			$data['lists'][] = $count_get->get_list_day($id_list,$day,'list');
		}

		$this->load->view('manage/analyze/list_more',$data);

	}

	public function item_more($id_item=-1)
	{
		$this->load->model('count_get_model');

		$count_get = new count_get_model();

		$days = $this->_gen_days(10);

		foreach($days as $key => $day)
		{
			$data['items'][] = $count_get->get_items_day($id_item,$day,'tip');
		}

		$this->load->view('manage/analyze/item_more',$data);
	}

	public function item_ana($id_item=-1)
	{	
		$this->load->model('count_get_model');
		$this->load->model('list_model');

		$count_get = new count_get_model();
		$list = new list_model();

		$lists = $list->get_lists();
		$days = $this->_gen_days(10);

		foreach($days as $key => $day)
		{
			foreach($lists as $key => $value)
			{
				$data['items'][$day][] = $count_get->get_count_ana($value['listId'],$id_item,$day);
			}
		}

		//print_r($data['items']);
		$this->load->view('manage/analyze/item_ana',$data);
	}
	//->tools function
	private function _gen_days($cday)
	{
		for($i=0;$i<10;$i++)
		{
			$day[] = date('Y-m-d',strtotime("-$i day"));
		}
		return $day;
	}

	public function ad_test()
	{
		$this->load->model('list_model');

		$list = new list_model();

		$list->get_items_id(0);
	}

	function soft_manage(){
		if(!$this->check_login()){
			$this->load->view('manage/vlogin',null);
			return;
		}
		try{
			$crud = new grocery_CRUD();
			$crud->set_table('tutorial');
			$crud->set_subject('软文管理');
			$crud->where('is_ad',1);
			$crud->required_fields('id','smallImgQzone','bigImgQzone','description','favNum','typeId','shareNum','title','shortDesc');
			$crud->columns('id','smallImgQzone','bigImgQzone','description','favNum','shareNum','typeId','title','shortDesc');
			$crud->set_relation('typeId','type','name');
			$crud->set_field_upload('smallImg',PICS_DIRECTORY);
			$crud->set_field_upload('bigImg',PICS_DIRECTORY);
			$output = $crud->render();
			$this->output_view($output);
		}catch(Exception $e){
			show_error($e->getMessage().' --- '.$e->getTraceAsString());
		}
	}
}
?>

<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cindex extends CI_Controller {

    public function index($id_list=0, $fake='fake')
	{
		$this->load->model('content_model');
		
		$zh_info = $this->content_model->get_item();

		
		$data['zh_info']=$zh_info;
		$this->load->view('index',$data);
	} 


}

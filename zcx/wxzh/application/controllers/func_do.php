<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Func_do extends CI_Controller {

	public function add_tip()
	{
		$this->load->model('count_set_model');

		$id_list = $this->input->post('id_list');
		$id_tip  = $this->input->post('id_tip');
		$count_set = new count_set_model();
		
		$count_set->add_count_list($id_list,$id_tip,'tip');
	}
}

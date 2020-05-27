<template lang="pug">
    div
        .pop-layer(v-if="isShow")
            .show_window_con
                p 当前网络状况不佳
        .pop-layer(v-if="show_msg && !isShow")
            .show_window_con
                p(v-html="show_msg")
</template>

<style lang="sass" scoped>
       .pop-layer{
            position: fixed;
            z-index: 9999;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
          display: flex;
          display: box;
          justify-content: center;
          align-items: center;
          box-pack:center;
          box-align:center;
          .show_window_con {
                min-width:3rem;
                max-width:80%;
                padding:.25rem .2rem;
                height: auto;
                text-align: center;
                background: rgba(51, 51, 51, .9);
                border-radius:0.08rem;
                color: #fff;
                p{
                    font-size:.28rem;
                }
          }
       }
</style>

<script type="text/javascript">

	export default {
		props: {
			isShow: {
				type: Boolean,
				required: true
			},
			show_msg: {
				type: String
			},
		}
	}
</script>
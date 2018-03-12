//
//  Leafsoar.cpp
//  jsb
//
//  Created by leafsoar on 8/1/13.
//
//
#include "ScriptingCore.h"
#include "jsapi.h"
#include "Leafsoar.h"
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) 
#include <jni.h> 
#include "platform/android/jni/JniHelper.h" 
#include <android/log.h> 
#endif 

bool ls::Leafsoar::init(){
	bool bRef = false;

	do {
		cocos2d::CCLog("leafsoar init ...");

		bRef = true;
	} while (0);
	return bRef;
}

void ls::Leafsoar::functionTest(){
	cocos2d::CCLog("!!!function Test");
	js_proxy_t * p = jsb_get_native_proxy(this);
	jsval retval;
	JSContext* jc = ScriptingCore::getInstance()->getGlobalContext();

	//  定义参数，由两个参数
	jsval v[] = {
		v[0] = int32_to_jsval(jc, 32),
		v[1] =UINT_TO_JSVAL(88)
	};

	// 通过 ScriptingCore 封装好的方法实现回调，可以帮助我们节省很多细节上的研究
	ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj), "callback", 2, v, &retval);


#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) 
	JniMethodInfo minfo;
	bool isHave = JniHelper::getMethodInfo(minfo,"com/bftx/football/Football","openAd", "()V");
	if (!isHave) {        

	}else{         
		minfo.env->CallStaticVoidMethod(minfo.classID, minfo.methodID);     
	}
#endif

}

void ls::Leafsoar::share(){
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) 

	CCSize size = CCDirector::sharedDirector()->getWinSize();
	//定义一个屏幕大小的渲染纹理
	CCRenderTexture* pScreen = CCRenderTexture::create(size.width,size.height, kCCTexture2DPixelFormat_RGBA8888);
	//获得当前的场景指针
	CCScene* pCurScene = CCDirector::sharedDirector()->getRunningScene();
	//渲染纹理开始捕捉
	pScreen->begin();
	//当前场景参与绘制
	pCurScene->visit();
	//结束捕捉
	pScreen->end();
	//保存为png
	pScreen->saveToFile("share.png", kCCImageFormatJPEG);
	CC_SAFE_DELETE(pScreen);

	JniMethodInfo minfo;
	bool isHave = JniHelper::getMethodInfo(minfo,"com/bftx/football/Football","sharedWeixin", "()V");
	if (!isHave) {        

	}else{
		minfo.env->CallStaticVoidMethod(minfo.classID, minfo.methodID);     
	}
#endif
}

void ls::Leafsoar::openUrl(){
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID) 

	JniMethodInfo minfo;
	bool isHave = JniHelper::getMethodInfo(minfo,"com/bftx/football/Football","openUrl", "()V");
	if (!isHave) {        

	}else{
		minfo.env->CallStaticVoidMethod(minfo.classID, minfo.methodID);     
	}
#endif
}

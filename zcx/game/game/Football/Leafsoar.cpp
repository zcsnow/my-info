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

	//  �������������������
	jsval v[] = {
		v[0] = int32_to_jsval(jc, 32),
		v[1] =UINT_TO_JSVAL(88)
	};

	// ͨ�� ScriptingCore ��װ�õķ���ʵ�ֻص������԰������ǽ�ʡ�ܶ�ϸ���ϵ��о�
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
	//����һ����Ļ��С����Ⱦ����
	CCRenderTexture* pScreen = CCRenderTexture::create(size.width,size.height, kCCTexture2DPixelFormat_RGBA8888);
	//��õ�ǰ�ĳ���ָ��
	CCScene* pCurScene = CCDirector::sharedDirector()->getRunningScene();
	//��Ⱦ����ʼ��׽
	pScreen->begin();
	//��ǰ�����������
	pCurScene->visit();
	//������׽
	pScreen->end();
	//����Ϊpng
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

/****************************************************************************
Copyright (c) 2010-2012 cocos2d-x.org

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/
package com.bftx.football;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import org.cocos2dx.lib.Cocos2dxActivity;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;

import com.baidu.mobads.InterstitialAd;
import com.baidu.mobads.InterstitialAdListener;
import com.tencent.mm.sdk.platformtools.BackwardSupportUtil.BitmapFactory;
import com.umeng.analytics.MobclickAgent;

public class Football extends Cocos2dxActivity{
	
	static InterstitialAd interAd;
	
	static Football context;
	
	static Handler handle = new Handler(){
		public void handleMessage(android.os.Message msg) {
			switch (msg.what) {
			case 0:
				if(interAd.isAdReady()){
					System.out.println("show----------");
					interAd.showAd(context);
				}else{
					System.out.println("load----------");
					interAd.loadAd();
				}
				break;
			case 1:
				new Thread(){
					public void run() {
						try {
							File myCaptureFile = new File(Environment.getExternalStorageDirectory().getPath()+"/share.png");
							System.out.println(Environment.getExternalStorageDirectory().getPath()+"/share.png");
							try {
								BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(myCaptureFile));
								Bitmap bmp = scaleImg(BitmapFactory.decodeFile("/data/data/com.bftx.football/files/share.png", 0.1f),360,640);
								bmp.compress(Bitmap.CompressFormat.JPEG, 80, bos);
								bos.flush();
								bos.close();
							} catch (FileNotFoundException e) {
								e.printStackTrace();
							} catch (IOException e) {
								e.printStackTrace();
							}

						  Intent intent=new Intent(Intent.ACTION_SEND);
					      intent.putExtra(Intent.EXTRA_SUBJECT, "����");
					      File file = new File(Environment.getExternalStorageDirectory().getPath()+"/share.png"); 
					      intent.putExtra(Intent.EXTRA_STREAM, Uri.fromFile(file)); 
					      intent.setType("image/*"); 
					      intent.putExtra(Intent.EXTRA_TEXT, "��Ű��");
					      intent.putExtra(Intent.EXTRA_TITLE, "��Ű��");
					      intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK); 
					      intent.putExtra("Kdescription","����Ϸ��Ű�ģ�����һ����#���������#�� http://app.qq.com/#id=detail&appid=1101504397");
					      context.startActivity(Intent.createChooser(intent, context.getTitle()));

						}catch (Exception e) {
							e.printStackTrace();
						}
					};
				}.start();
				break;
			}
		};
	};
	
	protected void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		context = this;
		MobclickAgent.updateOnlineConfig( this );
		interAd = new InterstitialAd(this);
		interAd.setListener(new InterstitialAdListener() {
			@Override
			public void onAdReady() {
				System.out.println("onAdReady");
			}
			
			@Override
			public void onAdPresent() {
				System.out.println("onAdPresent");				
			}
			
			@Override
			public void onAdFailed(String arg0) {
				System.out.println("onAdFailed : "+arg0);				
			}
			
			@Override
			public void onAdDismissed() {
				System.out.println("onAdDismissed");				
			}
			
			@Override
			public void onAdClick(InterstitialAd arg0) {
				System.out.println("onAdClick");				
			}
		});
		interAd.loadAd();
	}
	
	@Override
	protected void onResume() {
		super.onResume();
		MobclickAgent.onResume(this);
	}
	
	public void onPause() {
		super.onPause();
		MobclickAgent.onPause(this);
	}
	
	public void openAd(){
		Message msg = new Message();
		msg.what = 0;
		handle.sendMessage(msg);
	}
	
	public void sharedWeixin(){
		Message msg = new Message();
		msg.what = 1;
		handle.sendMessage(msg);
	}
	
	public void openUrl(){
		Intent intent = new Intent();        
        intent.setAction("android.intent.action.VIEW");    
        Uri content_url = Uri.parse("http://wx.wsq.qq.com/184776578");   
        intent.setData(content_url);  
        context.startActivity(intent);
	}
	
    //ѹ��ͼƬ
    protected static Bitmap scaleImg(Bitmap bm, int newWidth, int newHeight) {
    	// ���ͼƬ�Ŀ��
    	int width = bm.getWidth();
    	int height = bm.getHeight();
    	// ������Ҫ�Ĵ�С
    	int newWidth1 = newWidth;
    	int newHeight1 = newHeight;
    	// �������ű���
    	float scaleWidth = ((float) newWidth1) / width;
    	float scaleHeight = ((float) newHeight1) / height;
    	// ȡ����Ҫ���ŵ�matrix����
    	Matrix matrix = new Matrix();
    	matrix.postScale(scaleWidth, scaleHeight);
    	// �õ��µ�ͼƬ
    	Bitmap newbm = Bitmap.createBitmap(bm, 0, 0, width, height, matrix, true);
    	return newbm;
    }
	
    static {
        System.loadLibrary("cocos2djs");
    }
}

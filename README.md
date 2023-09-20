# conutry-by-continent
這是國家/七大州 JSON資料

```bash
pip3 install googletrans==4.0.0-rc1 time
```

translate.py 翻譯程式有異常，可設定time.sleep(1) 更長，但這樣翻譯更久。因為未設會導致程式來不及翻譯就增加新的資訊導致異常。

若你發生以下問題
if r.status_code != 200 and self.**raise_Exception:**<br/>
AttributeError: 'Translator' object has no attribute 'raise_Exception'. Did you mean: *raise_exception'?<br/>
C:\Users\<User_Folder>\AppData\Local\Programs\Python\Python310\lib\site-packages\googletrans\

如果你想嘗試修復這個問題，請按照以下步驟操作：

1. 找到 googletrans 的安裝位置。這通常位於您的 Python 安裝目錄下的 site-packages 文件夾中。
2. 打開 client.py 文件。
3. 找到 raise_Exception 並將其更改為 raise_exception。
4. 儲存文件並重新執行腳本。

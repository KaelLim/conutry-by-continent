import json
import time
from googletrans import Translator

# 初始化翻譯器
translator = Translator()

# 載入 JSON 文件
with open("country-by-continent.json", "r", encoding="utf-8") as file:
    data = json.load(file)

total_entries = len(data)
start_time = time.time()

# 遍歷資料並翻譯
for index, entry in enumerate(data):
    entry["country"] = translator.translate(entry["country"], src='en', dest='zh-tw').text
    time.sleep(1)  # Pause for 2 seconds
    entry["continent"] = translator.translate(entry["continent"], src='en', dest='zh-tw').text

    # 每5秒顯示一次進度
    if time.time() - start_time > 5:
        progress = (index + 1) / total_entries * 100
        print(f"Loading... {progress:.2f}%")
        start_time = time.time()

    time.sleep(1)  # Pause for another 2 seconds

# 將翻譯後的資料另存為新的 JSON 文件
with open("translated-country-by-continent.json", "w", encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False, indent=4)

print("Translation completed!")

A1: 餐廳清單．Final 
====

![成果畫面](https://github.com/playcsgo/S3_A1-restaurant/blob/main/cover.png)

-------
產品功能
-----
- 使用者可以新增餐廳
- 使用者可以瀏覽餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼
- 使用者也可以透過 Facebook Login 直接登入
- 使用者的密碼要使用 bcrypt 來處理
- 使用者必須登入才能使用餐廳清單
- 使用者登出、註冊失敗、或登入失敗時，使用者都會在畫面上看到正確而清楚的系統訊息
- 種子資料請參考models/seeds/restaurantSeed.js

使用套件
-----
- 可直接複製以下列表到package.json
- $npm update

"bcryptjs": "^2.4.3",
"connect-flash": "^0.1.1",
"express": "^4.18.2",
"express-handlebars": "^7.0.6",
"express-session": "^1.17.3",
"method-override": "^3.0.0",
"mongoose": "^7.0.3",
"passport": "^0.6.0",
"passport-facebook": "^3.0.0",
"passport-local": "^1.0.0"


安裝方式
----
1.使用終端機於套件覆蓋路徑, ，Clone 此專案, 

    $ git clone https://github.com/playcsgo/S3_A1-restaurant.git
    
2.安裝套件 
    $ npm init -y
    $ npm i express express-handlebars mongoose dotenv bcryptjs connect-flash express-session method-override passport passport-facebook passport-local
    
3.創建"自己的".env檔案 

FACEBOOK_ID=SKIP  //#1 到https://developers.facebook.com/ 申請一個login的服務後可取得
FACEBOOK_SECRET=SKIP //#2 同#1
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback  //#3 此處測試時可直接貼上, 上線時則是要按照部屬網域
SESSION_SECRET=ThisIsMySecret //#4 可自行設定喜歡的字串
MONGODB_URI=mongodb://localhost/todo-list  //#5 替換為自己的登入字串
PORT=3000  //#6 看你希望使用哪個port開啟
    
4.啟動
    
    於專案檔案根目錄下
    使用者模式:
    $ npm run start  
    開發模式:
    $ npm run dev
    產生種子用戶與餐廳資料:
    $ npm run seed
    
    出現以下訊息表示成功開啟
    server on
    mongoDB connected!!

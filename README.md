A3: 老爸的私房錢 
====

![成果畫面](https://github.com/playcsgo/A3-3_expense-tracker/blob/main/cover.png)

-------
產品功能
-----
-使用者註冊與登入 
-登入後按照用戶資料顯示記帳項目以及總和
-可新增,修改,刪除記帳項目
-記帳項目有名稱,日期,種類,金額等資訊

使用套件
-----
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

- 專案中有package.json, 可使用 npm update 快速安裝/更新套件
- $ npm update

安裝方式
----
1.使用終端機於套件覆蓋路徑, ，Clone 此專案, 

    $ git clone https://github.com/playcsgo/A3-3_expense-tracker.git
    
2.安裝套件 
    $ npm init -y
    $ npm i express express-handlebars mongoose dotenv bcryptjs connect-flash express-session method-override passport passport-facebook passport-local
    
3.創建"自己的".env檔案 

-請參考資料夾中.env.example
    
4.啟動
    
    於專案檔案根目錄下
    使用者模式:
    $ npm run start  
    開發模式:
    $ npm run dev
    產生種子用戶與記帳資料:
    $ npm run seed
    
    出現以下訊息表示成功開啟
    server is running on localhost:3000
    mongoDB connected
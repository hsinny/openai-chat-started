# 開發步驟
## 實作目標：串接 OpenAI Chat 聊天室
### 子項目
1. [v] POC OpenAI Chat 後端串接
    - [v] 安裝 OpenAI SDK
    - [v] 官方範例
2. [v] 可以訪問 Client 頁面
    - [v] 安裝 Express，起 WebServer
    - [v] 新增前端頁面請求路由，回傳聊天室頁面 html
3. [v] 新增聊天回覆請求路由，回傳 OpenAI Response
    - [x] 安裝 body-parser 解析前端 req.body 
    - [v] 後端串接 OpenAI API
    - [v] 拆分路由和商業邏輯
4. [v] 前端串接後端聊天 API
    - [v] 串接 API
    - [v] 聊天介面操作與顯示
5. [v] 錯誤處理 / 結構優化(拆函式)
    - [v] API 請求失敗時提供更詳細的錯誤訊息
6. [ ] UI/UX 改善
    - [v] 防呆空字串呼叫聊天 API
    - [ ] 刻 UI

# evm-transfer
EVM 链一对一转账程序

## 运行步骤
0. 在终端中输入`npm install`安装所需要的库。
1. 参照`walletData.csv`文件配置私钥和接收地址
2. 在index.js 代码中将下面部分修改成自己的
    ``` 
    const rpc = 'https://eth-mainnet.g.alchemy.com/v2/qRnk4QbaEmXJEs5DMnhitC0dSow-qATl'; // RPC 
    const tokenAddress = '0xB528edBef013aff855ac3c50b381f253aF13b997'; // Token地址
    const walletPath = './walleetData.csv';
    ```
3. 在终端中输入`node index.js`, 回车运行程序。
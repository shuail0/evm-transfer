import { ethers } from 'ethers';
import erc20Abi from './erc20.json' assert { type: 'json' };
import fs from 'fs';


// 将CSV文件转换为Objects
const convertCSVToObjectSync = (filePath) => {
    const objects = [];
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const lines = fileData.trim().split('\n');
    const header = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < header.length; j++) {
            const trimmedKey = header[j].replace(/\s/g, '');
            if (trimmedKey === 'taskTag') {
                obj[trimmedKey] = values[j].trim(); // 移除换行符和其他空白字符
            } else {
                obj[trimmedKey] = values[j];
            }
        }
        objects.push(obj);
    }
    return objects;
};


// 手工配置选项

const rpc = 'https://eth-mainnet.g.alchemy.com/v2/qRnk4QbaEmXJEs5DMnhitC0dSow-qATl'; // RPC 
const tokenAddress = '0xB528edBef013aff855ac3c50b381f253aF13b997'; // Token地址
const walletPath = './walleetData.csv';
const provider = new ethers.getDefaultProvider(rpc);
const walletDatas = convertCSVToObjectSync(walletPath);

; (
    async () => {

        // 遍历walletDatas
        for (let i = 0; i < walletDatas.length; i++) {
            const walletData = walletDatas[i];
            const wallet = new ethers.Wallet(walletData.privateKey, provider);
            const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, wallet)
            const balance = await tokenContract.balanceOf(wallet.address);
            console.log(`Wallet ${i + 1}: ${balance.toString()}`);

            if (0 >= balance) {
                console.log(`Wallet ${i + 1} has no balance, skipping...`);
                continue;
            }
            // 转账至指定地址
            const tx = await tokenContract.transfer(walletData.toAddress, balance);
            console.log(`transfer sussces,Tx Hash: ${tx.hash}`);
        }

    }

)();


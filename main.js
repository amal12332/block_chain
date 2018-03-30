const SHA256 = require('crypto-js/sha256');
class Block{
    constructor(index, timeStamp, data, previousHash="" ){
        this.index =index;
        this.timeStamp =timeStamp;
        this.data =data;
        this.previousHash =previousHash;
        this.hash =this.calculateHash();
        
    }
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timeStamp+JSON.stringify(this.data)).toString();
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0,"03/03/2018","Genesis block","0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
 
let devCoin = new Blockchain();
devCoin.addBlock(new Block(1,"04/03/2018",{amount:10}));
devCoin.addBlock(new Block(2,"05/03/2018",{amount:20}));
console.log(JSON.stringify(devCoin));
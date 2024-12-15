// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
contract ResearchData {

    struct RData {
        address userAddress;
        string dataId;
        string name;
        string data;
        string fileHash;
        uint timestamp;

    }

    RData[] dataList;

    address dataSender;
    /*constructor()
    {
        dataSender = msg.sender;
    } */

    //share documents/research papers to the blockchain
    function shareData(string calldata dataId, string calldata name, string calldata data, string calldata fileHash) external  {
        dataList.push(RData(msg.sender,dataId,name,data,fileHash,block.timestamp));
    }

    //recieve research paper data
    function getRData() public  view  returns(RData[] memory) {
        return dataList;
    }

}

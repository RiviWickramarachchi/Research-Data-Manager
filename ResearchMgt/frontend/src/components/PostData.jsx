import { ethers } from 'ethers';
import React, { useEffect, useState, useContext} from 'react';
import ABI from '../contractJson/Test.json';
import AuthContext from '../context/AuthContext';
import './PostData.css';
import axios from "axios"




const PostData = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name:'',
        data:'',
    });

    const [ethereumState, setEthereumState] = useState({
        provider: null,
        signer: null,
        contract: null,
        account: 'No account found'
    });

    useEffect(() => {
        const contractAddress = '0x3D2Df4eBfAE2696AAAB92b7e4828aecE2C8422a6';
        const contractABI = ABI.abi;

        const connectToEthereum = async () => {
            try {
                const { ethereum } = window;
                if (ethereum) {
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, contractABI, signer);

                    setEthereumState({
                        provider: provider,
                        signer: signer,
                        contract: contract,
                        account: accounts[0]
                    });

                    ethereum.on('accountsChanged', (newAccounts) => {
                        setEthereumState(prevState => ({
                            ...prevState,
                            account: newAccounts[0]
                        }));
                    });
                } else {
                    alert('Please install MetaMask.');
                }
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        };

        connectToEthereum();

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
            }
        };
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.id]: event.target.value });
    };

    const [fileVal, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const {generateUID} = useContext(AuthContext)
    const {addPostAddress} = useContext(AuthContext)

    const handleFileChange = (e) => {
        e.preventDefault();
        console.log("File Sec");
        const data = e.target.files[0]; //files array of files object

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);

        reader.onloadend = () => {

          setFile(e.target.files[0]);
          setFileName(e.target.files[0].name);
        };
      };

      //testHook
    //   useEffect(() => {
    //     console.log("FileName after value change: "+ fileName);
    //   }, [fileName]);

    //   useEffect(() => {
    //     console.log("FileValue after valueChange: "+ fileVal);
    //   }, [fileVal]);

    const postData = async (event) => {
        event.preventDefault();
        const { contract } = ethereumState;
        const { name, data,file } = formData;

        if(fileVal) {
            try {
                const fileData = new FormData();
                fileData.append("file",fileVal);
                const PINATA_API = "00a20264db6c02af3cf0";
                const PINATA_SECRET = "a0a042874b2675840fc41cae8bb31f1624deb67ba159d6a38ad2680545310e00";
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: fileData,
                    headers: {
                      pinata_api_key: PINATA_API,
                      pinata_secret_api_key: PINATA_SECRET,
                      "Content-Type": "multipart/form-data",
                    },
                  });

                const fileHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                console.log(fileHash);
                const idVal = await generateUID();
                console.log("ID VAL : "+ idVal);

                //uploading data to the blockchain
                //Do this only if a valid ID is generated and returned
                if(idVal !== null)
                {
                    const results = await contract.shareData(idVal, name, data, fileHash);
                    await results.wait();
                    //const resultsInJson =  JSON.stringify(results);
                    const hashID = results.hash;

                    if (results && hashID !== null)
                    {
                        console.log('Data block created with dataId:', hashID);
                        alert("Data Posted to Blockchain with dataId: " + hashID);
                        //Post the Address on the User AddressList
                        await addPostAddress(idVal);
                        setFormData({ name: '', data: ''});
                        onClose();
                    }
                    else
                    {
                        console.error('Error: Data block creation failed');
                        alert("Error: Data block creation has failed");
                    }

                    // Check if the dataId has a value
                }
                else {
                    console.log("ID didnt get generated properly");
                }

            }
            catch(error) {
                console.error('Error posting data:', error);
                alert('Error posting data');
            }
        }

        // try {
        //     const results = await contract.shareData(name, data, file);
        //     await results.wait();
        //     console.log('Data posted to blockchain');
        //     alert("Data Posted to Blockchain");
        //     setFormData({ name: '', data: '', fileHash: ''});
        //     onClose();
        // } catch (error) {
        //     console.error('Error posting data:', error);
        //     alert('Error posting data');
        // }
    };

    return (
        <div className="modal-background">
            <div className="post-data-modal">
                <button className="close-modal-button" onClick={onClose}>X</button>
                <form onSubmit={postData}>
                    <p>Account: {ethereumState.account}</p>
                <label htmlFor="name">Name</label>
                <input id="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="data">Data</label>
                <input id="data" value={formData.data} onChange={handleChange} required />

                <label htmlFor="hashfile">HashFile</label> {/* this must be of type file and the file value should be converted into hash using ipfs */}
                <input id="hashfile" type='file' onChange={handleFileChange} required />

                <button type="submit" >Submit</button>
            </form>
        </div>
    </div>
    );
};

export default PostData;

import React, { useEffect, useState, useContext } from 'react';
//import AuthContext from '../context/AuthContext';
import PostData from '../components/PostData';
import ShowData from '../components/ShowData';
import ABI from '../contractJson/ResearchData.json';
import NavigationBar from "../components/NavigationBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import { ethers } from "ethers";
import { Web3Provider } from '@ethersproject/providers';



const Dashboard = ({setContractState}) => {

    const [state, setState] = useState({
        provider: null,
        signer : null,
        contract: null
       })

    const [account, setAccount] = useState('No account found');

    useEffect (() => {

       const view = async () => {
         const contractAddress = '0xe46723bF3e126d79b25b92B05914C8eeA26769e2';
         const contractABI = ABI.abi;

         try {
           const {ethereum} = window;
           const account = await ethereum.request({method: 'eth_requestAccounts'})
           setAccount(account);
           //const provider = new ethers.providers.Web3Provider(ethereum);
           const provider = new Web3Provider(ethereum);
           //const provider = new ethers.BrowserProvider(window.ethereum)
           const signer = provider.getSigner();
           const contract = new ethers.Contract(contractAddress, contractABI, signer)
           setState({ provider, signer, contract });
           setContractState(state);
           //console.log(contract);
         }
         catch (error)
         {
             alert(error);
         }
       }
     view();
     }, [state])


    /*const {logoutUser} = useContext(AuthContext)
    const handleLogout  = (e) => {
        e.preventDefault();
        logoutUser()

    };*/


    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [researchData, setResearchData] = useState([]);
    const {contract} = state;

    const handleOpenUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const handleCloseUploadModal = () => {
        setIsUploadModalOpen(false);
    };


 /*useEffect(() => {
    const displayData = async () => {
        const data = await contract.getRData();
     setResearchData(data);
    }
    contract && displayData();
   })*/

    return (
        <div className='dashboard-header'>
            <NavigationBar/>
            <h1>Dashboard</h1>
            {/*<button className='upload-button' onClick={handleLogout}> Logout</button>*/}
            <button className="upload-button" onClick={handleOpenUploadModal}>
                Upload Research Data
            </button>
            {isUploadModalOpen && (
                <PostData onClose={handleCloseUploadModal} />
            )}
            <ShowData state={state}/>

        </div>
    );
};

export default Dashboard;
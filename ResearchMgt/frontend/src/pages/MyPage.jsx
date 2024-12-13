import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
//import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const MyPage = ({contractState}) => {
    const { contract } = contractState;
    const [datas, setData] = useState([]);
    const [addressMap,setAddressMap] = useState([]);
    console.log("State Data: "+contract);
    const {getUserPostAddresses} = useContext(AuthContext)
    const {deletePostAddress} = useContext(AuthContext)
    //const {user} = useContext(AuthContext);

    const deleteAddress = async (addressId, event) => {
        event.preventDefault();
        console.log("deleting address!!");
        await deletePostAddress(addressId);
    }

    useEffect(()=>{
        const displayData = async()=>{
            if(contract)
            {
                const datas = await contract.getRData();
                setData(datas);
                console.log("data display: "+datas);
                const userPostAddressData = await getUserPostAddresses();
                console.log("User Post Address Data : "+ JSON.stringify(userPostAddressData));
                const tempAddressMap = {};
                for(const address_id in userPostAddressData) {
                    if (userPostAddressData.hasOwnProperty(address_id)) {
                        // Check if the address ID exists in the list of address objects from the blockchain
                        const addressObject = datas.find(address => address.dataId === address_id);

                        // If the address ID exists in the list of address objects from the blockchain
                        if (addressObject) {
                            // Display the data associated with that address object
                            const viewStatusBool = userPostAddressData[address_id];
                            tempAddressMap[addressObject.dataId] = {addressObject, viewStatusBool};
                        }
                    }
                }
                setAddressMap(tempAddressMap);
                console.log("Addresses :",tempAddressMap);
            }
            else {
                console.log("Contract mustve been null ");
            }
        }

       
        contract && displayData();
        //console.log(user);
        //console.log(user.email)
        //console.log()
    },[contract])

    return (
        <div>
            {Object.keys(addressMap).map(address_id => (

                <Card key = {address_id}>
                    <Card.Header as="h5">{address_id}</Card.Header>
                    <Card.Body>
                        <Card.Title>{addressMap[address_id].addressObject.name}</Card.Title>
                        <Card.Text>
                        <a href={addressMap[address_id].addressObject.fileHash} > Click the Link To View Data</a>
                        </Card.Text>
                        <Card.Text>
                             {addressMap[address_id].viewStatusBool.toString()}
                        </Card.Text>
                        <Button variant="outline-danger" onClick={deleteAddress.bind(null,address_id)}>Delete</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );

};

export default MyPage;
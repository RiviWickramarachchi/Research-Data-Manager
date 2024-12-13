import { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AuthContext from '../context/AuthContext';
import { jwtDecode as jwt_decode } from "jwt-decode";

const ShowData=({state})=> {
    const [datas, setData] = useState([]);
    const {contract} = state;
    const {user} = useContext(AuthContext);
    const {updatePostAddressViewStat} = useContext(AuthContext);



    useEffect(()=>{
        const displayData = async()=>{
            const datas = await contract.getRData();
            setData(datas);
            //console.log("data display: "+datas);
        }
        contract && displayData();
        //console.log(user);
        //console.log(user.email)
        //console.log()
    })

    const handleLinkClick = async (addressId, event) => {
        //func1 check if the user who clicked on the link is the one who uploaded it (GET method)
        //if its a different user
        //func2 update the view_status of the address Object
        //to test
        event.preventDefault();
        console.log("clicked");
        await updatePostAddressViewStat(addressId);
    }

    return (
        <div>
            {datas.map((dta, index ) => (
                <Card key= {index} >
                <Card.Header as="h5">{dta.dataId}</Card.Header>
                <Card.Body>
                  <Card.Title>{dta.name}</Card.Title>
                  <Card.Text>
                  <a href={dta.fileHash} onClick={handleLinkClick.bind(null,dta.dataId)} > Click the Link To View Data</a>
                  </Card.Text>
                  <Card.Text>
                       Bool Of User Post Address
                  </Card.Text>
                  <Button variant="primary">View</Button>
                </Card.Body>
              </Card>
            ))}
        </div>
    );


};

export default ShowData;
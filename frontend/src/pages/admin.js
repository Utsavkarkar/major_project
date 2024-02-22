import React,{useState,useEffect} from "react";
import Table from 'react-bootstrap/Table';

const Admin=()=>{
    const [pdata,setpdata] = useState([]);   
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                // localStorage.setItem('selectedImage', reader.result);
            };
            reader.readAsDataURL(file);
        }}


    const onSubmithandler=(event)=>{
        event.preventDefault()
        // const file  =  event.target.url.files[0];
      
        var skins = {
            // id : new Date().getTime(),
            name: event.target.name.value,
            sname: event.target.sname.value,
            url :selectedImage,
            price: event.target.price.value,
            qty: event.target.qty.value
        }
      

        if(localStorage.getItem("Productdata")){
            var skinData = JSON.parse(localStorage.getItem('Productdata'));
            skinData.push(skins)
            
            // console.log(skinData)
            
            localStorage.setItem('Productdata',JSON.stringify(skinData))
           
        }
        else{
            // const DataArray = JSON.stringify([skins])
            localStorage.setItem('Productdata',JSON.stringify([skins]));
        }
       
    }
    console.log(pdata);
    useEffect(() => {
        setpdata(JSON.parse(localStorage.getItem('Productdata')) || [])
    }, [])

    const onclickEdit = (event)=>{
        // console.log(event);
    }
    
    const onclickSearch=(event)=>{
        const searchData = JSON.parse(localStorage.getItem('Productdata'))
        const searchFilter = searchData.filter((i) => i.name === event.target.value)
        if(searchFilter){
            setpdata(searchFilter)
        }else{
            setpdata(searchData)
        }
    }

    return(
        
        <div>
            <form onSubmit={onSubmithandler} encType="multipart/form-data">
                <input type="text" name="name" placeholder="enter category"/>  <br/><br/>
                <input type="text" name="sname" placeholder="enter skin name"/>  <br/><br/>
                {/* <input type="file" name="url"  accept="image/*" placeholder="enter skin image url"/><br/><br/> */}
                <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                /><br/><br/> 
                <input type="text" name="price" placeholder="enter skin price"/><br/><br/>
                <input type="text" name="qty" placeholder="enter skin qty"/><br/><br/>
                {/* <input type="submit" /><br/><br/> */}
                <button type="submit" className='btn btn-primary'>
                    SUBMIT
                </button><br/><br/><br/><br/>
                <input type="text" name="search" onChange={onclickSearch} placeholder="search here..."/><br/><br/>
                {/* <button type="submit" onClick={onclickSearch} className='btn btn-primary'>
                    SUBMIT
                </button><br/><br/> */}
            </form>
            
            <Table striped bordered="black" >
                <thead>
                    <tr>
                        <th>category</th>
                        <th>name</th>
                        <th>url</th>
                        <th>Price</th>
                        <th>qty</th>
                    </tr>
                </thead>
                <tbody>
                {pdata?.map((i) => {
                                return (
                                    <tr>
                                       
                                        <td>{i.name}</td>
                                        <td>{i.sname}</td>
                                        <td>
                                            <img src={i.url} width='100px' height='100px' alt="img"/>
                                        </td>
                                        <td>{i.price}</td> 
                                        <td>{i.qty}</td>
                                        <td>
                                            <button className='btn btn-success me-3' onClick={() => onclickEdit(i)}>Edit</button>
                                            {/* <button className='btn btn-danger' onClick={() => onclikdelete(i.id)}>Delete</button> */}
                                        </td>
                                    </tr>
                                )
                            })}
                </tbody>
            </Table>

        </div>
    )
}

export default Admin
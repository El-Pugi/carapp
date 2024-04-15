import React, {useState, useEffect} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, Snackbar} from "@mui/material";
import Addcar from "./Addcar";
import Editcar from "./Editcar";


export default function Carlist(){

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = () => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars));
    }

    const deleteCar = (carId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            console.log(carId)
            fetch(`https://carrestservice-carshop.rahtiapp.fi/cars/${carId}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        setMsg("Car deleted successfully");
                        setOpen(true);
                        fetchData();
                    } else {
                        throw new Error("Failed to delete car.");
                    }
                })
                .catch((error) => {
                    setMsg(error.message);
                    setOpen(true);
                });
        }
    };

    const saveCar = (car) => {
        fetch('https://carrestservice-carshop.rahtiapp.fi/cars', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
    }
    
    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            headerName: 'Brand',
            field: 'brand',
            filter: true
        },
        {
            headerName: 'Model',
            field: 'model',
            filter: true
        },
        {
            headerName: 'Color',
            field: 'color',
            filter: true
        },
        {
            headerName: 'Fuel',
            field: 'fuel',
            filter: true
        },
        {
            headerName: 'ModelYear',
            field: 'modelYear',
            filter: true
        },
        {
            headerName: 'Price',
            field: 'price',
            filter: true
        },
        {
            width: 100,
            cellRenderer: row => <Editcar car={row.original}/>
        },
        {
            headerName: 'Delete',
            cellRenderer: (params) => (
                <Button size="small" color="error" onClick={() => deleteCar(params.data._links.self.href.split("/").pop())}>Delete</Button>
            )
        }
    ];

    return(
        
        <div className="ag-theme-alpine" style={{ height: '700px', width: '100%' }}>
            <Addcar saveCar={saveCar}/>
            <AgGridReact rowData={cars} columnDefs={columns} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}
                />
        </div>
    );
}
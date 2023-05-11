import React, { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { serverCalls } from "../../api";
import { useGetData } from "../../custom-hooks";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { DroneForm } from "../DroneForm";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
    },
    {
        field: "description",
        headerName: "Description",
        width: 150,
        editable: true,
    },
    {
        field: "price",
        headerName: "Price",
        width: 110,
        editable: true,
        type: "number",
    },
    {
        field: "camera_quality",
        headerName: "Camera Quality",
        width: 160,
    },
    {
        field: "flight_time",
        headerName: "Flight Time",
        width: 110,
        editable: true,
    },
    {
        field: "max_speed",
        headerName: "Max Speed",
        width: 110,
        editable: true,
    },
    {
        field: "dimensions",
        headerName: "Dimensions",
        width: 110,
        editable: true,
    },
    {
        field: "weight",
        headerName: "Weight",
        width: 110,
        editable: true,
    },
    {
        field: "cost_of_production",
        headerName: "Cost of Production",
        width: 110,
        editable: true,
        type: "number",
    },
    {
        field: "series",
        headerName: "Series",
        width: 110,
        editable: true,
    },
    {
        field: "random_joke",
        headerName: "Joke",
        width: 1000,
        editable: true,
    },
];

interface gridData {
    data: {
        id?: string;
    };
}

export const DataTable = () => {
    const { droneData, getData } = useGetData();
    const [open, setOpen] = useState(false);
    const [gridData, setData] = useState<GridRowSelectionModel>([]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteData = () => {
        serverCalls.delete(`${gridData[0]}`);
        getData();
    };

    // conditionally render data table if we have an authenticated user
    const myAuth = localStorage.getItem("myAuth");

    if (myAuth == "true") {
        return (
            <Box sx={{ height: 400, width: "100%" }}>
                <h2>Drones in Inventory</h2>
                <DataGrid
                    rows={droneData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setData(newSelectionModel);
                    }}
                    {...droneData}
                />
                <Button onClick={handleOpen}>Update</Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteData}>
                    Delete
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        Update a Drone
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Drone ID: {gridData[0]}
                        </DialogContentText>
                        <DroneForm id={`${gridData[0]}`} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        );
    } else {
        return (
            <div>
                <h3>Please Sign In To View Your Collection</h3>
            </div>
        );
    }
};

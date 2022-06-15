import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import {
    Paper,
    TextField,
    Typography,
    Grid,
    MenuItem,
} from "@material-ui/core";
import { Collapse, CardBody, Card } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import EnhancedTable from "../orderCutTable";
const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
    paper: {},
    field: {
        //width: '200px'
    },
    margin: {
        margin: theme.spacing(1),
    },
    columnPaper: {
        display: "grid",
        gridTemplateColumns: "25% 25% 25% 25%",
        margin: "10px 5px",
    },
    button: {
        margin: theme.spacing(0.5),
    },
}));
function createData(cut, bundle, amount, selection) {
    return { cut, bundle, amount, selection };
}
let total_order_amount_for_partial = 0;
function setAmountFunction(amount) {
    total_order_amount_for_partial = amount;
}

let orders = [];
const OrderTransferItem = (props) => {
    const [headCells, setHeadCells] = React.useState([
        {
            id: "cut",
            numeric: false,
            disablePadding: true,
            label: "Cut",
        },
        {
            id: "bundle",
            numeric: true,
            disablePadding: false,
            label: "No. of Bundles",
        },
        {
            id: "amount",
            numeric: true,
            disablePadding: false,
            label: "Cut wise Amount",
        },

        {
            id: "selection",
        },
    ]);
    const [Loading, setLoading] = React.useState(false);
    const [status, setstatus] = React.useState(props.status);
    const [value, setValue] = React.useState("complete");
    const [toggleText, setToggleText] = React.useState("Show Cuts");
    const [collapse, setCollapse] = useState(false);
    const [orderAmount, setOrderAmount] = useState(0);
    let [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        props.selectedOrders.map((selectedOrder) => {
            if (selectedOrder.order === props.order) {
                setstatus(selectedOrder.status);
            }
        });
        let cuts = [];
        props.AllProgressCompleteData.map((order) => {
            if (order.orderID === props.Order) {
                let selection_flag = false;
                props.selectedOrders.map((selected_order) => {
                    selected_order.selected_cuts.map((cut) => {
                        if (cut.cut === order.CutID) {
                            selection_flag = cut.selection;
                        }
                    });
                });
                cuts.push(
                    createData(
                        order.CutID,
                        order.TotalBundlesInCut,
                        order.CutwiseAmount,
                        selection_flag
                    )
                );
            }
        });
        setRows(cuts);
        props.selectedOrders.map((order) => {
            if (order.value === props.Order) {
                setValue(order["complete/partial"]);
                let total_amount = 0;
                // if (order["complete/partial"] === "complete") {
                props.AllProgressCompleteData.map((item) => {
                    if (item.orderID === props.Order) {
                        total_amount =
                            parseFloat(total_amount) +
                            parseFloat(item.CutwiseAmount);
                    }
                });
                setOrderAmount(total_amount);
                // setAmountFunction(0);
                //}
            }
        });
    }, []);
    const handleRadioChange = (event) => {
        setValue(event.target.value);
        props.selectedOrders.map((order) => {
            if (order.value === props.Order) {
                order["complete/partial"] = event.target.value;
                order["selected_cuts"] = rows;
                let selected_cuts_count = 0;
                rows.map((row) => {
                    if (row.selection) {
                        selected_cuts_count++;
                    }
                });
                if (selected_cuts_count === 0) {
                    setAmountFunction(0);
                }
            }
        });
    };
    const cutSelectionChangeListener = (rows) => {
        setRows(rows);
    };
    const toggle = () => {
        setCollapse(!collapse);
        if (!collapse) {
            setToggleText("Hide Cuts");
        } else {
            setToggleText("Show Cuts");
        }
    };
    const classes = useStyles();
    return (
        <Paper
            className={classes.paper}
            style={{
                backgroundColor: "#FFF",
                margin: "15px 5px 5px 5px",
            }}
        >
            <Grid
                container
                style={{
                    backgroundColor:
                        status === "complete"
                            ? "#488F48"
                            : status === "failed"
                            ? "#F84242"
                            : "#FFF",
                    margin: "15px 5px 5px 5px",
                }}
            >
                {/* <IconButton aria-label="delete" className={classes.margin}>
                    <DeleteIcon fontSize="large" />
                </IconButton> */}
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        style={{
                            display: "flex",
                            textAlign: "center",
                            marginTop: "10px",
                            marginLeft: "15px",
                            justifyContent: "center",
                            fontSize: "20px",
                        }}
                        variant="subtitle2"
                    >
                        {props.Order}
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            onChange={handleRadioChange}
                            aria-label="position"
                            name="position"
                            value={value}
                            style={{ fontSize: "20px" }}
                            setValue="complete"
                            defaultValue="top"
                        >
                            <FormControlLabel
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                }}
                                value="complete"
                                control={<Radio color="primary" />}
                                label="Complete"
                            />
                            <FormControlLabel
                                style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                }}
                                value="partial"
                                control={<Radio color="primary" />}
                                label="Partial"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        style={{
                            display: "flex",
                            textAlign: "center",
                            marginTop: "10px",
                            marginLeft: "15px",
                            fontSize: "20px",
                            justifyContent: "center",
                        }}
                        variant="subtitle2"
                    >
                        {value === "complete"
                            ? Math.round(orderAmount)
                            : total_order_amount_for_partial}
                    </Typography>
                </Grid>
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    {value === "complete" && (
                        <Typography
                            style={{
                                display: "flex",
                                textAlign: "center",
                                marginTop: "10px",
                                marginLeft: "15px",
                                fontSize: "20px",
                                justifyContent: "center",
                            }}
                            variant="subtitle2"
                        >
                            All Cuts for this Order have been included
                        </Typography>
                    )}
                    {value === "partial" && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggle}
                            className={classes.button}
                            endIcon={
                                collapse ? (
                                    <KeyboardArrowUpIcon />
                                ) : (
                                    <KeyboardArrowDownIcon />
                                )
                            }
                        >
                            {toggleText}
                        </Button>
                    )}
                </Grid>

                <Grid container>
                    {value === "partial" && collapse == true && (
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <EnhancedTable
                                headCells={headCells}
                                data={rows}
                                totalAmount={orderAmount}
                                setAmountFunction={setAmountFunction}
                                setSelection={cutSelectionChangeListener}
                            />
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default OrderTransferItem;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import AttachmentRounded from "@material-ui/icons/AttachmentRounded";
import InfoRounded from "@material-ui/icons/InfoRounded";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import { blue } from "@material-ui/core/colors";
import { serverIP } from "../../util/Constants";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },

  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = React.useState(false);
  const emails = ["username@gmail.com", "user02@gmail.com"];

  const handleListItemClick = (value) => {
    window.location.href = serverIP + value.path;
  };

  const handleClose = () => {
    setDialogOpen(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Email Body</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {row.BodyParams.header + "\n" + row.BodyParams.bodyContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={() => setAttachmentDialogOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={attachmentDialogOpen}
      >
        <DialogTitle id="simple-dialog-title">Email Attachments</DialogTitle>
        <List>
          {row.BodyParams.attachments.length > 0 &&
            row.BodyParams.attachments.map((email) => (
              <ListItem
                button
                onClick={() => handleListItemClick(email)}
                key={email.filename}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email.orignalFileName} />
              </ListItem>
            ))}
          {row.BodyParams.attachments.length === 0 && (
            <ListItem autoFocus button>
              <ListItemAvatar>
                <Avatar>
                  <CancelOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="No Attachments" />
            </ListItem>
          )}
        </List>
      </Dialog>

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.BodyParams.user}</TableCell>
        <TableCell align="center">{row.BodyParams.from}</TableCell>
        <TableCell align="center">{row.BodyParams.to}</TableCell>
        <TableCell align="center">
          {moment(row.createdAt).format("L")}
        </TableCell>
        <TableCell align="center">{row.BodyParams.subject}</TableCell>
        <TableCell align="center">{row.BodyParams.header}</TableCell>
        <TableCell align="center">{row.BodyParams.footer}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => {
              setDialogOpen(true);
            }}
            aria-label="delete"
            className={classes.margin}
          >
            <InfoRounded fontSize="medium" />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            aria-label="delete"
            className={classes.margin}
            onClick={() => {
              setAttachmentDialogOpen(true);
            }}
          >
            <AttachmentRounded fontSize="medium" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Array
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {Object.keys(row.BodyParams.table[0]).map((cell) => {
                      return <TableCell>{cell}</TableCell>;
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.BodyParams.table.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      {Object.keys(row.BodyParams.table[0]).map((cell) => {
                        return <TableCell>{historyRow[cell]}</TableCell>;
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  root: {
    width: "164vh",
  },
  container: {
    height: "70vh",
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">User</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Parse Date</TableCell>
              <TableCell align="center">Subject</TableCell>
              <TableCell align="center">Header</TableCell>
              <TableCell align="center">Footer</TableCell>
              <TableCell align="center">Body</TableCell>
              <TableCell align="center">Attachments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mailsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return <Row key={row._id} row={row} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.mailsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

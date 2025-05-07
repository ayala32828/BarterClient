import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './tbl1.css'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addMeetingThunk } from '../../../store/thunks/ps/addMeeting';
import { IDontWanToSeeThunk } from '../../../store/thunks/ps/IDontWanToSee';
// import { partnerShipsSlice } from '../../../store/slices/partnerShips';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [newDoc, setNewDoc] = React.useState({
    meetingId:0,
    offInUsedId:row.psId,
    place:"",
    time:"",
    more:"",
    meetingDate:null,
    pid:row.myId,
    transcription:""
  });

  function addDoc(){
    // console.log(newDoc);
    if(newDoc.time==""  || newDoc.meetingDate=='00/00/0000' )
    alert("בבקשה נא למלא שעה ותאריך")
    else{
    dispatch(addMeetingThunk(newDoc));
    setNewDoc({
      meetingId:0,
      offInUsedId:row.psId,
      place:"",
      time:"",
      more:"",
      meetingDate:'00/00/0000',
      pid:row.myId,
      transcription:""
    })}
  }
  function IDontWantToSeePs(id){
    alert('!!יותר לא יופיע החברותא')
    dispatch(IDontWanToSeeThunk(id))
}

  return (
    <React.Fragment >
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* <TableCell component="th" scope="row">
          {row.psName}
          ss
        </TableCell> */}
        <TableCell align="center">{row.psName}</TableCell>
        <TableCell align="center">{row.pName}</TableCell>
        <TableCell align="center">{row.phone}</TableCell>
        <TableCell align="center">{row.mail}</TableCell>
        <TableCell align="center">{row.details}</TableCell>
      <TableCell align="center" >  <button onClick={()=>IDontWantToSeePs(row.psId)} style={{backgroundColor:"rgba(250, 235, 215, 0)",border:'none',fontSize:'xlarge'}}>👀</button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1,marginRight:7 }}>
              <Typography align="right" variant="h6" gutterBottom component="div">
                הסטוריה
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow >
                    <TableCell align="center">תאריך</TableCell>
                    <TableCell align="center">שעה</TableCell>
                    <TableCell align="center">מקום</TableCell>
                    <TableCell align="center">תאור</TableCell>
                    <TableCell align="center"></TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.historyArr.map((historyRow) => (
                    <TableRow key={historyRow.meetingId}>
                      <TableCell  align="center" component="th" scope="row">
                      {new Date(historyRow.meetingDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">{historyRow.time}</TableCell>
                      <TableCell align="center">{historyRow.place}</TableCell>
                      <TableCell align="center">
                        {historyRow.transcription+'\n'}
                        
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow >
                      <TableCell align="center" component="th" scope="row">
                       <input value={newDoc.meetingDate} onChange={e => setNewDoc({ ...newDoc, meetingDate: e.target.value })}  className='decInput' type='date'/>
                      </TableCell>
                      <TableCell align="center"> <input value={newDoc.time} onChange={e => setNewDoc({ ...newDoc, time: e.target.value })} className='decInput' type='time'/></TableCell>
                      <TableCell align="center"> <input value={newDoc.place} onChange={e => setNewDoc({ ...newDoc, place: e.target.value })} className='decInput' type='text'/></TableCell>
                      <TableCell align="center">                   
                      <input value={newDoc.transcription} onChange={e => setNewDoc({ ...newDoc, transcription: e.target.value })} className='decInput' type='text'/>
                      </TableCell>
                      <TableCell align="center"><button onClick={()=>addDoc()} style={{backgroundColor:"rgba(250, 235, 215, 0)",border:'none'}}>👍</button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable(props) {
  React.useEffect(() => {
    console.log(props.tbl)
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow >
            <TableCell />
            <TableCell align="center" > שם החברותא</TableCell>
            <TableCell align="center">שם השותף</TableCell>
            <TableCell align="center">פלאפון</TableCell>
            <TableCell align="center">מייל</TableCell>
            <TableCell align="center">סיכום</TableCell>
            <TableCell align="center">לא מעונין</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {props.tbl && props.tbl.filter(r=>r.hidden!=false).map((row) => (
            <Row key={row.psName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
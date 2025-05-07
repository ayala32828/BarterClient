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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './tbl1.css'
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addMeetingThunk } from '../../../store/thunks/ps/addMeeting';
import { IDontWanToSeeThunk } from '../../../store/thunks/ps/IDontWanToSee';

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
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

  // טיפול בלחיצה על שורה
  const handleRowClick = () => {
    setSelected(!selected);
  };

  return (
    <React.Fragment >
      <TableRow 
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={handleRowClick}
        className={selected ? 'selected' : ''}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className={open ? 'rotate-icon' : ''}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" className={row.psName ? '' : 'empty'}>
          {row.psName || 'לא צוין'}
        </TableCell>
        <TableCell align="center" className={row.pName ? '' : 'empty'}>
          {row.pName || 'לא צוין'}
        </TableCell>
        <TableCell align="center" className={row.phone ? '' : 'empty'}>
          {row.phone || 'לא צוין'}
        </TableCell>
        <TableCell align="center" className={row.mail ? '' : 'empty'}>
          {row.mail || 'לא צוין'}
        </TableCell>
        <TableCell align="center" className={row.details ? '' : 'empty'}>
          {row.details || 'אין פרטים נוספים'}
        </TableCell>
        <TableCell align="center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              IDontWantToSeePs(row.psId);
            }} 
            style={{backgroundColor:"rgba(250, 235, 215, 0)",border:'none',fontSize:'xlarge'}}
            className="eye-button"
            title="הסתר חברותא זו"
          >
            👀
          </button>
        </TableCell>
      </TableRow>
      <TableRow className={open ? 'expanded' : ''}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1,marginRight:7 }} className="details-box">
              <Typography align="right" variant="h6" gutterBottom component="div" className="history-title">
                הסטוריה
              </Typography>
              <Table size="small" aria-label="purchases" className="history-table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">תאריך</TableCell>
                    <TableCell align="center">שעה</TableCell>
                    <TableCell align="center">מקום</TableCell>
                    <TableCell align="center">תאור</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.historyArr && row.historyArr.length > 0 ? (
                    row.historyArr.map((historyRow, index) => (
                      <TableRow key={historyRow.meetingId || index} className="history-row">
                        <TableCell align="center" component="th" scope="row" className="date-cell">
                          {new Date(historyRow.meetingDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">{historyRow.time}</TableCell>
                        <TableCell align="center">{historyRow.place}</TableCell>
                        <TableCell align="center">
                          {historyRow.transcription || 'אין תיאור'}
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" className="empty">
                        אין היסטוריה זמינה
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow className="new-entry-row">
                    <TableCell align="center" component="th" scope="row">
                      <input 
                        value={newDoc.meetingDate} 
                        onChange={e => setNewDoc({ ...newDoc, meetingDate: e.target.value })}  
                        className='decInput date-input' 
                        type='date'
                        placeholder="בחר תאריך"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input 
                        value={newDoc.time} 
                        onChange={e => setNewDoc({ ...newDoc, time: e.target.value })} 
                        className='decInput time-input' 
                        type='time'
                        placeholder="בחר שעה"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <input 
                        value={newDoc.place} 
                        onChange={e => setNewDoc({ ...newDoc, place: e.target.value })} 
                        className='decInput place-input' 
                        type='text'
                        placeholder="הכנס מקום"
                      />
                    </TableCell>
                    <TableCell align="center">                   
                      <input 
                        value={newDoc.transcription} 
                        onChange={e => setNewDoc({ ...newDoc, transcription: e.target.value })} 
                        className='decInput description-input' 
                        type='text'
                        placeholder="הוסף תיאור"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <button 
                        onClick={() => addDoc()} 
                        style={{backgroundColor:"rgba(250, 235, 215, 0)",border:'none'}}
                        className="confirm-button"
                        title="אישור"
                      >
                        👍
                      </button>
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

export default function CollapsibleTable(props) {
  const [hoveredRow, setHoveredRow] = React.useState(null);
  
  React.useEffect(() => {
    console.log(props.tbl);
    
    // הוספת אפקט הופעה הדרגתית לטבלה
    const table = document.querySelector('.MuiTableContainer-root');
    if (table) {
      table.style.opacity = '0';
      setTimeout(() => {
        table.style.opacity = '1';
        table.style.transition = 'opacity 0.5s ease';
      }, 100);
    }
  }, []);

  return (
    <TableContainer component={Paper} className="elegant-table-container">
      <Table aria-label="collapsible table" className="elegant-table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">שם החברותא</TableCell>
            <TableCell align="center">שם השותף</TableCell>
            <TableCell align="center">פלאפון</TableCell>
            <TableCell align="center">מייל</TableCell>
            <TableCell align="center">סיכום</TableCell>
            <TableCell align="center">לא מעונין</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tbl && props.tbl.filter(r => r.hidden !== false).length > 0 ? (
            props.tbl.filter(r => r.hidden !== false).map((row, index) => (
              <Row 
                key={row.psName || index} 
                row={row} 
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                isHovered={hoveredRow === index}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" className="empty">
                אין נתונים זמינים
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

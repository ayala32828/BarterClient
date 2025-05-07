import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { iRefuseThunk } from '../../../store/thunks/person/personOffers/iRefuse';
import { useDispatch, useSelector} from "react-redux"
import { yesIWantThunk } from '../../../store/thunks/person/personOffers/yesIWant';
import { addOfferThunk } from '../../../store/thunks/offers/addOffer';
import { personsSlice } from '../../../store/slices/persons';
import { sendToSubmitThunk } from '../../../store/thunks/offers/sendToSubmit';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [isNewOff, setIsNewOff] = React.useState(false)
  const myOfferArr = useSelector(state => state.persons.userOff)


//   const refD = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIWant = () => {
    //myOffers -  טבלאות העצות
    if(props.whoAmI == 'myOffers')
    {
    alert('🥂מזל-טוב!!!!!!חברותא חדשה נוצרה')
    dispatch(yesIWantThunk(props.offerId));
    }
    //home - אני רוצה את החברותא..  
    if(props.whoAmI == 'home')
    {
      debugger
      if(isNewOff == true){
        let o = myOfferArr.find(o => o.iwant == props.item.icanGive && o.icanGive == props.item.iwant)
        dispatch(sendToSubmitThunk({id1:o.offerId,id2:props.item.offerId}))
        setOpen(false);
      }
      else{
      if(props.myReadyOffers!=null && props.myReadyOffers!=undefined){        
        dispatch(sendToSubmitThunk({id1:props.myReadyOffers.offerId,id2:props.item.offerId}))
        setOpen(false);
      }
      else{
        let x = {zivug:0,offerId:0,myId:props.user.pid,iwant:props.item.icanGive,icanGive:props.item.iwant
          ,onTime:props.item.onTime}
          dispatch(addOfferThunk(x));
          setIsNewOff(true)                  
      }
      console.log(props.myReadyOffers);
    }
  }
  };
  const handleCancle = () => {
    setOpen(false);
    if(props.whoAmI == 'myOffers')
       dispatch(iRefuseThunk(props.offerId))

  };

  return (
    <React.Fragment>
      <Button  style={{'border':'none'}} variant="outlined" onClick={()=>{handleClickOpen();}}>
      {props.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{direction:'rtl'}} id="alert-dialog-title">
        <Button style={{alignContent:'10px',fontSize:'large'}} onClick={handleClose} autoFocus>✖</Button>
            <br/>
          {!isNewOff? props.mess : 'לא היתה קימת לך הצעה מתאימה, ההצעה נוספה לך עכשיו, האם אתה בטוח שאתה רוצה לזוג את ההצעה החדשה עם ההצעה שלחצת עליה?'}
          <br/>
          {props.partner==null?' ':props.partner.firstName+' '+props.partner.lastName+', '+props.partner.migzar+','}
          <br/>
          {props.partner==null?'':'גילו: '}

          {props.partner==null?'':new Date().getFullYear() - new Date(props.partner.bdate).getFullYear()+','}
          <br/>
          {props.partner==null?'':'כתובתו: '+props.partner.city+', '+props.partner.address+'.'}
          {/* {new Date().getFullYear() - new Date(props.partner.bdate).getFullYear()} */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{'textAlign':'center'}}>
          {props.partner==null?'':',אם הנתונים קורצים לך לחץ על אישור והחברותא תאושר'}
          <br/>
          {props.partner==null?'':'בהצלחה ובהנאה מרובה'}
          <br/>
           <section style={{fontSize:'30px'}}>{props.partner==null?'':'🤝'}</section>
          
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCancle}>{props.no}</Button>
          <Button onClick={handleIWant} autoFocus> {props.yes}</Button>
         
          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
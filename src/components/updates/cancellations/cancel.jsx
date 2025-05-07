//בס"ד
import './cancel.css'
import { OfferTbl } from '../../subComp/offTbl/offerTable'
import { useDispatch, useSelector } from "react-redux"
import { personsSlice } from '../../../store/slices/persons';

export const Cancle = () => {

const canceloffArr = useSelector(state => state.persons.userCancels)

const dispatch = useDispatch()

    return <> 
      
     {canceloffArr  &&  <OfferTbl tbl = {canceloffArr} myOffers = {true}/>}

    </>
}
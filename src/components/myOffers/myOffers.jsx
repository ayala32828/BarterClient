//בס"ד
import { useDispatch, useSelector } from 'react-redux'
import { GetOffersForPersonThunk } from '../../store/thunks/currUser/getAllOffer'
import './myOffers'
import { useEffect } from 'react'
import { OfferTbl } from '../subComp/offTbl/offerTable'

export const GetMyOffers = () => {


    const offArr = useSelector(state => state.persons.userOff)

    return <>
        
        {<OfferTbl tbl = {offArr} myOffers = {true} iwant = {''} icanGive={''}/>}
    </>
}
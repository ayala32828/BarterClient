//בס"ד
import './news.css'
import { OfferTbl } from '../../subComp/offTbl/offerTable'
import { useDispatch, useSelector } from "react-redux"


export const News = () => {

const newsoffArr = useSelector(state => state.persons.userNewOtherOffer)

    return <> 
     
     {newsoffArr && newsoffArr.length>0 && <OfferTbl tbl = {newsoffArr} myOffers = {true}/>}
    </>
}
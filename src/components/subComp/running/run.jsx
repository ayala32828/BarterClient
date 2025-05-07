import { useDispatch, useSelector } from "react-redux";
import { getAllOffersThunk } from "../../../store/thunks/offers/getAllOffers";
import { useEffect } from "react";
import { getAllPersonsThunk } from "../../../store/thunks/person/getAllPersons";


export const Run = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
         dispatch(getAllPersonsThunk());
         setTimeout(() => {
            dispatch(getAllOffersThunk());
         }, 100);

    },[])


return<></>
}
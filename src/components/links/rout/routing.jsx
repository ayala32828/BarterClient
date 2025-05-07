//בס"ד
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NewOffer } from '../../newOffer/newOffer'
import { GetMyOffers } from '../../myOffers/myOffers'
import { Home } from '../../homePage/home'
import { Login } from '../../login/login'
import { News } from '../../updates/news/news'
import { Cancle } from '../../updates/cancellations/cancel'
import { MyPS } from '../../myPS/myPS'

export const Routing = () => {

    const isNewUser = useSelector(state => state.persons.newUser);
    const user = useSelector(state => state.persons.user);

    return <>
        <Routes>
            <Route path='/newOffer' element={!user ? <Navigate to='/'/> :<NewOffer/>}/>
            <Route path='/Cancle' element={!user ? <Navigate to='/'/> :<Cancle/>}/>
            <Route path='/News' element={!user ? <Navigate to='/'/> :<News/>}/>
            <Route path='/myPShip' element={!user ? <Navigate to='/'/> :<MyPS/>}/>
            {/* <Route path='/myOffersInUse' element={!user ? <Navigate to='/'/> :<NewOffer/>}/> */}
            <Route path='/myOffers' element={!user ? <Navigate to='/'/> :<GetMyOffers/>}/>
            <Route path='/home/:iwant/:icanGive' element={!user ? <Navigate to='/'/> :<Home/>}/>
            <Route path='/' element={<Login/>}/>


        </Routes>
    </>
}
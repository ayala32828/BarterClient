//בס"ד
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './navig.css'

export const Navigation = () => {


 return <div id='allLink'>
      <Link className='link' to={"/home/**/**"}>לעמוד הבית</Link> 
      <Link className='link' to='/myOffers'>להצעות שלי</Link> 
      {/* <Link className='link' to='/myOffersInUse'>להצעות שלי בשימוש</Link>  */}
      <Link className='link' to='/myPShip'>לחברותות שלי</Link> 
      <Link className='link' to='/News'>חדשות טובות</Link> 
      <Link className='link' to='/Cancle'>חדשות גרועות</Link> 
      <Link className='link' to='/newOffer'>הצעה חדשה</Link> 
    </div>
}
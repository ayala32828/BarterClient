//בס"ד
import './login.css'
import { useDispatch, useSelector } from "react-redux"
import { personsSlice } from "../../store/slices/persons";
import { useEffect, useRef, useState } from 'react';
import { getAllPersonsThunk } from '../../store/thunks/person/getAllPersons';
import { getPersonByIdThunk } from '../../store/thunks/person/getPersonById';
import { addPersonThunk } from '../../store/thunks/person/addPerson'
import { useNavigate } from 'react-router-dom';
import { getPSByPIdThunk} from '../../store/thunks/ps/getPSByPId'


export const Login = () => {

  //const myArr = useSelector(state => state.persons.personsArr);
  useEffect(()=>{
    document.getElementById("id").focus()
  },[])
  const navig = useNavigate()

  const user = useSelector(state => state.persons.user);
  const isNewUser = useSelector(state => state.persons.newUser);

  const dispatch = useDispatch()
  // const [userId, setUserId] = useState(-1)
  const [newUser, setNewUser] = useState({})

  function addNewUser() {
    dispatch(addPersonThunk(newUser));
  }



  // async function knownUser() {
  //     ;
  // }

  useEffect(() => {

    if (user)
      navig(`/home/**/**`)
  }, [user])

  useEffect(() => {
    debugger
    if (isNewUser == 2)
      dispatch(getPersonByIdThunk(newUser.pid))
  }, [isNewUser])

  return <>
    <div id={isNewUser ? 'doorOpenImg' : 'doorimg'}>
      {/* {myArr.map((item,i) => <h1 key={i}>{item.pid}</h1>)} */}
      {user && <h1>hello {user.firstName} {user.lastName}</h1>}
      {/* {!user && <h1>{user}</h1>}
        {user && <h1>{user.city}</h1>} */}

      {/* login for new user */}
      <div id={isNewUser ? 'fullLogin' : 'login'}>
        <label htmlFor="id">enter your id</label>
        <input  id='id' className='detInp' onKeyUp={
          (e) => {
            debugger
            if(e.code == "Enter" || e.code == "NumpadEnter"){
              dispatch(getPersonByIdThunk(newUser.pid));
              setTimeout(() => {
                  dispatch(getPSByPIdThunk(newUser.pid))
              }, 50);
            }
          }
        } onChange={e => setNewUser({ ...newUser, pid: e.target.value })} type="text" />
        <button hidden={isNewUser} onClick={() => {dispatch(getPersonByIdThunk(newUser.pid));
       
       setTimeout(() => {
        dispatch(getPSByPIdThunk(newUser.pid))
       }, 50);
       
        }}>o.k</button>

        <button id='about'></button>
        <button id='log'></button>



        {isNewUser && <div>
          <label htmlFor="bDate">enter your birth date</label>
          <input className='detInp' type='date' onChange={e => setNewUser({ ...newUser, bDate: e.target.value })} id='bDate' />
          <label htmlFor="fn">enter your first name</label>
          <input className='detInp' type='text' onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} id='fn' />
          <label htmlFor="ln">enter your last name</label>
          <input className='detInp' type='text' onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} id='ln' />
          <label htmlFor="phone">enter your phone</label>
          <input className='detInp' type='tel' onChange={e => setNewUser({ ...newUser, phone: e.target.value })} id='phone' />
          <label htmlFor="city">enter your city</label>
          <input className='detInp' type='text' onChange={e => setNewUser({ ...newUser, city: e.target.value })} id='city' />
          <label htmlFor="email">enter your email</label>
          {/* onChange={e => setNewUser({...newUser,email:e.target.value})} */}
          <input className='detInp' type='email' id='email' />
          <div className='detInp' style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
            <input value='0' onChange={e => setNewUser({ ...newUser, maleOrFemale: e.target.value })} type='radio' id='male' name='mOrF' />
            <label htmlFor="male">male</label>
            <input checked value='1' type='radio' id='female' name='mOrF' onChange={e => setNewUser({ ...newUser, maleOrFemale: e.target.value })} />
            <label htmlFor="female">female</label>
          </div>

          <label>chose your migzar</label>
          <div className='detInp' style={{ 'display': 'flex', 'justifyContent': 'space-between', 'flexWrap': 'wrap' }}>
            <label htmlFor="dati">דתי</label>
            <input value='dati' type='radio' onChange={e => setNewUser({ ...newUser, migzar: e.target.value })} id='dati' name='migzar' />
            <label htmlFor="charedi">חרדי</label>
            <input type='radio' onChange={e => setNewUser({ ...newUser, migzar: e.target.value })} id='charedi' value='charedi' name='migzar' />
            <label htmlFor="mizrachi">מזרחי</label>
            <input type='radio' onChange={e => setNewUser({ ...newUser, migzar: e.target.value })} id='mizrachi' value='mizrachi' name='migzar' />
            <label htmlFor="chiloni">חילוני</label>
            <input type='radio' onChange={e => setNewUser({ ...newUser, migzar: e.target.value })} id='chiloni' value='chiloni' name='migzar' />
            <label htmlFor="aaa">ספרדי</label>
            <input type='radio' onChange={e => setNewUser({ ...newUser, migzar: e.target.value })} id='sfaradi' name='migzar' />
          </div>
          <button hidden={!isNewUser} onClick={addNewUser}>o.k</button>
        </div>

        }
      </div>

      {/* <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>
<Fab color="secondary" aria-label="edit">
  <EditIcon />
</Fab>
<Fab variant="extended">
  <NavigationIcon sx={{ mr: 1 }} />
  Navigate
</Fab>
<Fab disabled aria-label="like">
  <FavoriteIcon />
</Fab> */}
    </div>
  </>
}
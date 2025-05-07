//בס"ד
import { useDispatch, useSelector } from 'react-redux';
import './offerTable.css';
import { useEffect, useRef, useState } from 'react';
import { getOptionsThunk } from '../../../store/thunks/options/getOptions';
import { removeOfferThunk } from '../../../store/thunks/offers/removeOffer';
import { personsSlice } from '../../../store/slices/persons';
import { getAllPersonsThunk } from '../../../store/thunks/person/getAllPersons';
import { iSeeCancelThunk } from '../../../store/thunks/person/personOffers/iSeeCancel';
import AlertDialog from '../../imports/dialogs/dialog1';
import { useNavigate } from 'react-router-dom';

export const OfferTbl = (props) => {

    const allOffers = useSelector(state => state.offers.oralOfferArr);
    const optionsArr = useSelector(state => state.options.optionArr)
    const personsArr = useSelector(state => state.persons.personsArr)

    const [copyOptArr,setCopyOptArr] = useState([])
    const [myPartnerDet,setMyPartnerDet] = useState(null)
    const navig = useNavigate()


    const dispatch = useDispatch()


    const [get, setGet] = useState(props.iwant)
    const [give, setGive] = useState(props.icanGive)
    const [perDet, setPerDet] = useState({migzar:'',min:'',city:'',age:''})
 

    const [showDet, setShoeDet] = useState(false)
    const [fewSuitable, setFewSuitable] = useState(-1)


    const [selId, setSelId] = useState(1)

    function getOpById(id) {
        let x=optionsArr.find(o => o.opId == id)
        return x == null? '':x.optionName
    }

    function getPerByPid(id) {
        let x = personsArr.find(p => p.pid == id)
        return x;
    }
    function removeOffer(id) {
        dispatch(removeOfferThunk(id))
        dispatch(personsSlice.actions.delOffer(id))
    }

    function fewSuit(get,give){
        
        let count = 0
        if(copyOptArr && copyOptArr.length>0)
        for (let index = 0; index < copyOptArr.length; index++) {
            let item = copyOptArr[index]
            if(getOpById(item.iwant).includes(get) && getOpById(item.icanGive).includes(give)
            && getPerByPid(item.myId).migzar.includes(perDet.migzar)
            && getPerByPid(item.myId).city.includes(perDet.city)
            && (getPerByPid(item.myId).maleOrFemale==0?'זכר':'נקבה').includes(perDet.min)
            && ageInRange((new Date().getFullYear() - new Date(getPerByPid(item.myId).bdate).getFullYear()))==true
            ){
           count++}
        }
        setFewSuitable(count)   
    }

    function sortByAge(){
        let arr = []
           arr = [...props.tbl]         
           arr = arr.sort(
            (x,y)=>{
               let px = getPerByPid(x.myId)
               let py = getPerByPid(y.myId)
               return new Date(px.bdate)<new Date(py.bdate)? 1: -1;
            }           
            )               
            setCopyOptArr(arr)
    }
    
    function sortByCity(){
        let arr = []
           arr = [...props.tbl]         
           arr = arr.sort(
            (x,y)=>{
               let px = getPerByPid(x.myId)
               let py = getPerByPid(y.myId)
               return px.city>py.city? 1: -1;
            }           
            )               
             setCopyOptArr(arr)
    }

    function sortByMigzar(){
        let arr = [...props.tbl]
           arr = arr.sort(
            (x,y)=>{
               let px = getPerByPid(x.myId)
               let py = getPerByPid(y.myId)
               return px.migzar>py.migzar? 1: -1;
            }           
            )               
             setCopyOptArr(arr)
    }

    function sortByMin(){
        let arr = []
           arr = [...props.tbl]         
           arr = arr.sort(
            (x,y)=>{
               let px = getPerByPid(x.myId)
               let py = getPerByPid(y.myId)
               return px.maleOrFemale>py.maleOrFemale? 1: -1;
            }           
            )               
             setCopyOptArr(arr)
    }

    function ageInRange(age){
        
        let t = perDet.age.split('-')
        // console.log(t.length);
        if(t.length!=2)
            return true;
        if(t[0]=='')
        t[0]=0
        if(t[1]=='')
        t[1]=120
       return parseInt(t[0])<=age && age<=parseInt(t[1])
    }

    useEffect(() => {
        console.log(get);
        console.log(give);

        dispatch(getOptionsThunk())
        // dispatch(getAllPersonsThunk())

    }, [])


    useEffect(() => {
        let tempArr = []
       for (let i1 = 0; i1 < copyOptArr.length; i1++) {
           let item = copyOptArr[i1]
           for (let i2 = 0; i2 < props.tbl.length; i2++) {
            let item2 = props.tbl[i2]
            if(item.offerId == item2.offerId){
                tempArr.push(props.tbl[i2])
                break;
            }
        }
       }
       setCopyOptArr(tempArr)
    }, [props.tbl])

    useEffect(() => {
        let arr = []

         if(optionsArr && optionsArr.length>0){
           arr = [...props.tbl]         
           arr = arr.sort(
            (x,y)=>
            getOpById(x.icanGive)+getOpById(x.iwant)>getOpById(y.icanGive)+getOpById(y.iwant)?1:-1
            
                )

        //   console.log(arr)
            setCopyOptArr(arr)
    }
    }, [optionsArr])

    function iSeeCancel(offerId){
        window.alert('הצעתך חזרה לרשימת ההצעות')
        dispatch(iSeeCancelThunk(offerId))
    }

    // function iWant(offerId){
    //     if (window.confirm('האם אתה בטוח שאתה תפוח') == true) {
    //         alert('✨מזל-טוב 10000 ש"ח לכיסינו (אם אתה מעל 20)')        
    //    }
    // }
    
    return <>
        <div className="offer-table-container">
            <div className="search-filters">
                <input className='search' placeholder="SEARCH_GIVE🕵️‍♀️" value={get} onChange={(e) =>  {setGet(e.target.value);fewSuit(e.target.value,give);}} />
                <input className='search' placeholder="SEARCH_GET🕵️‍♀️" value={give} onChange={(e) =>  {setGive(e.target.value);fewSuit(get,e.target.value);}} />
               
                {!showDet && <button className='sort' onClick={()=>setShoeDet(true)}>לצפיה מורחבת</button>}
                {showDet && <button className='sort' onClick={()=>setShoeDet(false)}>חזור👇</button>}
            </div>

            {fewSuitable>0 && <h1 className="suitable-count">יש כרגע{fewSuitable} הצעות מתאימות😉</h1>}
            
            {showDet && (
                <div className="advanced-filters">
                    <div className="sort-buttons">
                        <button className='sort' onClick={()=>sortByAge()}>👀גיל</button>
                        <button className='sort' onClick={()=>sortByMigzar()}>👀מגזר</button>
                        <button className='sort' onClick={()=>sortByMin()}>👀מין</button>
                        <button className='sort' onClick={()=>sortByCity()}>👀עיר</button>
                    </div>
                    
                    <div className="filter-inputs">
                        <input className='searchByDet' placeholder="מגזר🕵️‍♀️" onChange={(e) => {setPerDet({...perDet,migzar:e.target.value});fewSuit(get,give);}} />
                        <input className='searchByDet' placeholder="גיל🕵️‍♀️" onChange={(e) => {setPerDet({...perDet,age:e.target.value});fewSuit(get,give);}} />
                        <input className='searchByDet' placeholder="מין🕵️" onChange={(e) =>  {setPerDet({...perDet,min:e.target.value});fewSuit(get,give);}} />
                        <input className='searchByDet' placeholder="עיר🕵️‍♀️" onChange={(e) =>  {setPerDet({...perDet,city:e.target.value});fewSuit(get,give);}} />
                    </div>
                </div>
            )}

            {optionsArr && optionsArr.length > 0 && personsArr && personsArr.length > 0 && (
                <table className='ofTblTbl' id="table">
                    <tbody>
                        <tr className='ofTblTr'>
                            {/* <th>קוד הצעה</th> */}
                            {props.myOffers && <th className='ofTblTh'>להסרת ההצעה</th>}
                            {showDet && <th className='ofTblTh'>מין </th>}
                            {showDet && <th className='ofTblTh'>מגזר </th>}
                            {showDet && <th className='ofTblTh'>גיל </th>}
                            {showDet && <th className='ofTblTh'>עיר </th>}

                            {!props.myOffers && <th className='ofTblTh'>מעונין לקבל</th>}
                            {!props.myOffers && <th className='ofTblTh'>מוכן לתת</th>}

                            {props.myOffers && <th className='ofTblTh'>מוכן לתת</th>}
                            {props.myOffers && <th className='ofTblTh'>מעונין לקבל</th>}

                            <th className='ofTblTh'>חד פעמי</th>
                            
                            {props.myOffers && <th className='ofTblTh'>התאמה באופק</th>}
                            {!props.myOffers && <th className='ofTblTh'>מעונין👐</th>}
                        </tr>

                        {copyOptArr && copyOptArr.length > 0 && copyOptArr.map((item, i) => {
                            const isVisible = (
                                (get == '' || getOpById(item.iwant).includes(get)) && 
                                (give == '' || getOpById(item.icanGive).includes(give)) &&
                                getPerByPid(item.myId).migzar.includes(perDet.migzar) &&
                                getPerByPid(item.myId).city.includes(perDet.city) &&
                                (getPerByPid(item.myId).maleOrFemale == 0 ? 'זכר' : 'נקבה').includes(perDet.min) &&
                                ageInRange((new Date().getFullYear() - new Date(getPerByPid(item.myId).bdate).getFullYear())) == true &&
                                (props.myOffers || (!props.myOffers && (item.zivug == 0 || item.zivug == 10) && item.myId != props.user.pid))
                            );
                            
                            if (!isVisible) return null;
                            
                            return (
                                <tr 
                                    className='ofTblTr' 
                                    onClick={() => setSelId(item.offerId)} 
                                    id={item.offerId == selId ? 'selected' : ''} 
                                    key={i}
                                >
                                    {props.myOffers && (
                                        <td className='ofTblTd'>
                                            <button 
                                                style={{backgroundColor:'#fba1a100', border:'none', fontSize:'xx-large'}} 
                                                disabled={item.zivug == 200} 
                                                onClick={() => removeOffer(item.offerId)}
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    )}

                                    {showDet && <td className='ofTblTd'>{getPerByPid(item.myId).maleOrFemale == 0 ? 'זכר' : 'נקבה'}</td>}
                                    {showDet && <td className='ofTblTd'>{getPerByPid(item.myId).migzar}</td>}
                                    {showDet && <td className='ofTblTd'>{new Date().getFullYear() - new Date(getPerByPid(item.myId).bdate).getFullYear()}</td>}
                                    {showDet && <td className='ofTblTd'>{getPerByPid(item.myId).city}</td>}

                                    <td className='ofTblTd'>{item.offerId}<br/>{getOpById(item.icanGive)}</td>
                                    <td className='ofTblTd'>{item.zivug}<br/>{getOpById(item.iwant)}</td>
                                    <td className='ofTblTd'>{item.onTime + ""}</td>
                                    
                                    {props.myOffers && (
                                        <td 
                                            onClick={() => {navig(`/home/${getOpById(item.icanGive)}/${getOpById(item.iwant)}`)}} 
                                            className='ofTblTd' 
                                            hidden={item.zivug != 0}
                                        >
                                            🤷‍♂️🤷‍♀️
                                        </td>
                                    )}
                                    {props.myOffers && (
                                        <td 
                                            className='ofTblTd' 
                                            onClick={() => removeOffer(item.offerId)} 
                                            style={{'textDecoration':'underline', color:'red'}} 
                                            hidden={item.zivug != 200}
                                        >
                                            🥂מזל"ט
                                        </td>
                                    )}
                                    
                                    {props.myOffers && (
                                        <td 
                                            className='ofTblTd' 
                                            hidden={item.zivug != 1}
                                        >
                                            ממתין🌴
                                        </td>
                                    )}
                                    
                                    {props.myOffers && (
                                        <td 
                                            className='ofTblTd' 
                                            onClick={() => iSeeCancel(item.offerId)} 
                                            style={{'textDecoration':'underline', color:'red'}} 
                                            hidden={item.zivug != 10}
                                        >
                                            בוטל🤙
                                        </td>
                                    )}
                                    
                                    {props.myOffers && (
                                        <td 
                                            className='ofTblTd' 
                                            onClick={() => {
                                                let tid = allOffers.find(o => o.offerId == item.zivug).myId;
                                                let x = personsArr.find(p => p.pid == tid);
                                                setMyPartnerDet(x);
                                            }} 
                                            hidden={item.zivug >= 0}
                                        >
                                            <AlertDialog    
                                                whoAmI={'myOffers'}
                                                yes={'מעונין'}
                                                no={'לא מעונין'}
                                                title={'✔'} 
                                                partner={myPartnerDet} 
                                                mess={`הי בשורה טובה! מצאנו לך חברותא חדשה👴`}
                                                offerId={item.offerId}
                                            />
                                        </td>
                                    )}

                                    {!props.myOffers && (
                                        <td className='ofTblTd'>
                                            <AlertDialog  
                                                myReadyOffers={copyOptArr.find(o => 
                                                    o.myId == props.user.pid && 
                                                    (item.zivug == 0 || item.zivug == 10) && 
                                                    (item.icanGive == o.iwant && item.iwant == o.icanGive)
                                                )} 
                                                user={props.user}
                                                item={item}
                                                whoAmI={'home'}
                                                yes={'מעונין'}
                                                no={'לא מעונין'}
                                                title={'🎯'} 
                                                mess={'האם אתה בטוח שאתה מעונין? צפית כבר בפרטים, בגיל?    (ניתן לצפות בכפתור: לצפיה מורחבת,) אם תענה בחיוב ההצעה תשלח לאישור הצד השני, במידה והוא יאשר את בקשתך האישור יחכה לך בחדשות טובות!👲  '}
                                                offerId={item.offerId}
                                            />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            
            {fewSuitable == 0 && (
                <div className="no-results">
                    <h1>אין כרגע הצעות מתאימות😞</h1>
                    <button 
                        className="reset-filters"
                        onClick={() => {
                            setGet('');
                            setGive('');
                            setPerDet({migzar:'', min:'', city:'', age:''});
                            fewSuit('', '');
                        }}
                    >
                        נקה פילטרים
                    </button>
                </div>
            )}
        </div>
    </>;
};

//בס"ד
import { useDispatch, useSelector } from "react-redux"
import CollapsibleTable from "../imports/tables/tbl1"
import './myPS.css'
import { useEffect, useState } from "react"
import { partnerShipsSlice } from '../../store/slices/partnerShips'


export const MyPS = () => {

  const dispatch = useDispatch();


  const allMyPS = useSelector(state => state.ps.myPsArr)
  const allMyDocumentation = useSelector(state => state.ps.Documentation)
  const treatedAlrdy = useSelector(state => state.ps.fillDecFlag)


  const persons = useSelector(state => state.persons.personsArr);
  const options = useSelector(state => state.options.optionArr)

  useEffect(() => {
    if (treatedAlrdy == false) {
      let tempArr = allMyPS.map(ps => {
        try{
          let ttt = ps.usedId;
          let p = persons.find(t => t.pid == ps.partnerId)
          let op1 = options.find(o => o.opId == ps.iwant).optionName
          let op2 = options.find(o => o.opId == ps.icanGive).optionName
          let dec = allMyDocumentation.filter(d => d.offInUsedId == ps.usedId)
          debugger
          return {            
            psId: ps.usedId,
            myId:ps.myId,
            psName: op1 + " " + op2,
            pName: p.firstName + " " + p.lastName,
            phone: p.phone,
            mail: p.mail,
            details: ps.partnerDets,
            hidden: ps.toSeePs,
            historyArr: dec
          }
  
        }      
        catch{
          return ps;
        }

      })
      debugger

      dispatch(partnerShipsSlice.actions.initialization(tempArr))
      dispatch(partnerShipsSlice.actions.iFillDec())
      //let p = dispatch(personsSlice.actions.getById("111111111"))  
    }
  }, [])



  return <>
    <article id="myPSTbl">
      {allMyPS && treatedAlrdy && <CollapsibleTable tbl={allMyPS} />}
    </article>
  </>
}
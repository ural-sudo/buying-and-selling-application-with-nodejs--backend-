
import React,{useState,useEffect} from 'react';

export const  Hello = () => {

   const [initial, setInitial] =  useState([]);

   useEffect( () => {
       fetch('/product/deneme').then(res => {
           if(res.ok){
               return res.json();
           }
       }).then(resData => {
           setInitial(resData)
       })
   }, [])

    console.log(initial);
    return <div>Hello guys</div>
}

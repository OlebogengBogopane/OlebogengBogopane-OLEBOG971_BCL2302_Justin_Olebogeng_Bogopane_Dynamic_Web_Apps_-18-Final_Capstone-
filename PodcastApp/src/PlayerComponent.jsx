import React, { useEffect, useState } from 'react'

export default  function Season() {
const [seasonFile,setSeasonFile]= useState()
useEffect (() => {
    if(props.Id) {
        fetch(`https://podcast-api.netlify.app/id/${props.Id}`)
    .then (res => res.json())
    .then(data => {
        const SeasonData = data.Season.map((item)=>{
            return (
            <p> {item.season}</p>
            )

        })

        setSeasonFile(SeasonData);
    })
    }

}, [props.Id])

  return (
    <div>
        {seasonFile}
    </div>
  )
}


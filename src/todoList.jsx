import React, { useEffect, useState } from "react";

function TodoList () {
  const [activity, setActivity] = useState('');
  const [listData, setlistData] = useState([]);
  const [mode, setMode] = useState("Add");
  const [tempInd, setTempInd] = useState(null);

  function handleActivity(indToRemove,remove) {
    let updatedList = [];
    if (mode === "Edit") {
      // let _updatedDta = listData?.map((data, i) => {
      //   if (i === tempInd) {
      //     return activity;
      //   } else {
      //     return data;
      //   }
      // });
      updatedList = listData?.map((data, i) =>
        i === tempInd ? activity : data
      );
      // setlistData(_updatedDta);
      // setActivity("");
      // setMode("Add");
    }else if(remove==="remove"){
      updatedList = listData?.filter((dt,i)=> i!==indToRemove)
    } else {
      updatedList = [...listData, activity];
      // setlistData((listData) => {
      //   const updatedList = [...listData, activity];
      //   console.log(updatedList);
      //   setActivity("");
      //   setMode("Add");
      //   return updatedList; 
      // });
    }
    setlistData(updatedList);
    localStorage.setItem("activityData",JSON.stringify(updatedList))
    setActivity("");
    setMode("Add");
  }

  const handleEdit = (data, ind) => {
    setMode("Edit");
    setTempInd(ind);
    setActivity(data);
  };

  // function removeActivity(i) {
  //   const updatedListData = listData.filter((elem, id) => {
  //     return i !== id;
  //   });
  //   setlistData(updatedListData);
  // }

  function removeAll() {
    setlistData([]);
    localStorage.removeItem("activityData")
  }

  useEffect(()=>{
    let _data = JSON.parse(localStorage?.getItem("activityData"))
    setlistData(_data)
  },[])

  return (
    <>
      <div className="container">
        <div className="header">TODO LIST</div>

        <input
          type="text"
          placeholder="Add Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />

        <button onClick={handleActivity}> {mode === "Edit" ? "Edit" : "Add"} </button>

        <p className="List-heading">Here is your List : {")"} </p>

        {listData != [] &&
          listData.map((data, i) => {
            return (
              <>
                <p key={i}>
                  <div className="listData">{data}</div>
                  <div className="btn-position">
                    <button onClick={() => handleEdit(data, i)}> Edit</button>
                    <button onClick={() => handleActivity(i,"remove")}>
                      {" "}
                      remove(-)
                    </button>
                  </div>
                </p>
              </>
            );
          })}
        {listData.length >= 1 && (
          <button onClick={removeAll}>Remove All</button>
        )}
      </div>
    </>
  );
}

export default TodoList;
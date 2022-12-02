import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfilePublic from "../pages/public-profile.jsx";
import "./style/search.css";

/*Credits to Pedro Maachado (https://github.com/machadop1407) for tutorial video*/
export default function ({ placeholder, data }) {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div class="container" className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon" class="align-items-center">
          {filteredData.length === 0 ? (
            <AiOutlineSearch style={{height:"30px", width:"auto"}}/>
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} style={{height:"30px", width:"auto"}}/>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            const getProfile = () => {
              console.log(value);
              return(navigate('/view', {state: value}));
            };
            return (
              <span className="dataItem" onClick={getProfile}>
                <p>{value.name} </p>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

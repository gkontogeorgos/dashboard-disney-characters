import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import CharacterTable from "components/table/CharacterTable";
import CharacterPieChart from "components/chart/CharacterPieChart";
import "./Dashboard.css";
import { getCharacters } from "../../redux/charactersSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    list: characters,
    currentPage,
    pageSize,
    searchTerm,
  } = useSelector((state) => state.characters);

  useEffect(() => {
    dispatch(getCharacters({ page: currentPage, pageSize, searchTerm }));
  }, [dispatch, currentPage, pageSize, searchTerm]);

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <CharacterTable characters={characters} />
        <CharacterPieChart />
      </div>
    </div>
  );
};

export default Dashboard;

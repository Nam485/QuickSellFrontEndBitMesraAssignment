import React, { useEffect, useState } from "react";
import "../styles/Kanban.css";
import Card from "./Card";
import CardTitle from "./CardTitle";
import fetchData from "./getData";
import Navbar from "./Navbar";
import Sorting from "./Sorting";


function Kanban() {
  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState(
    localStorage.getItem("ordering") || "title"
  );
  const [data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData();
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    if (grouping === "priority") {
      setOrdering("title");
    }
  }, [grouping]);

  if (loading) {
    return <div>Loading the data...</div>;
  }

  if (!data || !data[grouping] || data[grouping].length === 0) {
    return <div>Error: Data for grouping "{grouping}" is not available.</div>;
  }

  return (
    <div className="page">
      <Navbar
        grouping={grouping}
        ordering={ordering}
        setGrouping={setGrouping}
        setOrdering={setOrdering}
      />
      <div className="board">
      
        {data[grouping].map((group) => (
        
          <div className="group-column" key={group.title}>
            <CardTitle
              title={group.title}
              grouping={grouping}
              count={group.tickets.length}
              available={
                grouping === "user"
                  ? data.users.find((e) => e.name === group.title)?.available
                  : null
              }
            />
            {Sorting(group.tickets, ordering).map((item) => (
              <Card
                key={item.id}
                ticket={item}
                grouping={grouping}
                user={data.users.find((e) => e.id === item.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kanban;

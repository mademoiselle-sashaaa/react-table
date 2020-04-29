import React, { useState, useEffect, useMemo } from 'react';
import Table from './components/Table';
import Popup from './components/PopUp';
import './App.css';

//const url = 'https://hq.asodesk.com/api/us/demo/keyword-analytics/data-stats';
const url = 'http://localhost:3005/keyword-analytics/data-stats';

function App() {
  const [data, setData] = useState([]);
  const [showPopUp, setshowPopUp] = useState(false);

  const onClose = () => {
    setshowPopUp(false);
  }

  const onShowPopup = () => {
    setshowPopUp(true);
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Keyword',
        accessor: 'keyword',
      },
      {
        Header: 'Traffic Score',
        accessor: 'users_per_day',
      },
      {
        Header: 'Total Apps',
        accessor: 'total_apps',
      },
      /*       {
              Header: 'Rank',
              accessor: 'position_info',
            }, */
    ],
    [],
  );

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url);
      const result = await data.json();

    
      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Table data={data} columns={columns} showPopup={onShowPopup} />
      {showPopUp && <Popup onClose={onClose} />}
    </div>
  );
}

export default App;

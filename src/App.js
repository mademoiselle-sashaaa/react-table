import React, { useState, useEffect, useMemo } from 'react';

import Table from './components/Table';
import Popup from './components/Popup';
import { url, COLORS } from './const';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [showPopUp, setshowPopUp] = useState(false);

  const onClose = (e) => {
    if (e.target.className !== "popup_inner") {
      setshowPopUp(false);
    }
  };

  const onShowPopup = () => {
    setshowPopUp(true);
  };

  const onExploreClick = (keyword) => () => {
    window.open("https://google.com");
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Keyword',
        accessor: 'keyword',
      },
      {
        id: 'explore',
        Cell: ({ row }) => {
          const keyword = row && row.original && row.original.keyword;
          return <button onClick={onExploreClick(keyword)}>explore</button>
        },
      },
      {
        id: 'popup',
        Cell: ({ row }) => {
          const count = row && row.original && row.original.suggestions_count;
          return <button className='popup-btn' onClick={onShowPopup}>Show {Number(count) ? (Number(count)) : null}</button>
        },
      },
      {
        Header: 'Traffic Score',
        accessor: 'users_per_day',
      },
      {
        Header: 'Total Apps',
        accessor: 'total_apps',
      },
      {
        id: 'rank',
        Header: 'Rank',
        Cell: ({ row }) => {
          const { change, position } = row && row.original && row.original.position_info;
          const className = change > 0 ? 'change-prop-increase' : 'change-prop-decrease';
          const showChage = Number(change) !== 0;
          return (
            <div>
              {position}
              {showChage &&
                <span className={className}>
                  ({change})
                 </span>}
            </div>
          )
        },
      },
      {
        id: 'color',
        Cell: ({ row }) => {
          const color = row && row.original && row.original.color;
          return <div style={{
            background: COLORS[color],
            width: '100%',
            height: '20px',
          }}></div>
        },
      },
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

import React, { useState, useEffect, useMemo } from 'react';
import Table from './components/Table';

//const url = 'https://hq.asodesk.com/api/us/demo/keyword-analytics/data-stats';
const url = 'http://localhost:3005/keyword-analytics/data-stats';

function App() {
  const [data, setData] = useState([]);

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

      console.log(result.data);

      setData(result.data);
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import Table from '../components/Table';
import Popup from '../components/Popup';
import { url, COLORS } from '../const';
import { mapData } from '../helpers';
import { ItemProps } from '../types';
import { Cell } from 'react-table';


const Stats: React.FC = () => {
  const [data, setData] = useState<ItemProps[]>([]);
  const [showPopUp, setshowPopUp] = useState(false);
  const [selectAllRows, setselectAllRows] = useState(false);

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if ((e.target as HTMLElement).className !== "popup_inner") {
      setshowPopUp(false);
    }
  };

  const onShowPopup = () => {
    setshowPopUp(true);
  };

  const deleteRow = useCallback((id: number) => () => {
    setData(data.filter(item => item.id !== id));
  }, [data]);

  const toggleAllSelected = useCallback(() => {
    setData(data.map((item, i) => (i === 0 ? { ...item, selected: true } : { ...item, selected: !selectAllRows })));
    setselectAllRows(!selectAllRows);
  }, [data, selectAllRows]);

  const toggleRow = useCallback((id: number) => () => {
    const item = data.find(item => item.id === id);

    const selectedCount = data.reduce((acc, item) => { return item.selected ? acc + 1 : acc }, 0);
    if (selectedCount === data.length - 1 && !item!.selected) {
      setselectAllRows(true);
    } else { setselectAllRows(false); }

    if (selectedCount === 1 && item!.selected) {
      const array = [...data];
      setData(array);
      return;
    }

    const index = data.indexOf(item!);

    const modifiedItem = { ...item!, selected: !item!.selected };

    const array = [...data];
    array[index] = modifiedItem;

    setData(array);
  }, [data]);

  const columns = useMemo(
    () => [
      {
        id: 'select',
        Header: () => (<input onChange={toggleAllSelected} type="checkbox" checked={selectAllRows} />),
        Cell: ({ row }: Cell<ItemProps>) => {
          const selected = row && row.original && row.original.selected;
          const id = row && row.original && row.original.id;
          return (
            <input type="checkbox" onChange={toggleRow(id)} defaultChecked={selected} />
          );
        },
      },
      {
        Header: 'Keyword',
        accessor: 'keyword',
      },
      {
        id: 'explore',
        Cell: ({ row }: Cell<ItemProps>) => {
          const keyword = row && row.original && row.original.keyword;
          return (
            <button>
              <Link className='explore-link' to={`/explore?q=${keyword}`}>explore</Link>
            </button>)
        },
      },
      {
        id: 'popup',
        Cell: ({ row }: Cell<ItemProps>) => {
          const count = row && row.original && row.original.suggestionsCount;
          return <button className='popup-btn' onClick={onShowPopup}>Show {Number(count) ? (Number(count)) : null}</button>
        },
      },
      {
        Header: 'Traffic Score',
        accessor: 'usersPerDay',
      },
      {
        Header: 'Total Apps',
        accessor: 'totalApps',
      },
      {
        id: 'rank',
        Header: 'Rank',
        Cell: ({ row }: Cell<ItemProps>) => {
          const { change, position } = row && row.original && row.original.positionInfo;
          const className = change && change > 0 ? 'change-prop-increase' : 'change-prop-decrease';
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
        Header: 'Color',
        Cell: ({ row }: Cell<ItemProps>) => {
          const color = row && row.original && row.original.color;
          return <div style={{ background: COLORS[color], width: '100%', height: '20px' }}></div>
        },
      },
      {
        id: 'delete',
        Cell: ({ row }: Cell<ItemProps>) => {
          const id = row && row.original && row.original.id;
          return (
            <div onClick={deleteRow(id)}>
              <strong>x</strong>
            </div>
          );
        },
      },
    ],
    [deleteRow, selectAllRows, toggleAllSelected, toggleRow],
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const result = await response.json();
      const data = mapData(result.data);

      setData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="App">
     <Table data={data} columns={columns} />
      {showPopUp && <Popup onClose={onClose} />}
    </div>
  );
}

export default Stats;

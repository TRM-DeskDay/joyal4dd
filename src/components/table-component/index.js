import React, { useEffect, useState } from 'react'
import './Table.css'

// Material UI imports
import Menu from '@mui/material/Menu';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';

// Icons 
import { SlOptionsVertical } from 'react-icons/sl';
import { HiChevronUpDown } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { AiOutlineStar, AiFillStar, AiOutlineHolder } from 'react-icons/ai';
import { BiSearch, BiCheck } from 'react-icons/bi';
import CustomDrawer from '../custom-drawer/CustomDrawer';

const TableComponent = (props) => {

    const [mouseOverRow, setMouseOverRow] = useState(0);
    const [headers, setHeaders] = useState(props.headers ? props.headers : []);
    const [datas, setDatas] = useState(props.data ? props.data : []);
    const [selectedRows, setSelectedRows] = useState([]);
    const [uniqueHeaders, setUniqueHeaders] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [sortingOrder, setSortingOrder] = useState("asc");
    const [sortingField, setSortingField] = useState("");
    const [selectionField, setSelectionField] = useState("");

    // Change header and data when props changes
    useEffect(() => {
        setHeaders(props.headers);
    }, [props.headers]);

    useEffect(() => {
        setDatas(props.data);
    }, [props.data]);

    // Render select and bookmarks
    const getSelectAndBookmarks = (id, isBookmarked, index) => {
        if (props.haveSelect) {
            if (props.haveBookmark) {
                return (
                    <td>
                        <div className="selectbookmark">
                            <Checkbox
                                checked={selectedRows.includes(id)}
                                onChange={(e) => { handleSelectRow(e, id) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disableRipple={true}
                            />
                            {isBookmarked ?
                                <div className="bookmarkicon" onClick={() => { setBookmark(index, false) }}>
                                    <AiFillStar color={'gold'} />
                                </div> :
                                <div className="bookmarkicon" onClick={() => { setBookmark(index, true) }}>
                                    <AiOutlineStar color={'#8B909A'} />
                                </div>}
                        </div>
                    </td>
                )
            }
            else {
                return (
                    <td>
                        <div className="selectbookmark">
                            <Checkbox
                                checked={selectedRows.includes(id)}
                                onChange={(e) => { handleSelectRow(e, id) }}
                                inputProps={{ 'aria-label': 'controlled' }}
                                disableRipple={true}
                            />
                        </div>
                    </td>
                )
            }
        }
    }

    // Set sorting datas
    const setSorting = (cellName) => {
        if (sortingField === cellName) {
            sortingOrder === "asc" ? setSortingOrder("desc") : setSortingOrder("asc");
        }
        else {
            setSortingOrder("asc")
            setSortingField(cellName);
        }
    }

    // Sort data based on sort order and sort field state
    const handleSorting = () => {
        if (sortingField) {
            const sorted = [...datas].sort((a, b) => {
                if (a[sortingField] === null) return 1;
                if (b[sortingField] === null) return -1;
                if (a[sortingField] === null && b[sortingField] === null) return 0;
                return (
                    a[sortingField].toString().localeCompare(b[sortingField].toString(), "en", {
                        numeric: true,
                    }) * (sortingOrder === "asc" ? 1 : -1)
                );
            });
            setDatas(sorted);
        }
    }

    useEffect(() => {
        if (sortingField !== "") {
            handleSorting()
        }
        // eslint-disable-next-line
    }, [sortingField, sortingOrder])

    // Handle Select on rows
    const handleSelectRow = (e, id) => {
        if (e.target.checked === true) {
            setSelectedRows(selectedRows => [...selectedRows, id]);
        }
        else {
            setSelectedRows(selectedRows.filter(item => item !== id));
        }
    }

    // Handle select all or remove all 
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            datas.forEach((data) => {
                setSelectedRows(selectedRows => [...selectedRows, data.id]);
            })
        }
        else {
            setSelectedRows([]);
        }
    }

    // Toggle show of headers 
    const setIsShown = (index) => {
        const headersArray = [...headers];
        headersArray[index].show = !headersArray[index].show;
        setHeaders(headersArray);
    }

    // Action Menus 
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Select Menus
    const [selectEl, setSelectEl] = React.useState(null);

    const openSelect = Boolean(selectEl);
    const handleSelectClick = (event, cellName) => {
        setSelectEl(event.currentTarget);
        if (selectionField !== cellName) {
            setSelectedValues([]);
            const uniqueHeaders = [...new Set(props.data.map(item => item[cellName]))];
            setUniqueHeaders(uniqueHeaders);
            setSelectionField(cellName);
        }
    };

    const handleSelectClose = () => {
        setSelectEl(null);
    };

    // Set Bookmark 
    const setBookmark = (index, bookmarkState) => {
        const dataList = [...datas];
        console.log(bookmarkState)
        dataList[index].isBookmarked = bookmarkState;
        setDatas(dataList);
    }

    // Handle select values
    const handleSelectedValues = (e, value, index) => {
        if (e.target.checked) {
            selectedValues.push(value);
            setDatas(props.data.filter(data => selectedValues.includes(data[selectionField].toString())))
        }
        else {
            selectedValues.splice(index, 1);
            if (selectedValues.length > 0) {
                setDatas(props.data.filter(data => selectedValues.includes(data[selectionField].toString())))
            }
            else {
                setDatas(props.data);
            }
        }
    }

    return (
        <React.Fragment>
            <h3>Custom Table Component</h3>
            {/* <h4>Edit to make changes</h4> */}
            <div>
                <table className='tablemain'>
                    <thead className='table-head'>
                        <tr>
                            <th></th>
                            {props.haveSelectAll ? <th className='checkboxhead'>
                                <Checkbox
                                    checked={datas.length === selectedRows.length}
                                    onChange={(e) => { handleSelectAll(e) }}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    disableRipple={true}
                                />
                            </th> : <th></th>}
                            {headers?.map((header) => {
                                if (header.show) {
                                    if (header.isSortable) {
                                        return (
                                            <th key={header.key} >
                                                <h5>
                                                    <div className="headername">
                                                        {header.label}
                                                        <span className='sortdata' onClick={() => setSorting(header.value)}>
                                                            <HiChevronUpDown />
                                                        </span>
                                                    </div>
                                                </h5>
                                            </th>
                                        )
                                    }
                                    else if (header.isSelectable) {
                                        return (
                                            <th key={header.key} >
                                                <h5>
                                                    <div
                                                        className='headername'
                                                        id="basic-button"
                                                        aria-controls={openSelect ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={openSelect ? 'true' : undefined}
                                                        onClick={(e) => { handleSelectClick(e, header.value) }}
                                                    >
                                                        {header.label}
                                                        <span className='selectdata'>
                                                            <MdOutlineKeyboardArrowDown />
                                                        </span>
                                                    </div>

                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={selectEl}
                                                        open={openSelect}
                                                        onClose={handleSelectClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        {uniqueHeaders.map((uniqueHeader, index) => (
                                                            <li key={uniqueHeader}>
                                                                <div className="selectone">
                                                                    <Checkbox
                                                                        defaultChecked={selectedValues.includes(uniqueHeader
                                                                        ) ? true : false}
                                                                        onChange={(e) => { handleSelectedValues(e, uniqueHeader, index) }}
                                                                        disableRipple={true}
                                                                    />
                                                                    <h6>{uniqueHeader}</h6>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </Menu>
                                                </h5>
                                            </th>
                                        )
                                    }
                                    else {
                                        return (
                                            <th key={header.key} >
                                                <h5>
                                                    <div className='headername'>
                                                        {header.label}
                                                    </div>
                                                </h5>
                                            </th>
                                        )
                                    }
                                }
                                else {
                                    return null;
                                }
                            }
                            )}
                            {props.haveAddButton ? (
                                <th className='opensidebar'>
                                    <CustomDrawer title="Choose columns">
                                        <div className="searchheading">
                                            <input type="text" placeholder="Search" tabIndex={2} />
                                            <div className="searchicon">
                                                <BiSearch />
                                            </div>
                                        </div>
                                        <div className="selectedfields">
                                            <h4>Selected fields</h4>
                                            <div className="selectedlist">
                                                {headers.map((header, index) => {
                                                    if (header.isDefaultShown) {
                                                        return (
                                                            <div className="listsitems" key={header.value} onClick={() => setIsShown(index)}>
                                                                <h5>{header.label}</h5>
                                                                <div className={header.show ? "trueicon d-show" : "d-none"}>
                                                                    <BiCheck />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return null
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <Divider />
                                        <div className="selectedfields sfdown">
                                            <h4>Available fields</h4>
                                            <div className="selectedlist">
                                                {headers.map((header, index) => {
                                                    if (!header.isDefaultShown) {
                                                        return (
                                                            <div className="listsitems" key={header.value} onClick={() => setIsShown(index)}>
                                                                <h5>{header.label}</h5>
                                                                {header.show ?
                                                                    <div className="trueicon">
                                                                        <BiCheck />
                                                                    </div> : ""}
                                                            </div>
                                                        )
                                                    }
                                                    else {
                                                        return null;
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </CustomDrawer>
                                </th>) :
                                <th></th>}
                        </tr>
                    </thead>

                    <tbody>
                        {datas?.map((data, index) => (
                            <tr key={data.id} onMouseOver={() => setMouseOverRow(data.id)} onMouseLeave={() => setMouseOverRow(0)} className={mouseOverRow === data.id || selectedRows.includes(data.id) ? 'selectandoverbg' : ''}>
                                <td style={{ padding: 0 }}>
                                    <div className="sixdotsicon">
                                        <AiOutlineHolder strokeWidth={50} color='#7F8086' className={mouseOverRow === data.id ? 'd-block' : 'd-none'} />
                                    </div>
                                </td>
                                {getSelectAndBookmarks(data.id, data.isBookmarked, index)}
                                {headers?.map(({ value, key, cellType, show, photoCellName }) => {
                                    if (show) {
                                        if (cellType === 'normalText') {
                                            return (
                                                <td key={key} >
                                                    <h5 className="tablecelldata">{data[value]}</h5>
                                                </td>
                                            )
                                        }
                                        else if (cellType === 'withPhoto') {
                                            return (
                                                <td key={key} >
                                                    <div className="withphoto">
                                                        <img src={data[photoCellName]} alt={data[value] + " image"} />
                                                        <h5 className="tablecelldata">{data[value]}</h5>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        else if (cellType === 'withBackground') {
                                            return (
                                                <td key={key} >
                                                    <div className="withbackground">
                                                        <h5 className="tablecelldata">{data[value]}</h5>
                                                    </div>
                                                </td>
                                            )
                                        }
                                        else {
                                            return null;
                                        }
                                    }
                                    else {
                                        return null;
                                    }
                                }
                                )}
                                {props.haveActionButton ?
                                    <td>
                                        <div
                                            className="tableactionbtn"
                                            id="basic-button"
                                            aria-controls={openMenu ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={openMenu ? 'true' : undefined}
                                            onClick={handleClick}
                                        >
                                            <SlOptionsVertical />
                                        </div>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openMenu}
                                            onClose={handleMenuClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            {props.actions?.map((action) => (
                                                <li key={action.id}>
                                                    <div className="selectone">
                                                        <div className="actionicon">
                                                            {action.icon}
                                                        </div>
                                                        <h6>{action.name}</h6>
                                                    </div>
                                                </li>
                                            ))}
                                        </Menu>
                                    </td> : ""}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default TableComponent;

import { useState } from 'react';
import TableItem from '../TableItem/TableItem';
import { data } from '../../constants/constants'
import './Table.scss';


function Table() {

	const [openTitleChart, setOpenTitleChart] = useState(null)
	const [styleBlue, setStyleBlue] = useState('')
	const [stylePurple, setStylePurple] = useState('')
	const [isOpen, setIsOpen] = useState(false);

	function handleClickCurrent() {
		setStyleBlue('blue')
	}
	function handleClickYesterday() {
		setStylePurple('purple')
	}

	function mouseDownCloseCurrent(e) {
		if (!e.target.classList.contains('current-day')) {
			setStyleBlue('')
		}
	}

	function mouseDownCloseYesterday(e) {

		if (!e.target.classList.contains('yesterday')) {
			setStylePurple('')
		};
	}

	function onClickColCurrent() {
		setStyleBlue('blue')
	}
	function onClickColYesterday() {
		setOpenTitleChart(null)
		setStylePurple('purple')
	}

	function onClick(id) {
		console.log('%cDATA', 'color: purple', id)
		if(id === openTitleChart) {
			setOpenTitleChart(null) 
			setIsOpen(false)
		} else {
			setOpenTitleChart(id) 
			setIsOpen(true)
		}
		// id === openTitleChart ? (setOpenTitleChart(null) && setIsOpen(false)): (setOpenTitleChart(item.id) && setIsOpen(true))
	}


	return (
		<section className="table">
			<table onClick={(e) => {
				mouseDownCloseCurrent(e)
				mouseDownCloseYesterday(e)
			}} className="table__container">
				<caption className="table__caption">Общая статистика</caption>
				<thead className='table__thead'>
					<tr className='table__tr'>
						<th className="table__th">Показатель</th>
						<th className={`table__th current-day ${styleBlue}`}
							onClick={() => handleClickCurrent()}
						>Текущий день</th>
						<th colSpan="2" className={`table__th yesterday ${stylePurple}`}
							onClick={() => handleClickYesterday()}
						>Вчера</th>
						<th className='table__th'>Этот день недели</th>
					</tr>
				</thead>
				{
					data.map((item) => {

						return <TableItem
							onClick={onClick}
							// onClick={() => (item.id === openTitleChart ? setOpenTitleChart(null) : setOpenTitleChart(item.id))}
							currentDay={item.current_day}
							title={item.title}
							styleBlue={styleBlue}
							yesterdayQuantity={item.yesterday_quantity}
							thisDayOfWeek={item.this_day_of_the_week}
							isOpen={item.id === openTitleChart}
							key={item.id}
							onHandleClick={handleClickCurrent}
							/**  */
							onClickColCurrent={onClickColCurrent}
							onClickColYesterday={onClickColYesterday}
							stylePurple={stylePurple}
							id={item.id}
						/** */
						/>
					}
					)
				}
			</table >
		</section>
	);
}

export default Table;


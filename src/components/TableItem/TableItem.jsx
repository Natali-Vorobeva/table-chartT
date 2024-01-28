import { useRef, useState } from 'react';
import Chart from '../Chart/Chart';
import './TableItem.scss'
import { dataChart } from '../../constants/constants'


function TableItem({
	currentDay,
	thisDayOfWeek,
	yesterdayQuantity,
	title,
	onClick,
	id,
	isOpen,
	styleBlue,
	onHandleClick,
	onClickColYesterday,
	stylePurple
}) {

	const itemRef = useRef(null)
	const percent = Math.round((yesterdayQuantity * 100 / currentDay) - 100)

	const [chartData, setChartData] = useState([])
	const [unitX, setUnitX] = useState('')
	const [unitY, setUnitY] = useState('')
	const [chartDayOfWeek, setChartDayOfWeek] = useState([])
	const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

	const currentUserDate = new Date()
	let dayWeek = currentUserDate.getDay()
	const currentDayWeek = weekDays[dayWeek]

	function handleData(id) {
		let dataId = dataChart.filter(function (val) {
			return val.id == id;
		})[0].data
		let X = dataChart.filter(function (val) {
			return val.id == id;
		})[0].unitX
		setUnitX(X)
		let Y = dataChart.filter(function (val) {
			return val.id == id;
		})[0].unitY
		setUnitY(Y)
		let dataDay = dataId.map(data => data.quantity)
		setChartData(dataDay)		
	}

	return (
		<>
			<tbody className="table-item" >
				<tr className='table__tr'>
					<td className='table__td table-item__title'>{title}</td>
					<td onClick={() => {
						onHandleClick()
						onClick(id)
						handleData(id)
					}} className={`table__td current-day ${styleBlue}`}>{currentDay}</td>
					<td onClick={(e) => onClickColYesterday(e)} className={`table__td table__td_yesterday yesterday ${stylePurple}`}>{yesterdayQuantity}</td>
					<td onClick={(e) => onClickColYesterday(e)} className={`table__td table__td_percent yesterday ${stylePurple} ${percent < 0 ? 'red' : percent > 0 ? 'green' : ''}`}>
						{
							percent > 0 ? `+${percent}%` : `${percent}%`
						}
					</td>
					<td 
					// onClick={() => handleDataDayWeek(id)} 
					className='table__td'>{thisDayOfWeek}</td>
				</tr>

			</tbody >
			<tbody>
				<tr ref={itemRef} className={`table__chart ${isOpen ? "" : "close"}`}>
					<td>
						<Chart unitX={unitX} unitY={unitY} height={400} dayWeek={weekDays[dayWeek]} chartDayOfWeek={chartDayOfWeek} result={chartData} title={title} />
					</td>
				</tr>
			</tbody >
		</>
	);
}

export default TableItem;
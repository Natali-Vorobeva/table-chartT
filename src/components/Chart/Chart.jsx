import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './Chart.scss'

function Chart({
	visibleChart,
	index,
	title,
	dataChart,
	chartDayOfWeek,
	chartDay,
	result,
	dayWeek,
	unitX,
	unitY,
	...item
}) {
	
	const options = {
		title: {
			text: title,
			align: 'top'
		},
		chart: {
			height: (9 / 16 * 100) + '%',
			spacingLeft: 20,
			spacingRight: 20,
			spacingTop: 10,
		},
		yAxis: {
			title: {
				text: unitX
			},
		},
		xAxis: {
			title: {
				text: unitY
			},
		},
		plotOptions: {
			series: {
				label: {
					connectorAllowed: true
				},
			}
		},
		series: [
			{
				name: "title",
				data: result
			},
		],
	}

	return (
		<HighchartsReact highcharts={Highcharts} containerProps={{ className: "chartContainer" }} options={options} />
	);
}

export default Chart;

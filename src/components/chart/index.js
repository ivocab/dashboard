import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { randomColor } from "../../utils";

export default function Chart({ data }) {
	useLayoutEffect(() => {
		let root = am5.Root.new("chartdiv");

		root.setThemes([am5themes_Animated.new(root)]);

		// Create chart
		// https://www.amcharts.com/docs/v5/charts/xy-chart/
		let chart = root.container.children.push(
			am5xy.XYChart.new(root, {
				panX: true,
				panY: true,
				wheelX: "panX",
				wheelY: "zoomX",
				pinchZoomX: true,
			})
		);

		let yAxis = chart.yAxes.push(
			am5xy.ValueAxis.new(root, {
				renderer: am5xy.AxisRendererY.new(root, {}),
			})
		);

		let xAxis = chart.xAxes.push(
			am5xy.CategoryAxis.new(root, {
				renderer: am5xy.AxisRendererX.new(root, {}),
				categoryField: "category",
			})
		);
		xAxis.data.setAll(data);

		let series = chart.series.push(
			am5xy.ColumnSeries.new(root, {
				name: "Series",
				xAxis: xAxis,
				yAxis: yAxis,
				valueYField: "value",
				categoryXField: "category",
				fill: root.interfaceColors.get("alternativeText"),
				fill: am5.color("#5643CC"),
				stroke: am5.color("#5643CC"),
			})
		);
		series.data.setAll(data);

		series.columns.template.setAll({
			fillOpacity: 0.8,
			strokeWidth: 2,
			cornerRadiusTL: 5,
			cornerRadiusTR: 5,
			tooltipText: "{value}",
			width: am5.percent(90),
			tooltipY: 0,
		});

		series.columns.template.adapters.add("fill", function (fill, target) {
			return chart.get("colors").getIndex(series.columns.indexOf(target));
		});

		series.columns.template.adapters.add("stroke", function (stroke, target) {
			return chart.get("colors").getIndex(series.columns.indexOf(target));
		});

		let legend = chart.children.push(am5.Legend.new(root, {}));
		legend.data.setAll(chart.series.values);

		return () => {
			root.dispose();
		};
	}, []);

	return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
}

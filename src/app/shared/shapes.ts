export const SHAPES = {
	rectangle :{
		type:'rect',
		height:40,
		width:55,
		fill: 'white',
		stroke: 'black',
		stroke_width: 1,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,

		menuX:0,
		menuY:0
	},

	round_rectangle :{
		type:'round_rect',
		height:40,
		width:55,
		fill: 'white',
		stroke: 'black',
		stroke_width: 1,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,
		rx:3,
		ry:3,
		menuX:1,
		menuY:1
	},

	rectangle_selected_border :{
		name:'node',
		type:'rect',
		height:50,
		width:65,
		fill: '#5EB1BF',
		stroke: '#5EB1BF',
		stroke_width: 2,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,
		margin:5,
		menuX:5,
		menuY:5
	},

	start_point : {
		type:'start_point',
		height:'55',
		width:'40',
		rx:15,
		ry:15,
		cx:'50%',
		cy:'50%',
		fill: '#6bbf59',
		stroke: '#1d7c07',
		stroke_width: 2,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,
		menuX:5,
		menuY:5		
	},

	end_point :{
		type:'end_point',
		height:50,
		width:50,
		rx:15,
		ry:15,
		cx:'50%',
		cy:'50%',
		fill: '#ff5252',
		stroke: '#c90404',
		stroke_width: 1,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,
		menuX:5,
		menuY:5
	},
	
	decision_diamond :{
		type:'decision_diamond',
		height:50,
		width:50,
		menuX:5,
		menuY:5,
		fill: '#FFF2CC',
		stroke: '#D6B656',
		stroke_width: 2,
		fill_opacity: 0.2,
		stroke_opacity: 0.8
	},

	circle:{
		r:15,
		fill: '#5EB1BF',
		stroke: 'black',
		stroke_width: 1,
		fill_opacity: 0.2,
		
		connector_radius:3,
		connector_fill:'#6bbf59',
		connector_stroke_width:2
	},

	connector:{
		radius:3,
		fill:'#5EB1BF'
	},

	line:{
		fill:'#5EB1BF',
		stroke:'#000'
	}



}

export const COLORS = {
	strokeStyle : {name:'default_strole', color:'black'},
	selectedStrokeStyle : {name:'default_strole', color:'red'}
}

export const MENU_FLOWCHART_SHAPES = [
	SHAPES.start_point,
	SHAPES.end_point,
	SHAPES.decision_diamond,
	SHAPES.rectangle,
	SHAPES.round_rectangle
]

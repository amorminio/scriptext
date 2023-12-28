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

	// <ellipse  cx="50%" cy="50%" rx="15" ry="15" fill="#6bbf59" stroke="black" stroke-width="1"
	start_point :{
		
		type:'circle',
		height:50,
		width:50,
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
		type:'circle',
		height:50,
		width:50,
		rx:15,
		ry:15,
		cx:'50%',
		cy:'50%',
		fill: '#ff5252',
		stroke: '#c90404',
		stroke_width: 2,
		fill_opacity: 0.2,
		stroke_opacity: 0.8,
		menuX:5,
		menuY:5
	},

	//TODO - SETUP CONSTANTS FOR OTHER SHAPES
	
	diamond :{
		name:'node',
		type:'diamond',
		family:'flowchart',
		height:50,
		width:50,
		menuX:5,
		menuY:5
	}

}

export const COLORS = {
	strokeStyle : {name:'default_strole', color:'black'},
	selectedStrokeStyle : {name:'default_strole', color:'red'}
}

export const MENU_FLOWCHART_SHAPES = [
	SHAPES.start_point,
	SHAPES.end_point,
	SHAPES.diamond,
	SHAPES.rectangle,
	SHAPES.round_rectangle
]
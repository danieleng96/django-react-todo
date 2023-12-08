import Plot from 'react-plotly.js';
import TodoItem from './TodoItem';
const DataPlot = ({data, handleSave, handleDelete}) => {
  
  const dueTime = (start, goal) => {
    let inputTime = new Date(start);
    let goalTime = new Date(goal);
    // let completedDate = new Date(completed);
    let projectLength = (goalTime - inputTime);
    return (Math.round(projectLength))};
  

  

  const getMinMax = () => {
    //gets the maximum and minimum dates to bound the graph, will be "now" by default.
    let minInputTime = new Date();
    let maxGoalTime = new Date();
    for (let i = 0; i < data.length; i++) {
      
      if (new Date(data[i].input_time) < minInputTime) 
      {minInputTime = new Date(data[i].input_time);}

      if (new Date(data[i].goal_time) > maxGoalTime) 
      {maxGoalTime = new Date(data[i].goal_time)}
    }

    let offsets = []
    let elapseds = []
    let goals = []

    for (let i = 0; i < data.length; i++) {
      offsets.push(new Date(data[i].input_time) - minInputTime)
      elapseds.push(new Date() - new Date(data[i].input_time))
      goals.push(new Date(data[i].goal_time) - new Date()
      )

    };
    console.log('offsets:', offsets, 'elapsed:',elapsed, 'goals:',goals)
    // console.log(minInputTime.getTime(), maxGoalTime.getTime())
  
    return [minInputTime.getTime()/3600000, maxGoalTime.getTime()/3600000, offsets, elapseds, goals];}
    // const getYs= (data) => {
    //   return data.map(d => d.y);
    // }
    // function getMinY(){
    //   return Math.min(...getYs());
    // }
    // function getMaxY(){
    //   return Math.max(...getYs());
    // }


  const timeLeft = (goal) => {
      let goalTime = new Date(goal);
      let now = new Date();
      // let completedDate = new Date(completed);
      let timeLeft = (goalTime -now);
      // console.log(timeLeft/3600/24, goalTime-now)
      // console.log(data.hasMin('input_time'))
      
      return (Math.round(timeLeft))};

  const elapsed = (start) => {
    let inputTime = new Date(start);
    let now = new Date();

    // let completedDate = new Date(completed);
    let elapsed = (now - inputTime);
    return (Math.round(elapsed))};
  
  const dateConversion = (el) => {
    let elapsed = el/1000
    return (
        Math.abs(elapsed) < 60 ? 'just now' : // if 
        (Math.abs(elapsed) >= 60 && Math.abs(elapsed) < 3600) ? String(Math.round(elapsed/60))+' m' : // else if 
        (Math.abs(elapsed) >= 3600 && Math.abs(elapsed) < 3600*24) ? String(Math.round(elapsed/3600))+' hr': // else if
        Math.abs(elapsed) >= 3600*24 ? String(Math.round(elapsed/3600/24))+' d': null // else if
      );

  };

  

  // const layout = {
  //   height: 300,
  //   yaxis: {
  //     showgrid: false,
  //     zeroline: false,
  //     showline: false,
  //     showticklabels: false
  //   }
  // };
  // layout
  var layout={
    title: 'Task timer',
    barmode: 'stack',
    
    bargap: 0.2,
    paper_bgcolor: 'rgba(255,255,255,0)',
    plot_bgcolor: 'rgba(255,225,255,0)',
    yaxis: {title: 'time (seconds)'},
  
    }
    //time variables for minimum input time to maximum goal time, which defines the size of the plot.
    var [minInputTime, maxGoalTime, offsets, elapseds, goals] = getMinMax();
    
    var offset_plot = {
    x: data.map((item, index) => item.title),
    // y: data.map(item => elapsed(item.input_time)),
    // y: data.map(item => new Date(item.input_time)),
    y: offsets.map(item => item),

    // y: offsets.map(item => item),


    // text: data.map(item => dateConversion(elapsed(item.input_time))+' offset'),
    // text: data.map(item => (String(new Date(item.input_time)-new Date(item.goal_time)))),

    
    // textposition:,


    type: 'bar',
    // mode: 'relative',
    name: 'offset',
    hovertemplate: '<extra></extra>',

    marker: {
      
      width: 0.1,

      color: 'rgba(240, 133, 0, 0.0)',
      
      line: {
        color: 'rgba(0, 0, 0, 0)',
        width: 1.5,
        
      }
        



    }};
    var elapsed_plot = {
      x: data.map((item, index) => item.title),
      // y: data.map(item => elapsed(item.input_time)),
      // y: data.map(item => new Date(item.input_time)),
      y: elapseds.map(item => item),
  
      // y: offsets.map(item => item),
  
  
      text: data.map((item,index) => goals[index] > 0 ? dateConversion(elapsed(item.input_time))+' elapsed': ''),
      // text: data.map(item => (String(new Date(item.input_time)-new Date(item.goal_time)))),
  
      
      // textposition:,
      hoverinfo: data.map(item => item.title),
  
      type: 'bar',
      // mode: 'relative',
      name: 'elapsed',
      // hovertemplate: 'Elapsed: %{text}<extra></extra>',
      hovertemplate: data.map(todo=>`Elapsed: `+<TodoItem 
      key={todo.id}
      todo={todo}
      handleSave = {handleSave}
      handleDelete = {handleDelete}/>),
      marker: {
        
        width: 0.1,
  
        color: 'rgba(240, 133, 0, 0.5)',
        
        line: {
          color: 'rgb(0, 0, 0)',
          width: 1.5,
          
        }
          
  
  
  
      }};

  // var elapsed_plot = {
  //   x: data.map((item, index) => item.title),
  //   // y: data.map(item => elapsed(item.input_time)),
  //   y: data.map(item => new Date(item.input_time)),

  //   text: data.map(item => dateConversion(elapsed(item.input_time))+' elapsed'),

    
  //   // textposition:,
  //   hoverinfo: data.map(item => item.title),

  //   type: 'bar',
  //   // mode: 'relative',
  //   name: 'elapsed',
  //   hovertemplate: 'Elapsed: %{text}<extra></extra>',

  //   marker: {
      
  //     width: 0.1,

  //     color: 'rgba(240, 133, 0, 0.5)',
      
  //     line: {
  //       color: 'rgb(0, 0, 0)',
  //       width: 1.5,
        
  //     }
        



  //   }};

  var goal_plot = {
      x: data.map((item, index) => item.title),
      // y: data.map(item => dueTime(item.input_time,item.goal_time)),
      // y: data.map(item => new Date(item.goal_time)),
      y: goals.map(item => item),

      type: 'bar',
      // mode: 'relative',
      name: 'Time to finish',
      // text: offsets.map(item => item +' left'),

      text: data.map(item => dateConversion(timeLeft(item.goal_time))),

      hovertemplate: data.map((item, index) =>  (goals[index] > 0 ? 'Remaining time:' : 'Time Overdue:')+'%{text}<br>'+item.description+'<extra></extra>'),

      marker: {
        
        width: 0.1,

        color: goals.map(goal => goal > 0 ? 'rgba(24, 133, 0, 0.5)': 'rgba(201, 28, 28, 0.5)'),
        
        line: {
          color: 'rgb(0, 0, 0)',
          width: 1.5,
        }
      }
    };
 
  return (
      <div>
        <Plot
          data={[
            offset_plot,
            elapsed_plot,
            goal_plot]}
            layout={layout}
            
          />
        </div>  
    )
};

export default DataPlot

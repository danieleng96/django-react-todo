import Plot from 'react-plotly.js';

const DataPlot = ({data}) => {
  const dueTime = (start, goal) => {
    let inputTime = new Date(start);
    let goalTime = new Date(goal);
    // let completedDate = new Date(completed);
    let projectLength = (goalTime - inputTime) / (1000);
    return (Math.round(projectLength))};

  const timeLeft = (goal) => {
      let goalTime = new Date(goal);
      let now = new Date();
      // let completedDate = new Date(completed);
      let timeLeft = (goalTime -now) / (1000);
      console.log(timeLeft/3600/24, goal, now)

      return (Math.round(timeLeft))};

  const elapsed = (start) => {
    let inputTime = new Date(start);
    let now = new Date();

    // let completedDate = new Date(completed);
    let elapsed = (now - inputTime) / (1000);
    return (Math.round(elapsed))};
  
  const dateConversion = (elapsed) => {

    return (
        Math.abs(elapsed) < 60 ? 'just now' : // if 
        (Math.abs(elapsed) >= 60 && Math.abs(elapsed) < 3600) ? String(Math.round(elapsed/60))+' m' : // else if 
        (Math.abs(elapsed) >= 3600 && Math.abs(elapsed) < 3600*24) ? String(Math.round(elapsed/3600))+' hr': // else if
        Math.abs(elapsed) >= 3600*24 ? String(Math.round(elapsed/3600/24))+' d': null // else if
      );

  }

  const layout = {
    height: 300,
    yaxis: {
      showgrid: false,
      zeroline: false,
      showline: false,
      showticklabels: false
    }
  };
    
  return (
      <div>
        <Plot
          data={[
            {
              x: data.map((item, index) => item.title),
              y: data.map(item => elapsed(item.input_time)),
              text: data.map(item => dateConversion(elapsed(item.input_time))+' elapsed'),

              
              // textposition:,
              hoverinfo: data.map(item => item.title),

              type: 'bar',
              mode: 'relative',
              name: 'elapsed',
              hovertemplate: 'Elapsed: %{text}<extra></extra>',

              marker: {
                
                width: 0.1,

                color: 'rgba(240, 133, 0, 0.0)',
                
                line: {
                  color: 'rgb(0, 0, 0)',
                  // width: 1.5,
                  
                }
              }
           },
            {
              x: data.map((item, index) => item.title),
              y: data.map(item => dueTime(item.input_time,item.goal_time)),
              type: 'bar',
              mode: 'relative',
              name: 'Time to finish',
              text: data.map(item => dateConversion(timeLeft(item.goal_time))+' left'),

              hovertemplate: data.map(item => 'Remaining: %{text}<br>'+item.description+'<extra></extra>'),

              marker: {
                
                width: 0.1,

                color: 'rgba(24, 133, 0, 0.5)',
                
                line: {
                  color: 'rgb(0, 0, 0)',
                  width: 1.5,
                  
                }

              }
              

            }
          ]}
          layout={{
            title: 'Task timer',
            barmode: 'stack',
            
            bargap: 0.8,
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,225,255,0)',
            yaxis: {title: 'time (seconds)'},
          
            }
          }
          />
          {/* second plot, to show full timeline */}
          <Plot
          data={[
            // {
            //   x: data.map((item, index) => index +1),
            //   y: data.map(item => timeLeft(item.goal_time)),
            //   type: 'bar',
            //   mode: 'stack',
            //   name: 'Time elapsed',
            //   marker: {
            //     width: 0.1,
            //     color: 'rgba(255, 170, 0, 0.3)',
            //     // opacity: 0.5,
            //     line: {
            //       color: 'rgb(0, 0, 0)',
            //       width: 1.5
            //     }

            //     // opacity: 0.1,
            //   }
              
            // }, 
            {
              x: data.map((item, index) => [item.input_time, item.goal_time]),
              y: data.map(item => [item.id]),
              orientation: 'h',
              text: data.map(item => dateConversion(elapsed(item.input_time))+' elapsed'),

              
              // textposition:,
              hoverinfo: data.map(item => item.title),

              type: 'bar',
              barmode:'stack',
              // mode: 'relative',
              name: 'calendar',
              hovertemplate: data.map(item => 'Remaining: %{text}<br>'+item.description+'<extra></extra>'),

              marker: {
                
                width: 0.0,

                color: 'rgba(240, 133, 0, 0.3)',
                
                line: {
                  // color: 'rgb(0, 0, 0)',
                  // width: 1.5,
                  
                }
                  
        
       

              }
              

            },
            // {
            //   x: data.map((item, index) => item.title),
            //   y: data.map(item => dueTime(item.input_time,item.goal_time)),
            //   type: '',
            //   mode: 'relative',
            //   name: 'Time to finish',
            //   text: data.map(item => dateConversion(timeLeft(item.goal_time))+' left'),

            //   hovertemplate: data.map(item => 'Remaining: %{text}<br>'+item.description+'<extra></extra>'),

            //   marker: {
                
            //     width: 0.1,

            //     color: 'rgba(24, 133, 0, 0.5)',
                
            //     line: {
            //       color: 'rgb(0, 0, 0)',
            //       width: 1.5,
                  
            //     }

            //   }
              

            // }
          ]}
          layout={{
            title: 'Task timer',
            // barmode: 'stack',
            
            // bargap: 0.8,
            paper_bgcolor: 'rgba(255,255,255,0)',
            plot_bgcolor: 'rgba(255,225,255,0)',
            yaxis: {title: 'time (seconds)'},
          
            }
          }
          />
      </div>
    )
};

export default DataPlot

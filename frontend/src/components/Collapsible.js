import { useState } from "react";
import React from "react";
// import { useCollapse } from 'react-collapsed';
import "./Collapsible.css";

// export function Collapsible(props) {
//     const [isOpen, setIsOpen] = useState(true);
//     const content = props.content;

//     return (
//         <div className = "collapsible">
//             <button className="toggle" onClick={() => setIsOpen(!isOpen)}>Tog</button>
//             {isOpen && <div className="content">{content}</div>}
//         </div>
//     );
// };

const Sidebar = ({ children, ...rest }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, SetContent] = useState();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        SetContent(children.props.todo)
        console.log(isOpen)
        // sets to opposite of current state
};

return (
  
  <div className={`sidebar ${isOpen ? 'open' : 'closed'}`} onMouseEnter={toggleSidebar}>
      
    {/* <div className = 'container'> */}
    <div className={`content ${isOpen ? 'open' : 'closed'}`}>{children}
      {/* {React.Children.map(children, (child) =>
          React.cloneElement(child, { ...rest })
          )} */}
          </div>
   
  </div> 
      
);
};

// return (
//     <div className = {`wrapper ${isOpen ? 'open' : 'closed'}`}>
//     <button className={`button ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
//         {isOpen ? `Minimize ${children.props.todo.id}` : `${children.props.todo.id}. ${children.props.todo.title}`}
//       </button>
//     <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        
//       {/* <div className = 'container'> */}
//       <div className={`content ${isOpen ? 'open' : 'closed'}`}>{children}
//         {/* {React.Children.map(children, (child) =>
//             React.cloneElement(child, { ...rest })
//             )} */}
//             </div>
            
//     {/* </div> */}
//     </div> 
//     </div> 
        
//   );
// };

export default Sidebar;



// export function Collapsible(props) {
//     const [isOpen, setIsOpen] = useState(true);
//     const parentRef = useRef();

//     return (
//         <div className = "collapsible">
//             <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
//                 {props.label}

//             </button>
//             <div
//             className="content-parent"
//             ref={parentRef}
//             style={
//                 isOpen
//                     ? {
//                     height: parentRef.current.scrollHeight + "px",
//                 }
//                  : {
//                     height: "0px",
//                 }
//             }>
//             </div>
//             <div className="content">{props.children}</div>

//         </div>
    
//     )


// };

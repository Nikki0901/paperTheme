import React from 'react';

const HeaderComp = ({headers}) => {
    console.log(headers)
    return (
       
             <thead >
                      <tr>
                          {
                              headers.map((head) => (
                              <th key={head.field}>{head.name}</th>                          
                              ))
                          }
                        
                      </tr>
                    </thead>
      
    );
};

export default HeaderComp;
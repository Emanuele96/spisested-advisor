import React from 'react';
import ListRow from '../ListRow/ListRow.js'
import './List.css'

const List = props => {
    let rows =props.listRawData.map((row) =>
    <ListRow key={row.name} rowData = {row}></ListRow>
    )
    return (

            <ul className="Table">
                <li className = "TableHeader">
                    <div className = "Column">
                        Navn
                    </div>

                    <div className = "Column">
                        By
                    </div>
                    <div id="ColumnFace" className = "Column">
                        Fjes
                    </div>
                    <div id="ColumnStar" className = "Column">
                        Vurdering
                    </div>
                </li>    
                {rows}
            </ul>
        
    );
}


export default List;
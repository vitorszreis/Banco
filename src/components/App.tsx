import ExhibitionArea from "./ExhibitionArea";
import InsertionArea from "./InsertionArea";
import "./App.css";
import { useState } from "react";
import { Table } from "../interface/table";
import { Column } from "../interface/column";

function App() {
  const [tables, setTables] = useState<Table[]>([])

  function addTable(table: Table){
    setTables([...tables, table])
  }

  function createRelation(where: Table, from: Table){
    const newRelationColumn: Column = {
      id: Date.now(),
      name: `${from.name}_id`,
      type: from.columns[0].type,
      foreingnKey: {
        tableId: from.id,
        columnId: from.columns[0].id
      }
    }

    const tablesCopy = [...tables]
    tablesCopy.filter(table => table.id === where.id)[0].columns = [...where.columns, newRelationColumn]
    console.log(tablesCopy)
    setTables([...tablesCopy])
  }

  return (
    <div className="app-container">
      <ExhibitionArea tables={tables} />
      <InsertionArea tables={tables} addTable={addTable} createRelation={createRelation} />
    </div>
  );
}

export default App;

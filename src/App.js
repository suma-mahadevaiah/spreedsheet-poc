import * as React from "react";
import "./App.css";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import { useRef, useEffect } from "react";
import { TableTitle } from './table-titles/TableTitles';

const App = () => {
  const sheetRef = useRef();


  // const movetoExcel1 = () => {
  //   sheetRef.current.updateCell({ value: "variable1" }, "A3");
  // };
  // const movetoExcel2 = () => {
  //   sheetRef.current.updateCell({ value: "variable2" }, "A4");
  // };
  // const movetoExcel3 = () => {
  //   sheetRef.current.updateCell({ value: "variable3" }, "A5");
  // };
  // const movetoExcel4 = () => {
  //   sheetRef.current.updateCell({ value: "variable4" }, "A6");
  // };
  // const movetoExcel5 = () => {
  //   sheetRef.current.updateCell({ value: "variable5" }, "A7");
  // };

  useEffect(() => {
    // Set the initial active cell to B2
    sheetRef.current.activeCell = 'B1';
  }, []);

  

  const handleAddTitles = (item,index) => {
    sheetRef.current.updateCell({ value: item.title }, `A${index+1}`);
    sheetRef.current.cellFormat({ fontWeight: 'normal', textAlign: 'left', width: 120 }, `A${index + 1}`)
    if (item.title === "Sum"){
      sheetRef.current.updateCell({ formula: `=SUM(B${1}: B${4})` }, `B${index + 1}`);
      sheetRef.current.cellFormat({ fontWeight: 'normal', textAlign: 'left', width: 120,color:"red" }, `B${index + 1}`)
      
    }
  }

  // const beforeSave=(args:any)=>{
  //   console.log(args)
  //   args.needBlobData = true;
  //   args.isFullPost = false;
  // }

  const beforeSave=(args:any)=>{
    var url ="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save"
    //var url = 'http://localhost:8080/api/v1/file';
    var fileName = 's1.xlsx';
    var saveType = 'Xlsx';
    args.needBlobData = true;
    args.isFullPost = true;
    args.url = url;
    args.fileName = fileName;
    args.saveType = saveType;
    console.log(args)
}

  const saveComplete=(args:any)=>{
    console.log(args)
    console.log(args.blobData); // returns blob data
    var url = 'http://localhost:8080/api/v1/file';
    let form = new FormData();
// formData.append('file',args.blobData);
var fileOfBlob = new File([args.blobData], 'sample.xlsx');
form.append("file", fileOfBlob);

    fetch(url,{method:"post",body:form,headers:{"Content-Type": "multipart/form-data"}}).then(r=>console.log(r)).catch(err=>console.log(err))
  }

  return (
    <div className="App">
      <div className="mainPanel">
        <div className="panelOne">
          <SpreadsheetComponent
            ref={(s) => {
              sheetRef.current = s;
            }}
            allowOpen={true}
            openUrl="https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open"
            allowSave={true}
            saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
            // fileMenuItemSelect={fileMenuItemSelect}
            beforeSave= {beforeSave}
            saveComplete= {saveComplete}

          />
        </div>
        <div className="panelTwo">
          <h3>Primary Variables</h3>
          {TableTitle?.map((item, index) => (
            <h4 className={"table-title"} onClick={() => handleAddTitles(item,index)}>
              {item.title}
            </h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;


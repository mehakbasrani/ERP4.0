import { Inject,ScheduleComponent,Day,Week,Month,ViewDirective,ViewsDirective, WorkWeek, Agenda} from "@syncfusion/ej2-react-schedule";
import "../../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";


export default function Event({eventData}){
   
    
   
    return (
        <>
        {/* <ScheduleComponent currentView="Month" >
            <Inject services={[Day,Week,WorkWeek,Month,Agenda]} />
        </ScheduleComponent> */}

        <ScheduleComponent>
      <ViewsDirective>
        <ViewDirective option="Day" />
        <ViewDirective option="Week" />
        <ViewDirective option="Month" />
        <ViewDirective option="WorkWeek" />
        {/* <ViewDirective option="Agenda" /> */}
      </ViewsDirective>
      <Inject services={[Day, Week, Month,WorkWeek,Agenda]} />
      <div>
        {eventData.map(item => (
          <div key={item.Id}>
            <p>{item.Subject}</p>
            <p>{item.StartTime}</p>
            <p>{item.EndTime}</p>
          </div>
        ))}
      </div>
    </ScheduleComponent>
        </>
    )
}

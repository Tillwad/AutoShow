import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import UserStore from "./stores/UserStore"

export function Controls(props) {{
    return (
        <>
            <Picker state={props.state}/>
        </>
    )
}}

function Picker(props) {
    const snap = useSnapshot(props.state)
    const saveData = (data) => {
      UserStore.colors = "";
      for(const [key, value] of Object.entries(data)) {
        if(key === "Mercedes_old") {
          UserStore.colors += value; 
        }
        else {
          UserStore.colors += value + ','; 
        }
      }
    }

    return (
      <div style={{ display: snap.current ? "block" : "none" }}>
        <HexColorPicker className="picker" color={props.state.items[snap.current]} onChange={(color) => (props.state.items[snap.current] = color, saveData(props.state.items))} />
        {/* <h1 className="current">{snap.current}</h1> */}
      </div>
    )
  }